import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';

const Heading = () => {
  const sentences = [
    "Welcome to Yorty",
    "Melcome to Yiorty",
    "Welcome to Yiorti"
    // Add more sentences as needed
  ];

  const [showLastSentence, setShowLastSentence] = useState(false);

  return (
    <div className="header">
      <Typewriter
        options={{
          strings: sentences,
          autoStart: true,
          loop: true,
          cursor: '|', // Optional cursor styling
          delay: 100, // Adjust typing speed here
          deleteSpeed: 50, // Adjust speed of deleting characters
          onComplete: () => setShowLastSentence(true) // Set flag to show last sentence
        }}
      />
      {showLastSentence && (
        <div className="last-sentence">{sentences[sentences.length - 1]}</div>
      )}
    </div>
  );
};

export default Heading;
    