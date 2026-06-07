import React from 'react';
import '../../styles//user/Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Ahmedabad, Gujarat",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "Best shopping experience ever! Products are genuine and delivery was super fast. Highly recommended!",
    },
    {
      id: 2,
      name: "Rahul Patel",
      location: "Surat, Gujarat",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "Quality products at reasonable prices. The customer support is also very helpful. Will shop again.",
    },
    {
      id: 3,
      name: "Neha Mehta",
      location: "Vadodara, Gujarat",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4,
      text: "Loved the variety and fast delivery. The wireless headphones I bought are working perfectly.",
    },
  ];

  return (
    <section className="testimonials-section">
      
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Real stories from real customers</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="testimonial-header">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="customer-image" 
                />
                <div>
                  <h4>{testimonial.name}</h4>
                  <p className="location">{testimonial.location}</p>
                </div>
              </div>

              <div className="rating">
                {'★'.repeat(testimonial.rating)}
              </div>

              <p className="testimonial-text">"{testimonial.text}"</p>
            </div>
          ))}
        </div>

    </section>
  );
};

export default Testimonials;