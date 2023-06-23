import React from 'react';
import BooksSearch from '../../components/booksResearch';
import BooksCategories from "../../components/booksCategories";

const Book = () => {
  return (
    <div>
      <h1>Books Page</h1>
      <BooksSearch />
      <BooksCategories />
      {/* Other content */}
    </div>
  );
}

export default Book;
