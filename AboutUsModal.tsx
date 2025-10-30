import React from 'react';

interface AboutUsModalProps {
  onClose: () => void;
}

const AboutUsModal: React.FC<AboutUsModalProps> = ({ onClose }) => {
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
          <h2 className="text-2xl font-bold text-gray-800">About Flashclev</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close about us"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        <main className="p-6 md:p-8 overflow-y-auto text-gray-700 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Why we exist</h3>
            <p>People read books, but reading alone rarely changes life. Most summaries are shallow or distracting, and finding the right book for <em>your</em> goal takes time. Flashclev exists to fix that — to turn book knowledge into clear action you can apply today.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">How Flashclev works — step by step</h3>
            <ol className="list-decimal list-outside space-y-3 pl-5">
              <li>
                <strong>Tell us your goal</strong>
                <p className="text-gray-600 mt-1">Enter one thing you want to achieve (career growth, habit change, startup skills, managing time, etc.).</p>
              </li>
              <li>
                <strong>Get goal-based book suggestions</strong>
                <p className="text-gray-600 mt-1">We surface books that match your objective — no sponsored clutter, no noise, just what helps you reach the goal.</p>
              </li>
              <li>
                <strong>Dive into deep understanding</strong>
                <p className="text-gray-600 mt-1">For each recommended book we give targeted questions and short lessons designed to extract the core ideas — not summaries, but understanding.</p>
              </li>
              <li>
                <strong>Answer & reflect</strong>
                <p className="text-gray-600 mt-1">Write short answers to scenario-based questions and reflection prompts. This tests what you’ve understood and reveals the clarity of your thinking.</p>
              </li>
              <li>
                <strong>Apply with confidence</strong>
                <p className="text-gray-600 mt-1">We show how the key ideas map to real-life situations and give simple action steps you can try right away.</p>
              </li>
              <li>
                <strong>Save your “Your Words” notes</strong>
                <p className="text-gray-600 mt-1">Write the book’s lessons in your own words — a quick, powerful habit that locks learning into behavior.</p>
              </li>
            </ol>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Why people use Flashclev (benefits)</h3>
            <ul className="list-disc list-outside space-y-2 pl-5">
              <li><strong>Goal-first recommendations</strong> — Books chosen for <em>your</em> objective, not for clicks.</li>
              <li><strong>No distractions</strong> — Clean, sponsored-free guidance that respects your focus.</li>
              <li><strong>Practical application</strong> — We don’t stop at reading — we help you apply ideas to your life.</li>
              <li><strong>Active reflection</strong> — Writing in your own words improves clarity, recall, and action.</li>
              <li><strong>Confidence check</strong> — Scenario-based questions show you where you truly understand — and where you need work.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">What changes in your life</h3>
            <ul className="list-disc list-outside space-y-2 pl-5">
              <li>You make faster progress toward goals because your reading stays practical.</li>
              <li>You stop collecting notes and start applying lessons.</li>
              <li>You gain clearer thinking and better decision-making from focused reflection.</li>
              <li>You turn knowledge into visible results — at work, in business, or in personal growth.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Our vision</h3>
            <p>We help readers become doers. Flashclev exists so knowledge doesn’t sit on a shelf — it becomes what makes you stand out.</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">Ready to get started?</h3>
            <p>Click <strong>Get Started</strong> and tell us one goal. We’ll show you the first book and a simple path to real understanding and action.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutUsModal;
