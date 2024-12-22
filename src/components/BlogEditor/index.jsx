/** @format */

import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import { TbEdit } from 'react-icons/tb';
import { TiLocation } from 'react-icons/ti';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import {
  MdOutlineFormatListBulleted,
  MdOutlineFormatListNumbered,
} from 'react-icons/md';
import { HiMiniPaperClip } from 'react-icons/hi2';

function BlogEditor({
  handleImageSelect,
  selectedImages,
  setContent,
  content,
  setParsedContent,
  parsedContent,
  editableFields,
  formData,
  handleChange,
}) {
  const textAreaRef = useRef(null);

  const handleButtonClick = (style) => {
    const textarea = textAreaRef.current;
    if (!textarea) {
      console.error('Textarea not found.');
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let newText;
    let cursorPosition;

    switch (style) {
      case 'bold':
        newText = `**${selectedText}**`;
        cursorPosition = start + 2;
        break;
      case 'italic':
        newText = `_${selectedText}_`;
        cursorPosition = start + 1;
        break;
      case 'underline':
        newText = `++${selectedText}++`;
        cursorPosition = start + 2;
        break;
      // Add more styles as needed
      default:
        newText = content;
        cursorPosition = start;
        break;
    }

    const updatedContent =
      content.substring(0, start) + newText + content.substring(end);

    setContent(updatedContent);

    // Set the cursor position after updating the content
    setTimeout(() => {
      textarea.setSelectionRange(cursorPosition, cursorPosition);
      textarea.focus();
    }, 0);
  };

  const handleContentChange = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setContent((prevContent) => `${prevContent}\n\n`);
    } else {
      setContent(e.target.value);
    }
  };

  const parseMarkdown = (text) => {
    if (!text.trim()) {
      return '';
    }

    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/\+\+(.*?)\+\+/g, '<u>$1</u>');
  };

  useEffect(() => {
    setParsedContent(parseMarkdown(content));
  }, [content]);

  // console.log(parsedContent);
  return (
    <div className="blog-editor">
      {editableFields.title ? (
        <input
          value={formData.author}
          onChange={(e) => handleChange('author', e.target.value)}
        />
      ) : (
        <h5>Blog Content</h5>
      )}
      <div className="editor-toolbar">
        <b>Normal</b>
        <span id="bold" onClick={() => handleButtonClick('bold')}>
          B
        </span>
        <span id="italic" onClick={() => handleButtonClick('italic')}>
          I
        </span>
        <span id="uniq" onClick={() => handleButtonClick('underline')}>
          U
        </span>
        <span id="bullet" onClick={() => handleButtonClick('ul')}>
          <MdOutlineFormatListBulleted fontSize={24} />
        </span>
        <span id="list" onClick={() => handleButtonClick('ol')}>
          <MdOutlineFormatListNumbered fontSize={24} />
        </span>
        <span id="location">
          <TiLocation fontSize={25} />
        </span>
        <span id="clip">
          <HiMiniPaperClip fontSize={24} />
        </span>
        <span id="upload" onClick={() => handleButtonClick('image')}>
          <input
            style={{ width: '40px' }}
            type="file"
            multiple
            onChange={handleImageSelect}
          />
          <span>
            <AiOutlineCloudUpload fontSize={24} />
          </span>
        </span>
      </div>
      <div className="break-line"></div>
      <textarea
        id="editor-content"
        ref={textAreaRef}
        className="editor-content"
        value={content}
        onChange={handleContentChange}
        placeholder="Write your blog content here..."
        onKeyDown={handleContentChange}
      />
      <div className="preview">
        <h3>Preview:</h3>
        {/* <div dangerouslySetInnerHTML={{ __html: parsedContent }} /> */}
      </div>
      <div className="image-row">
        {selectedImages?.length > 0
          ? selectedImages?.map((image, index) => (
              <React.Fragment key={index}>
                <img src={image?.image} alt={`Selected ${index + 1}`} />
              </React.Fragment>
            ))
          : null}
      </div>
    </div>
  );
}

export default BlogEditor;
