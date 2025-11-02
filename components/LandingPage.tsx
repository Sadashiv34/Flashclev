import React, { useState } from 'react';
import { UserIcon, SearchIcon, BookOpenIcon, LockIcon, LayersIcon, ChatBubbleIcon, SproutIcon } from './icons';

interface LandingPageProps {
  onStart: () => void;
}

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6 text-white relative transform transition-all duration-300 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b border-gray-700/50 pb-4 mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [modalContent, setModalContent] = useState<{ title: string; content: React.ReactNode } | null>(null);

  const openModal = (title: string, content: React.ReactNode) => {
    setModalContent({ title, content });
  };

  const closeModal = () => {
    setModalContent(null);
  };
  
  const policies = {
    "Privacy Policy": (
      <>
        <h4 className="text-lg font-bold mb-3">Privacy Policy – Flashclev (Deep Understanding App)</h4>
        <p className="text-gray-300 leading-relaxed mb-2">Last Updated: [Insert Date]</p>
        <p className="text-gray-300 leading-relaxed mb-4">At Flashclev (“we,” “our,” “us”), we respect your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our web application.</p>
        
        <h5 className="text-md font-semibold mb-2">1. What Data We Collect</h5>
        <p className="text-gray-300 leading-relaxed mb-2">We designed Flashclev to protect your privacy by default.</p>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-3">
          <li><strong>We do NOT store:</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Your name, email, or any personal identity</li>
              <li>Your chat conversations permanently</li>
              <li>Any of your answers or book selections after you leave the page</li>
              <li>Any data in cookies, localStorage, database, or backend server</li>
            </ul>
          </li>
          <li><strong>What temporarily exists (session only):</strong>
            <ul className="list-disc list-inside ml-4">
              <li>Book title you search</li>
              <li>Chapters and questions generated</li>
              <li>Your answers in the chat</li>
            </ul>
            <p className="ml-4">All of this exists only in your browser’s memory (RAM) during your visit.</p>
          </li>
        </ul>
        
        <h5 className="text-md font-semibold mb-2">2. What Happens When You Leave or Refresh?</h5>
        <p className="text-gray-300 leading-relaxed mb-3">If you refresh the page, close the tab, or search another book, everything is instantly deleted. Flashclev is stateless – it has no long-term memory.</p>
        
        <h5 className="text-md font-semibold mb-2">3. Do We Share Data?</h5>
        <p className="text-gray-300 leading-relaxed mb-2">To generate intelligent book questions, we send your current conversation to:</p>
        <table className="w-full text-gray-300 border border-gray-700 mb-3">
          <thead>
            <tr className="bg-gray-700/50">
              <th className="border border-gray-700 p-2 text-left">Service</th>
              <th className="border border-gray-700 p-2 text-left">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-700 p-2">Google – Gemini API</td>
              <td className="border border-gray-700 p-2">chapter names, and deep understanding questions.</td>
            </tr>
            <tr>
              <td className="border border-gray-700 p-2">Open Library API (Internet Archive)</td>
              <td className="border border-gray-700 p-2">Fetches book cover images using ISBN.</td>
            </tr>
            <tr>
              <td className="border border-gray-700 p-2">Google Analytics</td>
              <td className="border border-gray-700 p-2">Basic usage analytics to improve the app (non-personal, aggregated data only).</td>
            </tr>
          </tbody>
        </table>
        <p className="text-gray-300 leading-relaxed mb-3">We do not store, sell, or misuse your information.</p>
        
        <h5 className="text-md font-semibold mb-2">4. Cookies & Local Storage</h5>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-3">
          <li>❌ No Cookies</li>
          <li>❌ No localStorage/sessionStorage</li>
          <li>✅ 100% temporary browser memory only</li>
        </ul>
        
        <h5 className="text-md font-semibold mb-2">5. Children’s Privacy</h5>
        <p className="text-gray-300 leading-relaxed mb-3">This app is not designed for users under 13 years of age. We do not knowingly collect data from children.</p>
        
        <h5 className="text-md font-semibold mb-2">6. Changes to This Policy</h5>
        <p className="text-gray-300 leading-relaxed mb-3">We may update this policy as the product grows (still in MVP stage). If updated, we will change the "Last Updated" date.</p>
        
        <h5 className="text-md font-semibold mb-2">7. Contact Us</h5>
        <p className="text-gray-300 leading-relaxed">If you have any questions about privacy:</p>
        <p className="text-gray-300 leading-relaxed">📩 Email: sadashivahiremath35@gmail.com</p>
      </>
    ),
    "Terms of Services": (
      <>
        <h4 className="text-lg font-bold mb-3">Terms of Service – Flashclev</h4>
        <p className="text-gray-300 leading-relaxed mb-2">Last Updated: [02/11/2025]</p>
        <p className="text-gray-300 leading-relaxed mb-4">By accessing or using Flashclev (“Service”), you agree to the following terms:</p>
        
        <h5 className="text-md font-semibold mb-2">1. What We Provide</h5>
        <p className="text-gray-300 leading-relaxed mb-2">Flashclev allows users to gain deep understanding of books by:</p>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-3">
          <li>Asking reflective and intelligent questions</li>
          <li>Helping users apply book concepts to real life</li>
        </ul>
        <p className="text-gray-300 leading-relaxed mb-3">This is an <strong>MVP (Minimum Viable Product)</strong> and is still under development.</p>
        
        <h5 className="text-md font-semibold mb-2">2. User Responsibilities</h5>
        <p className="text-gray-300 leading-relaxed mb-2">By using this service, you agree to:</p>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-3">
          <li>Use the app only for personal learning</li>
          <li>Not upload harmful, illegal, or abusive content</li>
          <li>Not attempt to hack, reverse-engineer, or misuse the service</li>
        </ul>
        <p className="text-gray-300 leading-relaxed mb-3">You are responsible for your own answers and learning progress.</p>
        
        <h5 className="text-md font-semibold mb-2">3. Ownership & Intellectual Property</h5>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-3">
          <li>You own your answers and thoughts typed inside the app.</li>
          <li>All app design, code, features, and trademarks belong to <strong>Flashclev</strong>.</li>
        </ul>
        
        <h5 className="text-md font-semibold mb-2">4. No Data Storage Guarantee</h5>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-3">
          <li>Flashclev stores <strong>no personal or chat data permanently</strong>.</li>
          <li>You understand and agree that all session data is temporary and deleted automatically.</li>
        </ul>
        
        <h5 className="text-md font-semibold mb-2">5. AI Disclaimer</h5>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-3">
          <li>Answers and questions are generated using <strong>Google Gemini API</strong>.</li>
          <li>AI outputs may be incorrect, incomplete, or biased.</li>
          <li>We are not liable for decisions made based on AI responses.</li>
        </ul>
        
        <h5 className="text-md font-semibold mb-2">6. Service Availability</h5>
        <p className="text-gray-300 leading-relaxed mb-2">Because this is an MVP:</p>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-3">
          <li>The service may go down unexpectedly</li>
          <li>Features may change or be removed</li>
          <li>We may restrict access if needed for security or maintenance</li>
        </ul>
        
        <h5 className="text-md font-semibold mb-2">7. Limitation of Liability</h5>
        <p className="text-gray-300 leading-relaxed mb-2">Flashclev and its founders are <strong>not responsible</strong> for:</p>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-3">
          <li>Any loss of data (since we don’t store any)</li>
          <li>Any damages caused by reliance on AI-generated answers</li>
          <li>Service disruption, errors, or downtime</li>
        </ul>
        
        <h5 className="text-md font-semibold mb-2">8. Changes to Terms</h5>
        <p className="text-gray-300 leading-relaxed mb-3">We may update these Terms at any time. Continued use after updates means you accept the new terms.</p>
        
        <h5 className="text-md font-semibold mb-2">9. Contact</h5>
        <p className="text-gray-300 leading-relaxed">📩 Email: <a href="mailto:sadashivahiremath35@gmail.com" className="text-blue-400 hover:underline">sadashivahiremath35@gmail.com</a></p>
      </>
    ),
    "About Us": (
      <>
        <h4 className="text-lg font-bold mb-3">About Us – Why Flashclev Exists</h4>
        <p className="text-gray-300 leading-relaxed mb-2">Most people read books.</p>
        <p className="text-gray-300 leading-relaxed mb-2">Very few understand them.</p>
        <p className="text-gray-300 leading-relaxed mb-2">And even fewer actually apply the lessons to their lives.</p>
        <p className="text-gray-300 leading-relaxed mb-4">That’s the problem we’re solving.</p>
        
        <h5 className="text-md font-semibold mb-2">🌟 Why We Exist</h5>
        <p className="text-gray-300 leading-relaxed mb-2">Flashclev was created with a simple belief:</p>
        <p className="text-gray-300 leading-relaxed mb-2">Reading a book should change the way you think, act, and live — not just fill your mind with information.</p>
        <p className="text-gray-300 leading-relaxed mb-2">But in real life, readers often face these struggles:</p>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-3">
          <li>They forget what they read after a few days.</li>
          <li>They understand the ideas, but can’t apply them.</li>
          <li>They highlight pages but never implement anything.</li>
          <li>They read fast, but don’t think deeply.</li>
        </ul>
        <p className="text-gray-300 leading-relaxed mb-3">So we built Flashclev to solve this — by turning reading into reflection, understanding, and real-life action.</p>
        
        <h5 className="text-md font-semibold mb-2">💡 How We Help Book Readers</h5>
        <p className="text-gray-300 leading-relaxed mb-2">Instead of giving summaries or notes, we do something different:</p>
        <p className="text-gray-300 leading-relaxed mb-2">We ask the right questions.</p>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-3">
          <li>You choose a book or concept.</li>
          <li>Flashclev asks meaningful, thought-provoking questions.</li>
          <li>You answer → your understanding becomes clearer, deeper, stronger.</li>
        </ul>
        <p className="text-gray-300 leading-relaxed mb-3">You don’t just “read” the book — you absorb it.</p>
        
        <h5 className="text-md font-semibold mb-2">✅ What Readers Get from Flashclev</h5>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-3">
          <li><strong>Deeper Understanding</strong> – You don’t just know the idea; you truly get it.</li>
          <li><strong>Better Memory Retention</strong> – Writing answers helps you remember longer.</li>
          <li><strong>Clarity in Thinking</strong> – Confusing concepts become simple and meaningful.</li>
          <li><strong>Real-Life Application</strong> – You start using book knowledge in decisions, habits, and actions.</li>
          <li><strong>Active Learning, Not Passive Reading</strong> – You engage with the book like a conversation, not just words on pages.</li>
        </ul>
        
        <h5 className="text-md font-semibold mb-2">📍 Our Mission</h5>
        <p className="text-gray-300 leading-relaxed">To help readers move from information to transformation.</p>
        <p className="text-gray-300 leading-relaxed">To make every book you read something that changes your life — not just fills your bookshelf.</p>
      </>
    ),
    "Contact Us": (
      <>
        <h4 className="text-lg font-bold mb-3">Contact Us – We're Here to Listen</h4>
        <p className="text-gray-300 leading-relaxed mb-2">Have a question, feedback, or an idea to improve Flashclev?</p>
        <p className="text-gray-300 leading-relaxed mb-4">We’d love to hear from you.</p>

        <h5 className="text-md font-semibold mb-2">📩 Email Us</h5>
        <p className="text-gray-300 leading-relaxed mb-4"><a href="mailto:sadashivahiremath35@gmail.com" className="text-blue-400 hover:underline">sadashivahiremath35@gmail.com</a></p>
        <p className="text-gray-300 leading-relaxed mb-4">(You can replace this with your real email when ready)</p>

        <h5 className="text-md font-semibold mb-2">💬 What Can You Contact Us For?</h5>
        <p className="text-gray-300 leading-relaxed mb-2">You can reach out to us for:</p>
        <ul className="list-disc list-inside text-gray-300 leading-relaxed mb-4">
          <li>Feedback or suggestions</li>
          <li>Bug reports or technical issues</li>
          <li>Business or collaboration inquiries</li>
          <li>Just to say hello or share how Flashclev helped you!</li>
        </ul>

        <h5 className="text-md font-semibold mb-2">🌍 We’re a Small Team with a Big Vision</h5>
        <p className="text-gray-300 leading-relaxed mb-2">Flashclev is in its early MVP stage, and every message from you helps us make it better.</p>
        <p className="text-gray-300 leading-relaxed">We personally read every email and try to respond as soon as possible.</p>
      </>
    ),
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 border border-gray-700/50 overflow-hidden">
        
        <header className="p-6 border-b border-gray-700/50">
            <div className="flex items-center justify-center">
                <h2 className="text-xl font-bold text-gray-200">Flashclev</h2>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-indigo-400 to-purple-500">
                <span className="block">Beyond Reading:</span>
                <span className="block">Understand, Apply,</span>
                <span className="block">Transform Your Life</span>
              </h1>
              <p className="text-lg text-gray-400 mb-12">
                Unlock the true power of every book.
              </p>
            
            <div className="relative h-48 flex justify-center items-center my-6">
                 <div className="grid grid-cols-[auto_auto_auto] grid-rows-[auto_auto] gap-x-8 gap-y-2 items-center w-full max-w-xs mx-auto">
                    <div className="col-start-1 row-start-1 justify-self-end">
                        <SproutIcon className="w-10 h-10 text-green-400/80 animate-float-medium" style={{animationDelay: '0.5s'}}/>
                    </div>
                    <div className="col-start-1 row-start-2 justify-self-end mt-4">
                        <SproutIcon className="w-10 h-10 text-green-400/80 animate-float-fast" />
                    </div>
                    <div className="col-start-2 row-start-1">
                        <LayersIcon className="w-24 h-24 text-purple-500/90 animate-float-slow" />
                    </div>
                    <div className="col-start-2 row-start-2 justify-self-center self-start pt-2">
                        <BookOpenIcon className="w-12 h-12 text-gray-500" />
                    </div>
                    <div className="col-start-3 row-start-1 row-span-2">
                        <ChatBubbleIcon className="w-12 h-12 text-yellow-400/90 animate-float-medium" style={{animationDelay: '0.2s'}}/>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative flex flex-col items-center justify-center gap-8 p-8 sm:p-12 lg:p-16">
            <div className="w-full max-w-sm p-6 bg-gray-900/50 rounded-2xl border border-gray-700/50 shadow-lg space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-gray-400">&lt; Back</p>
                    <LockIcon className="w-5 h-5 text-amber-500" />
                </div>
                <div className="p-4 rounded-lg bg-gray-800/50 space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex-shrink-0">
                            <UserIcon className="w-6 h-6 text-white"/>
                        </div>
                        <p className="text-gray-300 font-medium text-[15px]">How can the 'Growth Mindset' concept be applied to overcome daily challenges?</p>
                    </div>
                     <div className="h-12 bg-gray-700/50 rounded-lg animate-pulse"></div>
                </div>
                <div className="flex justify-center space-x-2 pt-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                </div>
            </div>
             <button
              onClick={onStart}
              className="w-full max-w-sm px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-full hover:shadow-lg hover:shadow-purple-500/30 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all transform hover:scale-105 duration-300"
            >
              Start Your Deep Understanding Journey
            </button>
          </div>
        </div>

        <div className="border-t border-gray-700/50 p-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-gray-400">
            {Object.keys(policies).map(key => (
              <button key={key} onClick={() => openModal(key, <p className="text-gray-300 leading-relaxed">{policies[key as keyof typeof policies]}</p>)} className="hover:text-white transition-colors">{key}</button>
            ))}
        </div>
      </div>
    </div>
      <Modal isOpen={!!modalContent} onClose={closeModal} title={modalContent?.title || ''}>
        {modalContent?.content}
      </Modal>
    </>
  );
};

export default LandingPage;