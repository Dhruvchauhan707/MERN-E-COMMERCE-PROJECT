import React, { useState, useEffect } from 'react';
import '../../styles/user/ImageSlider.css';

const ImageSlider = () => {
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      title: 'Summer Sale',
      subtitle: 'Upto 50% OFF',
      buttonText: 'Shop Now'
    },
    {
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      title: 'New Arrivals',
      subtitle: 'Trendy Collection 2026',
      buttonText: 'Explore'
    },
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
      title: 'Premium Quality',
      subtitle: 'Best Products for You',
      buttonText: 'Buy Now'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      <div 
        className="slider-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide.image} alt={`Slide ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <button className="slider-btn">{slide.buttonText}</button>
            </div>
          </div>
        ))}
      </div>

      <button className="arrow left-arrow" onClick={prevSlide}>
        ❮
      </button>
      <button className="arrow right-arrow" onClick={nextSlide}>
        ❯
      </button>

      <div className="dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;