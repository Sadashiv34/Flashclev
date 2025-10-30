
import React, { useState } from 'react';
import type { Book } from '../types';

interface WriteOwnWordsPageProps {
  book: Book;
}

const WriteOwnWordsPage: React.FC<WriteOwnWordsPageProps> = ({ book }) => {
  const [notes, setNotes] = useState('');

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-100">{book.title}</h2>
        <p className="text-lg text-teal-400">Write in Your Own Words</p>
      </div>

      <p className="text-gray-400 mb-4 text-center">
        What did you understand from this book? How will you apply it to your goal? Write it down to solidify your learning.
      </p>

      <div className="flex-grow">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Start writing your thoughts, summaries, and action plans here..."
          className="w-full h-full bg-gray-800 text-gray-200 placeholder-gray-500 rounded-lg p-4 border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none leading-relaxed"
        />
      </div>
    </div>
  );
};

export default WriteOwnWordsPage;
