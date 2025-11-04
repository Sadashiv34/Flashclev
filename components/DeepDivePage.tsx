
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { BookDetails, ChatMessage } from '../types';
import { getBookDetails, startChatSession } from '../services/geminiService';
import { BackArrowIcon, SendIcon, UserIcon, AiIcon } from './icons';
import type { Chat } from '@google/genai';

interface DeepDivePageProps {
  bookName: string;
  onSearchAnother: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);

const parseBookTitle = (title: string) => {
  const colonIndex = title.indexOf(':');
  return colonIndex !== -1 ? title.substring(0, colonIndex).trim() : title;
};

const DeepDivePage: React.FC<DeepDivePageProps> = ({ bookName, onSearchAnother }) => {
   const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
   const [selectedChapter, setSelectedChapter] = useState<string>('All');
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [userInput, setUserInput] = useState('');
   const [isLoading, setIsLoading] = useState(true);
   const [isAnswering, setIsAnswering] = useState(false);
   const [prevHeight, setPrevHeight] = useState(window.innerHeight);
   const chatSessionRef = useRef<Chat | null>(null);
   const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      setMessages([]);
      const details = await getBookDetails(bookName);
      setBookDetails(details);

      const chatSession = startChatSession(details.title);
      chatSessionRef.current = chatSession;

      if (chatSession) {
        setIsAnswering(true);
        try {
          const stream = await chatSession.sendMessageStream({ message: `Start the conversation.` });

          let text = '';
          for await (const chunk of stream) {
            text += chunk.text;
          }

          setMessages([{ id: Date.now().toString(), sender: 'ai', text }]);
        } catch (error) {
          console.error("Error starting conversation:", error);
          setMessages([{ id: Date.now().toString(), sender: 'ai', text: "I'm having trouble connecting right now. Please check your API configuration and try again." }]);
        } finally {
          setIsAnswering(false);
        }
      } else {
        setMessages([{ id: Date.now().toString(), sender: 'ai', text: "AI service is not available. Please check your API key configuration." }]);
      }
      setIsLoading(false);
    };

    if (bookName) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookName]);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // Dynamic viewport height effect
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  // Keyboard open detection and chat scroll
  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      if (currentHeight < prevHeight) {
        // Keyboard likely opened
        setTimeout(() => {
          chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
        }, 100); // Small delay for stability
      }
      setPrevHeight(currentHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [prevHeight]);

  const handleChapterSelect = useCallback(async (chapter: string) => {
    if (chapter === selectedChapter || isAnswering || !bookDetails) return;

    setSelectedChapter(chapter);
    setIsAnswering(true);
    setMessages([]); // Clear previous chat

    const chatSession = startChatSession(bookDetails.title, chapter);
    chatSessionRef.current = chatSession;

    if (chatSession) {
      try {
        const stream = await chatSession.sendMessageStream({ message: `Start the conversation.` });

        let text = '';
        for await (const chunk of stream) {
          text += chunk.text;
        }

        setMessages([{ id: Date.now().toString(), sender: 'ai', text }]);
      } catch (error) {
        console.error("Error starting new chapter chat:", error);
        const errorMessage: ChatMessage = { id: Date.now().toString(), sender: 'ai', text: "Sorry, I couldn't switch to that chapter. Please try again." };
        setMessages([errorMessage]);
      }
    } else {
      const errorMessage: ChatMessage = { id: Date.now().toString(), sender: 'ai', text: "AI service is not available. Please check your API key configuration." };
      setMessages([errorMessage]);
    }

    setIsAnswering(false);
  }, [bookDetails, selectedChapter, isAnswering]);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isAnswering || !chatSessionRef.current) return;
    
    const userMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsAnswering(true);

    try {
        const stream = await chatSessionRef.current.sendMessageStream({ 
          message: userInput
        });
        
        let text = '';
        for await (const chunk of stream) {
            text += chunk.text;
        }

        const aiMessage: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text };
        setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: "Sorry, I encountered an error. Please try again." };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsAnswering(false);
    }

  }, [userInput, isAnswering]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <LoadingSpinner />
        <p className="mt-4 text-slate-300">Summoning literary wisdom for "{bookName}"...</p>
      </div>
    );
  }

  if (!bookDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-red-400">Could not load book details.</p>
        <button onClick={onSearchAnother} className="mt-4 text-purple-400 hover:underline">Try another book</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 flex flex-col pb-20" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      <button onClick={onSearchAnother} className="flex items-center space-x-2 text-slate-300 hover:text-white self-start mb-4">
        <BackArrowIcon className="w-5 h-5"/>
        <span>Search for another book</span>
      </button>

      <header className="flex flex-col items-center gap-6 mb-6">
        <img src={bookDetails.coverImageUrl} alt={bookDetails.title} className="w-32 h-48 object-cover rounded-lg shadow-lg" />
        <div className="text-center">
          <h1 className="text-3xl font-bold">{parseBookTitle(bookDetails.title)}</h1>
          <p className="text-lg text-slate-400">{bookDetails.author}</p>
        </div>
      </header>

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Select Chapter</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
          {['All', ...bookDetails.chapters].map(chapter => (
            <button
                key={chapter}
                onClick={() => handleChapterSelect(chapter)}
                disabled={isAnswering}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${selectedChapter === chapter ? 'bg-purple-600 text-white' : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'}`}>
              {chapter}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 flex flex-col bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-1 border-b border-slate-700">
            <h2 className="text-xl font-bold">Deep Understanding</h2>
        </div>
        <div ref={chatContainerRef} className="flex-1 p-1 overflow-y-auto space-y-2 touch-pan-y min-h-0" style={{ WebkitOverflowScrolling: 'touch' }}>
          {messages.map((msg) => (
             <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && <div className="w-10 h-10 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center"><AiIcon className="w-6 h-6 text-white" /></div>}
                <div className={`max-w-lg px-6 py-4 rounded-2xl ${msg.sender === 'user' ? 'bg-purple-600 rounded-br-none' : 'bg-slate-700 rounded-bl-none'}`}>
                   <p className="text-white whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.sender === 'user' && <div className="w-10 h-10 rounded-full bg-slate-600 flex-shrink-0 flex items-center justify-center"><UserIcon className="w-6 h-6 text-white" /></div>}
            </div>
          ))}
          {isAnswering && (
             <div className="flex items-start gap-4 justify-start">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex-shrink-0 flex items-center justify-center"><AiIcon className="w-6 h-6 text-white" /></div>
                <div className="max-w-lg px-6 py-4 rounded-2xl bg-slate-700 rounded-bl-none flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-0"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></div>
                </div>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={handleSendMessage} className="bg-slate-800 border border-slate-700 rounded-xl p-1">
              <div className="relative">
                  <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type your answer..."
                      className="w-full pl-4 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={isAnswering}
                  />
                  <button type="submit" disabled={isAnswering || !userInput.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed transition-colors">
                      <SendIcon className="w-5 h-5"/>
                  </button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeepDivePage;
