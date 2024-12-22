/** @format */

import React, { useEffect, useState } from 'react';

const HtmlTagRemove = ({ content }) => {
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    const htmlString = content; // Replace this with your actual HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Extract text content from the parsed document
    const textContent = doc.body.textContent || '';

    setTextContent(textContent);
  }, []);

  return (
    <div>
      <p>{textContent != null ? textContent.toString().slice(0, 130) : null}</p>
    </div>
  );
};

export default HtmlTagRemove;
