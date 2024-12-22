/** @format */

import React, { useState } from 'react';
import { MoveRight, MoveLeft } from 'lucide-react';
import './carousal.css';
import { useNavigate } from 'react-router-dom';

function Carousal() {
  const contentData = [
    {
      id: 1,
      heading: "World's Biggest",
      subheading: 'Cones collection',
      text: 'Discover the largest collection of pre-rolled cones globally. A simple, yet comprehensive range showcasing top-quality and options.',
    },
    {
      id: 2,
      heading: 'Discover Excellence',
      subheading: 'Unparalleled Papers',
      text: 'Discover our handpicked collection, offering premium quality and a wide range of options to every individual enthusiast.',
    },
    // Add more data items as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < contentData.length - 1 ? prevIndex + 1 : prevIndex,
    );
  };

  const showPreviousItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div>
      <div>
        <h2 className="carousal-h2">{contentData[currentIndex].heading}</h2>
        <h2 className="carousal-h1">{contentData[currentIndex].subheading}</h2>
        <p className="carousal-p">{contentData[currentIndex].text}</p>
      </div>
      <div className="button-wrapper flex gap-[20px] mt-[30px]">
        <button
          className="discover-btn"
          onClick={() => {
            navigate('/productlisting');
            scrollToTop();
          }}
        >
          Discover Now
        </button>
        <button onClick={showPreviousItem} className="previous-btn">
          <MoveLeft strokeWidth={1.5} />
        </button>
        <button onClick={showNextItem} className="next-btn  ">
          <MoveRight strokeWidth={1.5} color="#ffff" />
        </button>
      </div>
    </div>
  );
}

export default Carousal;
