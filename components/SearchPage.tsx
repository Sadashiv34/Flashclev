
import React, { useState } from 'react';
import { SearchIcon } from './icons';

interface SearchPageProps {
  onSearch: (bookName: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ onSearch }) => {
  const [bookName, setBookName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookName.trim()) {
      onSearch(bookName.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-8 text-slate-100">Enter the book name</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="e.g., Sapiens"
              className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-full text-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full px-8 py-4 bg-purple-600 text-white font-bold text-lg rounded-full hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-transform transform hover:scale-105 duration-300 disabled:bg-purple-800 disabled:cursor-not-allowed disabled:scale-100"
            disabled={!bookName.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;
