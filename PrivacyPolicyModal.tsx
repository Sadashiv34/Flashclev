import React from 'react';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
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
          <h2 className="text-2xl font-bold text-gray-800">Privacy Policy</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close privacy policy"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        <main className="p-6 md:p-8 overflow-y-auto text-gray-700 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">Flashclev— Privacy Policy</h3>
          <p><strong>Effective date:</strong> October 29, 2025</p>
          <p>This Privacy Policy explains how Flashclev ("we", "our", or "Flashclev") handles information in the Flashclev web app (the "App"). Flashclev is currently offered as an MVP (minimum viable product). Please read this policy carefully.</p>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">1. Summary (short & simple)</h4>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Flashclev <strong>does not</strong> permanently store your goals, answers, or notes on any server or database. Everything happens during your current browser session and is cleared when you navigate away or refresh the page.</li>
              <li>To power book suggestions and image generation, Flashclev sends the inputs you provide (your goal, answers, and book-related text) to third-party AI services (Google Gemini) and to Open Library to attempt to fetch book covers. Those third parties process your inputs according to their policies.</li>
              <li>Do not submit highly sensitive personal data (passwords, personal identity numbers, medical records, etc.) into the App.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">2. What information we receive and process</h4>
            <p><strong>Information you enter (session data)</strong></p>
            <p>When you type a goal, answers in "Deep Understanding", or write in "Write Your Own Words", that text is held in application memory during your browser session so the App can function. This data is <strong>not</strong> permanently stored by Flashclev.</p>
            <p><strong>Information sent to third-party services</strong></p>
            <p>To generate book suggestions and image covers, Flashclev sends the text you provide (for example: goal text, book descriptions, or prompts) to the Google Gemini API (models such as <code>gemini-2.5-flash</code> and <code>gemini-2.5-flash-image</code>) and may call Open Library to check for an existing cover image using the ISBN. Those services process and may retain the inputs according to their own policies. Please review Google’s and Open Library’s privacy terms if you want full details.</p>
            <p><strong>Automatically collected technical data</strong></p>
            <p>The App may collect minimal technical metadata required to run (for example: transient session identifiers, browser type, and client-side logs for debugging). This data is used only to operate and debug the App during the session and is not tied to a persistent user identity.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">3. How we use the information</h4>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>To generate personalized book suggestions using the Gemini AI models.</li>
              <li>To attempt to fetch official book covers from Open Library using ISBN, and to generate cover images via an image-generation model if no official cover exists.</li>
              <li>To maintain the session state so you can see the conversation and results while you use the App.</li>
              <li>To analyze usage patterns and improve the App’s design and usability through Google Analytics. This includes collecting anonymized information about how users interact with the app (for example, which buttons are pressed most often, how users navigate between pages, and overall usage counts). Google Analytics data is aggregated and does not identify individual users.</li>
              <li>Flashclev does not perform long-term tracking tied to your personal inputs or goals.</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">4. No account required / no sign-in data</h4>
            <p>Flashclev’s MVP does not require sign-up or authentication. We do not collect or maintain user account profiles by default.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">5. Data retention and deletion</h4>
             <p><strong>Flashclev (the App)</strong>: Your typed content is stored only for the duration of your active session in browser memory. If you refresh, close, or navigate away from the page, the content is erased from the App and cannot be recovered.</p>
            <p><strong>Third parties</strong>: Inputs that are sent to Google Gemini and Open Library are subject to those providers’ data retention and handling policies. We do not control the retention practices of those third parties.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">6. Sharing and third parties</h4>
            <p>Flashclev does not sell your personal data.</p>
            <p>We do share the session inputs with third-party APIs (Google Gemini for book suggestion and image generation; Open Library for cover lookup). You should assume those services may log or process your input as described in their own terms.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">7. AI-generated content and accuracy</h4>
            <p>Book lists, descriptions, ISBNs, and other metadata are generated by an AI model on-the-fly. While we instruct the model to return structured JSON and accurate metadata, AI outputs can be incorrect or incomplete. Always verify factual information (ISBN, author names, publication dates) before relying on it for important purposes.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">8. Advice about sensitive personal data</h4>
            <p>Do not enter extremely sensitive personal information (for example: government identifiers, medical histories, passwords, or financial account numbers). The App is not designed to store or secure such sensitive data.</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">9. Security</h4>
            <p>We take reasonable steps to protect your session data on the client side. However, no internet transmission or storage system is completely secure. Flashclev cannot guarantee absolute security. If you are using the App in a public or shared computer, close the browser tab when finished.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">10. Children</h4>
            <p>The App is not intended for children under 13. If you are under 13, do not use the App. If you are a parent or guardian and believe a child under 13 provided personal information in the App, contact us (see below) and we will try to remove it.</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">11. Changes to this policy</h4>
            <p>We may update this Privacy Policy as the product evolves. The effective date above will reflect the most recent revision.</p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">12. Contact</h4>
            <p>For questions or requests regarding privacy, please contact: <a href="mailto:sadashivahiremath35@gmail.com" className="text-teal-600 hover:underline">sadashivahiremath35@gmail.com</a></p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
