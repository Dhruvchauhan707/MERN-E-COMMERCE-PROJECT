import React from 'react';
import '../../styles/user/AboutUs.css';
import { FaQuoteLeft } from 'react-icons/fa';
import Footer from '../../components/user/Footer';

const AboutUs = () => {
  return (
    <div className="about-us-classic">
      <section className="classic-hero">
        <div className="hero-overlay">
          <h1>About Our Store</h1>
          <p className="tagline">Since 2024 • Quality • Trust • Tradition</p>
        </div>
      </section>

      <section className="intro-section">
        <div className="container">
          <p className="intro-text">
            Welcome to <strong>[Your Store Name]</strong>. We are more than just an online store — 
            we are a family committed to bringing you the finest products with honesty and care.
          </p>
        </div>
      </section>

      <section className="story-section">
        <div className="container">
          <h2>Our Story</h2>
          <div className="story-content">
            <p>
              Founded in 2024 with a simple vision — to provide high-quality products at reasonable prices 
              with exceptional customer service. What started as a small dream has now grown into a trusted 
              name in online shopping across India.
            </p>
            <p>
              Every product you see on our website is carefully selected and tested for quality. 
              We believe in building long-term relationships with our customers based on trust and transparency.
            </p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>01</h3>
              <h4>Quality First</h4>
              <p>We never compromise on the quality of our products.</p>
            </div>
            <div className="value-card">
              <h3>02</h3>
              <h4>Customer Trust</h4>
              <p>Your trust is our most valuable asset.</p>
            </div>
            <div className="value-card">
              <h3>03</h3>
              <h4>Transparency</h4>
              <p>No hidden charges, no false promises.</p>
            </div>
            <div className="value-card">
              <h3>04</h3>
              <h4>Excellence</h4>
              <p>We strive for excellence in everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="container">
          <FaQuoteLeft className="quote-icon" />
          <p className="quote-text">
            "Our goal is not just to sell products, but to deliver satisfaction and happiness 
            to every customer who shops with us."
          </p>
          <p className="quote-author">- Founder, [Your Store Name]</p>
        </div>
      </section>

      <section className="closing-section">
        <div className="container">
          <h2>Thank You</h2>
          <p>We are grateful for your continued trust and support.</p>
          <button className="classic-btn">Explore Our Collection</button>
        </div>
      </section>
      <Footer />
    </div>

        
  );
};

export default AboutUs;