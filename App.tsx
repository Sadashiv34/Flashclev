import React, { useState } from 'react';
import { Page, Book } from './types';
import { getBookSuggestionsBatch, generateBookCoverImage } from './services/geminiService';
import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';
import BookSuggestionPage from './components/BookSuggestionPage';
import BookPage from './components/BookPage';
import Loader from './components/Loader';

const processBooksWithCovers = async (books: Omit<Book, 'coverImageUrl'>[]): Promise<Book[]> => {
  const checkImage = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url);
      if (!response.ok) return false;
      const blob = await response.blob();
      // OpenLibrary returns a tiny placeholder for missing covers
      return blob.size > 1000; 
    } catch (error) {
      console.error("Error checking image:", error);
      return false;
    }
  };

  return Promise.all(
    books.map(async (book) => {
      const coverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
      const imageExists = book.isbn ? await checkImage(coverUrl) : false;

      if (imageExists) {
        return { ...book, coverImageUrl: coverUrl };
      } else {
        try {
          const generatedImageBase64 = await generateBookCoverImage(book.title, book.description);
          return { ...book, coverImageUrl: `data:image/png;base64,${generatedImageBase64}` };
        } catch (e) {
          console.error(`Failed to generate cover for ${book.title}:`, e);
          // Return with an empty URL to show a placeholder
          return { ...book, coverImageUrl: '' };
        }
      }
    })
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);
  const [userGoal, setUserGoal] = useState<string>('');
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const handleStartJourney = () => {
    setCurrentPage(Page.Search);
  };

  const handleSearch = async (goal: string) => {
    setUserGoal(goal);
    setIsLoading(true);
    setSuggestedBooks([]);
    setLoadingMessage('Finding the perfect books for your goal...');

    // Generate books in parallel batches of 2
    const books = await getBookSuggestionsBatch(goal, [], 2);

    // Process covers for all books at once (since we want to show them progressively)
    const booksWithCovers = await processBooksWithCovers(books);

    // Show first 4 books immediately
    setSuggestedBooks(booksWithCovers.slice(0, 4));
    setIsLoading(false);
    setCurrentPage(Page.Suggestions);

    // Continue processing remaining books in background if any
    if (booksWithCovers.length > 4) {
      setTimeout(() => {
        setSuggestedBooks(booksWithCovers);
      }, 100); // Small delay to allow UI to update first
    }
  };

  const loadMoreBooks = async () => {
    if (isFetchingMore || !userGoal) return;

    setIsFetchingMore(true);
    const existingTitles = suggestedBooks.map(b => b.title);
    const newBooks = await getBookSuggestionsBatch(userGoal, existingTitles, 2);

    if (newBooks.length > 0) {
        const booksWithCovers = await processBooksWithCovers(newBooks);
        setSuggestedBooks(prevBooks => [...prevBooks, ...booksWithCovers]);
    }
    // If no new books, just stop the loader. Maybe show a message in the future.
    setIsFetchingMore(false);
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setCurrentPage(Page.Book);
  };
  
  const handleBackToSuggestions = () => {
    setSelectedBook(null);
    setCurrentPage(Page.Suggestions);
  };

  const handleBackToSearch = () => {
    setUserGoal('');
    setSuggestedBooks([]);
    setCurrentPage(Page.Search);
  };

  const renderPage = () => {
    if (isLoading) {
      return <Loader message={loadingMessage} />;
    }

    switch (currentPage) {
      case Page.Landing:
        return <LandingPage onStart={handleStartJourney} />;
      case Page.Search:
        return <SearchPage onSearch={handleSearch} />;
      case Page.Suggestions:
        return (
          <BookSuggestionPage 
            goal={userGoal} 
            books={suggestedBooks} 
            onSelectBook={handleSelectBook} 
            onGoBack={handleBackToSearch} 
            onLoadMore={loadMoreBooks}
            isFetchingMore={isFetchingMore}
          />
        );
      case Page.Book:
        if (selectedBook) {
          return <BookPage book={selectedBook} goal={userGoal} onGoBack={handleBackToSuggestions} />;
        }
        // Fallback to search if no book is selected
        setCurrentPage(Page.Search);
        return <SearchPage onSearch={handleSearch} />;
      default:
        return <LandingPage onStart={handleStartJourney} />;
    }
  };

  const appBgClass = currentPage === Page.Landing ? 'bg-slate-50 text-gray-800' : 'bg-gray-900 text-white';

  return (
    <div className={`min-h-screen font-sans ${appBgClass}`}>
      {renderPage()}
    </div>
  );
};

export default App;