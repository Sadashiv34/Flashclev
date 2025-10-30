
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from '@google/genai';
import { startDeepUnderstandingChat } from '../services/geminiService';
import type { Book, ChatMessage } from '../types';

interface DeepUnderstandingPageProps {
  book: Book;
  goal: string;
}

const DeepUnderstandingPage: React.FC<DeepUnderstandingPageProps> = ({ book, goal }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const initializeChat = useCallback(async () => {
    setIsLoading(true);
    const newChat = startDeepUnderstandingChat(book.title, goal);
    setChat(newChat);

    try {
      const response = await newChat.sendMessage({ message: "Start the conversation." });
      const modelResponseText = response.text;
      setMessages([{ role: 'model', text: modelResponseText }]);
    } catch (error) {
      console.error("Error initializing chat:", error);
      setMessages([{ role: 'model', text: "Sorry, I couldn't start the conversation. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  }, [book.title, goal]);

  useEffect(() => {
    initializeChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book.title, goal]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chat || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({ message: userInput });
      const modelResponseText = response.text;
      setMessages(prev => [...prev, { role: 'model', text: modelResponseText }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'model', text: "There was an error. Let's try that again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
       <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-100">{book.title}</h2>
            <p className="text-lg text-teal-400">Deep Understanding</p>
        </div>

      <div className="flex-grow bg-gray-800 rounded-lg p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && messages.length > 0 && (
           <div className="flex justify-start">
             <div className="max-w-md p-3 rounded-lg bg-gray-700 text-gray-200">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="mt-4 flex">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Your answer..."
          className="flex-grow bg-gray-700 text-white placeholder-gray-400 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-teal-500 text-white font-semibold px-6 py-3 rounded-r-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 transition-colors disabled:bg-gray-600"
          disabled={isLoading || !userInput.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default DeepUnderstandingPage;
