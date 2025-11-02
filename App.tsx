import React, { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';
import DeepDivePage from './components/DeepDivePage';

type Page = 'landing' | 'search' | 'deepDive';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentBook, setCurrentBook] = useState<string>('');

  const handleStartJourney = useCallback(() => {
    setCurrentPage('search');
  }, []);

  const handleSearch = useCallback((bookName: string) => {
    setCurrentBook(bookName);
    setCurrentPage('deepDive');
  }, []);

  const handleSearchAnotherBook = useCallback(() => {
    setCurrentBook('');
    setCurrentPage('search');
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onStart={handleStartJourney} />;
      case 'search':
        return <SearchPage onSearch={handleSearch} />;
      case 'deepDive':
        return <DeepDivePage bookName={currentBook} onSearchAnother={handleSearchAnotherBook} />;
      default:
        return <LandingPage onStart={handleStartJourney} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] text-gray-100 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;