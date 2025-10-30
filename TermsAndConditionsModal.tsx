import React from 'react';

interface TermsAndConditionsModalProps {
  onClose: () => void;
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-5 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Terms of Service</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close terms of service"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        <main className="p-6 md:p-8 overflow-y-auto text-gray-700 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Flashclev — Terms of Service (Terms & Conditions)</h3>
          <p><strong>Effective date:</strong> October 29, 2025</p>
          <p>These Terms of Service ("Terms") govern your use of the Flashclev web application (the "App"). By using the App you agree to these Terms. If you do not agree, please do not use the App.</p>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">1. Service description</h4>
            <p>Flashclev is an MVP web application that helps users find book suggestions tailored to a written goal and provides an interactive "Deep Understanding" feature that asks AI-generated questions to help users reflect on book concepts. Book metadata and cover images are returned either by fetching existing covers from Open Library or by generating covers using an AI image model.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">2. No user accounts / session-based use</h4>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Flashclev operates on a session basis and does not require or store user accounts by default.</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">3. User responsibilities and acceptable use</h4>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>You are responsible for the content you enter into the App. Do not enter illegal content, copyrighted material you do not have rights to, or highly sensitive personal data.</li>
              <li>You must not use the App to attempt to reverse-engineer, overload, or abuse the third-party services the App calls (including Google Gemini and Open Library).</li>
              <li>You agree to comply with all applicable laws when using the App.</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">4. Intellectual property</h4>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>The App’s code, UI, and original content are owned by Flashclev (unless otherwise stated).</li>
              <li>AI-generated outputs (book lists, summaries, images) are produced on-the-fly. You are free to use the AI-generated content for personal, non-commercial purposes, but please verify accuracy before re-publishing or commercializing any AI-generated factual claims (such as ISBN or author data).</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">5. Third-party services</h4>
            <p>The App relies on third-party APIs (e.g., Google Gemini, Open Library). Those APIs have their own terms and privacy practices. Flashclev is not responsible for third-party practices.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">6. Disclaimers and limitation of liability</h4>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>THE SERVICE IS PROVIDED "AS IS". FLASHCLEV MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE ACCURACY, RELIABILITY, OR COMPLETENESS OF THE AI-GENERATED CONTENT.</li>
              <li>Flashclev is not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the App, including reliance on AI-generated content.</li>
              <li>Because AI outputs can be incorrect, you should independently verify important details before relying on them.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">7. Indemnification</h4>
            <p>You agree to indemnify and hold harmless Flashclev and its affiliates from any claims, liabilities, damages, losses, or expenses arising from your misuse of the App or violation of these Terms.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">8. Termination</h4>
            <p>We may suspend or terminate the App or block a user's access at any time for any reason, including abuse or violation of these Terms.</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">9. Changes to the terms</h4>
            <p>We may change these Terms. If we do, we will post the updated Terms and update the effective date. Continued use constitutes acceptance of the changed Terms.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">10. Governing law</h4>
            <p>This App is provided on an experimental basis. In case of any concern or dispute, users agree to first contact Flashclev to attempt an informal resolution. No formal legal relationship is created by using this MVP.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">11. Contact</h4>
            <p>For questions about these Terms, please contact: <a href="mailto:sadashivahiremath35@gmail.com" className="text-teal-600 hover:underline">sadashivahiremath35@gmail.com</a></p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;