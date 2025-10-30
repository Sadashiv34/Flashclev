import React, { useState } from 'react';
import { Book, BookSubPage } from '../types';
import DeepUnderstandingPage from './DeepUnderstandingPage';
import WriteOwnWordsPage from './WriteOwnWordsPage';

interface BookPageProps {
  book: Book;
  goal: string;
  onGoBack: () => void;
}

const BookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v11.494m0 0a2.495 2.495 0 00-4.496.001 2.495 2.495 0 00-4.496 0M12 6.253V4.75a2.25 2.25 0 012.25-2.25h3.75a2.25 2.25 0 012.25 2.25v14.5a2.25 2.25 0 01-2.25 2.25h-3.75a2.25 2.25 0 01-2.25-2.25M12 6.253h4.496a2.495 2.495 0 010 4.99H12v-4.99z" />
    </svg>
);

const ThumbsUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.236V6.764L12.036 2.036a2 2 0 012.414.015L14 3.5" />
    </svg>
);

const ThumbsDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3h4.017c.163 0 .326.02.485.06L17 5.764v11.472L11.964 21.964a2 2 0 01-2.414-.015L10 20.5" />
    </svg>
);

const BookPage: React.FC<BookPageProps> = ({ book, goal, onGoBack }) => {
  const [subPage, setSubPage] = useState<BookSubPage>(BookSubPage.Reading);
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

  const renderSubPage = () => {
    switch (subPage) {
      case BookSubPage.DeepUnderstanding:
        return <DeepUnderstandingPage book={book} goal={goal} />;
      case BookSubPage.WriteOwnWords:
        return <WriteOwnWordsPage book={book} />;
      case BookSubPage.Reading:
      default:
        return (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 p-6 h-full">
            {/* Book Cover */}
            <div className="w-64 flex-shrink-0">
                <div className="aspect-[2/3] w-full bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
                    {book.coverImageUrl ? (
                        <img src={book.coverImageUrl} alt={`Cover for ${book.title}`} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center p-4 bg-gray-700">
                            <BookIcon className="h-20 w-20 text-gray-500"/>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Book Info & Feedback */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                <p className="text-lg text-gray-400 mb-6">{book.author}</p>

                <p className="text-gray-300 mb-6">Should others read this for self-improvement?</p>
                <div className="flex space-x-4">
                    <button 
                      onClick={() => setFeedback('like')} 
                      className={`p-3 rounded-full transition-colors duration-200 ${feedback === 'like' ? 'bg-teal-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                      aria-label="Like this book"
                    >
                        <ThumbsUpIcon className="h-6 w-6"/>
                    </button>
                    <button 
                      onClick={() => setFeedback('dislike')} 
                      className={`p-3 rounded-full transition-colors duration-200 ${feedback === 'dislike' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                      aria-label="Dislike this book"
                    >
                        <ThumbsDownIcon className="h-6 w-6"/>
                    </button>
                </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="p-4">
        <button onClick={onGoBack} className="text-teal-400 hover:text-teal-300 transition-colors">&larr; Back to Suggestions</button>
      </header>

      <main className="flex-grow flex flex-col p-4 sm:p-6 lg:p-8">
        {renderSubPage()}
      </main>

      <footer className="sticky bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 p-4">
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => setSubPage(BookSubPage.DeepUnderstanding)}
            className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 ${subPage === BookSubPage.DeepUnderstanding ? 'bg-teal-500 text-white scale-105' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Deep Understanding
          </button>
          <button 
            onClick={() => setSubPage(BookSubPage.WriteOwnWords)}
            className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 ${subPage === BookSubPage.WriteOwnWords ? 'bg-teal-500 text-white scale-105' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Write Your Own Words
          </button>
        </div>
      </footer>
    </div>
  );
};

export default BookPage;