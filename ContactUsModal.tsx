import React from 'react';

interface ContactUsModalProps {
  onClose: () => void;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-5 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close contact us modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        <main className="p-6 md:p-8 overflow-y-auto text-gray-700 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">We’d love to hear from you</h3>
            <p>At <strong>Flashclev</strong>, we believe meaningful learning starts with clear conversations.</p>
            <p>Whether you have a question, feedback, or partnership idea — we’re always here to listen.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Get in touch</h3>
            <p>
              <span role="img" aria-label="email">📩</span> <strong>Email:</strong> <a href="mailto:sadashivahiremath35@gmail.com" className="text-teal-600 hover:underline">sadashivahiremath35@gmail.com</a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContactUsModal;
