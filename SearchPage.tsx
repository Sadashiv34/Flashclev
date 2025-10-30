
import React, { useState } from 'react';

interface SearchPageProps {
  onSearch: (goal: string) => void;
}

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const SearchPage: React.FC<SearchPageProps> = ({ onSearch }) => {
  const [goal, setGoal] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim()) {
      onSearch(goal.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 animate-fade-in-down">Write your goal</h1>
        <form onSubmit={handleSearch} className="relative animate-fade-in-up">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., improve my focus and discipline"
            className="w-full h-14 pl-12 pr-4 rounded-full bg-gray-800 text-white placeholder-gray-500 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!goal.trim()}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;
