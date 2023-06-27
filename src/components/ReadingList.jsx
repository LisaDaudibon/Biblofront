import React from 'react';

const ReadingList = ({ readingList }) => {
  return (
    <div>
      <h2>Reading List:</h2>
      <ul>
        {readingList.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingList;
