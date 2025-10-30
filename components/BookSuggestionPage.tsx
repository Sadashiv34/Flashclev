
import React, { useRef, useCallback } from 'react';
import type { Book } from '../types';

interface BookSuggestionPageProps {
  goal: string;
  books: Book[];
  onSelectBook: (book: Book) => void;
  onGoBack: () => void;
  onLoadMore: () => void;
  isFetchingMore: boolean;
}

const BookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v11.494m0 0a2.495 2.495 0 00-4.496.001 2.495 2.495 0 00-4.496 0M12 6.253V4.75a2.25 2.25 0 012.25-2.25h3.75a2.25 2.25 0 012.25 2.25v14.5a2.25 2.25 0 01-2.25-2.25h-3.75a2.25 2.25 0 01-2.25-2.25M12 6.253h4.496a2.495 2.495 0 010 4.99H12v-4.99z" />
    </svg>
);


const BookSuggestionPage: React.FC<BookSuggestionPageProps> = ({ goal, books, onSelectBook, onGoBack, onLoadMore, isFetchingMore }) => {
  const observer = useRef<IntersectionObserver>();
  const lastBookElementRef = useCallback((node: HTMLDivElement | null) => {
      if (isFetchingMore) return;
      if (observer.current) observer.current.disconnect();
      // FIX: The IntersectionObserver constructor requires a callback function, which was missing.
      // This callback triggers `onLoadMore` when the observed element becomes visible.
      observer.current = new IntersectionObserver((entries) => {
          if (entries[0]?.isIntersecting) {
              onLoadMore();
          }
      });
      if (node) observer.current.observe(node);
  }, [isFetchingMore, onLoadMore]);

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <button onClick={onGoBack} className="mb-6 text-teal-400 hover:text-teal-300 transition-colors">&larr; Change Goal</button>
        <div className="text-center mb-10">
            <p className="text-gray-400 mb-2">Your Goal:</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 bg-gray-800/50 rounded-lg p-3 inline-block">{goal}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {books.map((book, index) => (
            <div 
              ref={books.length === index + 1 ? lastBookElementRef : null}
              key={index} 
              onClick={() => onSelectBook(book)}
              className="bg-gray-800 rounded-xl shadow-lg cursor-pointer transform hover:-translate-y-1 transition-transform duration-300 ease-in-out border border-gray-700 hover:border-teal-500 flex flex-col md:flex-row overflow-hidden group"
            >
              {/* --- Book Cover --- */}
              <div className="w-full md:w-56 flex-shrink-0 p-6 flex items-center justify-center">
                <div className="aspect-[2/3] w-full max-w-[200px] md:max-w-none bg-gray-700 rounded-lg shadow-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  {book.coverImageUrl ? (
                    <img src={book.coverImageUrl} alt={`Cover for ${book.title}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4">
                      <BookIcon className="h-20 w-20 text-gray-500"/>
                    </div>
                  )}
                </div>
              </div>
              
              {/* --- Book Details --- */}
              <div className="p-6 pt-0 md:pt-6 flex-grow flex flex-col">
                  <h2 className="text-xl font-bold text-gray-100">{book.title}</h2>
                  <p className="text-md text-gray-400 mb-4 italic">{book.author}</p>
                  
                  <p className="text-gray-300 mb-5">{book.description}</p>
                  
                  <div className="mt-auto space-y-4">
                      <div>
                          <h3 className="font-semibold text-teal-400 mb-2">Key Takeaways:</h3>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            {book.keyTakeaways.map((takeaway, i) => <li key={i}>{takeaway}</li>)}
                          </ul>
                      </div>

                      <div>
                          <h3 className="font-semibold text-teal-400 mb-2">Outcomes:</h3>
                          <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                            {book.outcomes.map((outcome, i) => <li key={i}>{outcome}</li>)}
                          </ul>
                      </div>
                  </div>
              </div>
            </div>
          ))}
        </div>

        {isFetchingMore && (
            <div className="mt-8 flex justify-center items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-400"></div>
                <p className="ml-4 text-gray-300">Loading more books...</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default BookSuggestionPage;
