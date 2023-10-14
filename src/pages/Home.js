import React from "react";
import LazyLoad from "react-lazy-load";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import water1 from "../assets/water1.jpg";
import water2 from "../assets/water4.jpg";
import water3 from "../assets/water2.jpg";
import water4 from "../assets/water3.jpg";
import fiveLitre from "../assets/fiveLitre.jpg";
import tenLitre from "../assets/tenLitre.jpg";
import twentyLitre from "../assets/twentyLitre.jpg";
import customer1 from "../assets/customer1.jpg";
import customer2 from "../assets/customer2.jpg";
import customer3 from "../assets/customer3.jpg";

import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay={{
          delay: 16000, // Adjust the delay to make it twice as slow (default is 2000ms)
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <LazyLoad height={577} offset={300}>
            <img src={water1} alt="Slide 1" className="home__slide" />
          </LazyLoad>
        </SwiperSlide>
        <SwiperSlide>
          <LazyLoad height={577} offset={300}>
            <img src={water2} alt="Slide 2" className="home__slide" />
          </LazyLoad>
        </SwiperSlide>
        <SwiperSlide>
          <LazyLoad height={577} offset={300}>
            <img src={water3} alt="Slide 3" className="home__slide" />
          </LazyLoad>
        </SwiperSlide>
        <SwiperSlide>
          <LazyLoad height={577} offset={300}>
            <img src={water4} alt="Slide 4" className="home__slide" />
          </LazyLoad>
        </SwiperSlide>
      </Swiper>

      <div className="title__description">
        <h1 className="home__title">Welcome to Annelle Waters</h1>
        <p className="home__description">
          We are a water vending company dealing in the supply of sparkling
          clean drinking water.
        </p>
      </div>
      <div className="home__products">
        <h2 className="home__subtitle">Our Products</h2>
        <div className="home__product-grid">
          <div className="home__product-card">
            <img
              src={fiveLitre}
              alt="5 litre water bottle"
              className="home__product-img"
            />
            <h3 className="home__product-title">5 litre Bottle</h3>
            <p className="home__product-description">
              Our 5 litre bottles are perfect for small families or individuals.
            </p>
          </div>
          <div className="home__product-card">
            <img
              src={tenLitre}
              alt="10 litre water bottle"
              className="home__product-img"
            />
            <h3 className="home__product-title">10 litre Bottle</h3>
            <p className="home__product-description">
              Our 10 litre bottles are great for medium-sized families or
              offices.
            </p>
          </div>
          <div className="home__product-card">
            <img
              src={twentyLitre}
              alt="20 litre water bottle"
              className="home__product-img"
            />
            <h3 className="home__product-title">20 litre Bottle</h3>
            <p className="home__product-description">
              Our 20 litre bottles are ideal for large families or businesses.
            </p>
          </div>
        </div>
      </div>

      <div className="home__delivery-areas">
        <div className="delivery__titles">
          <h2 className="home__subtitle">Delivery Areas</h2>
          <p className="home__description">
            We deliver to the following areas in Nakuru:
          </p>
        </div>
        <div className="home__delivery-area-grid">
          <div className="home__delivery-area-card">
            <h3 className="home__delivery-area-card-title">Nakuru Heights</h3>
            <p className="home__delivery-area-card-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="home__delivery-area-card">
            <h3 className="home__delivery-area-card-title">Nakuru East</h3>
            <p className="home__delivery-area-card-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="home__delivery-area-card">
            <h3 className="home__delivery-area-card-title">Nakuru West</h3>
            <p className="home__delivery-area-card-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="home__delivery-area-card">
            <h3 className="home__delivery-area-card-title">Nakuru South</h3>
            <p className="home__delivery-area-card-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="home__delivery-area-card">
            <h3 className="home__delivery-area-card-title">Nakuru North</h3>
            <p className="home__delivery-area-card-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="home__delivery-area-card">
            <h3 className="home__delivery-area-card-title">Nakuru Central</h3>
            <p className="home__delivery-area-card-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      <div className="payment__options__map">
        <div className="home__payment-options">
          <h2 className="home__subtitle">Payment Options</h2>
          <p className="home__description">
            We accept both Mpesa and cash on delivery.
          </p>
        </div>
        <div className="home__map-section">
          <h2 className="home__subtitle">Delivery Map</h2>
          <iframe
            title="Unique title for this iframe"
            src="https://maps.google.com/maps?q=barnabbas%20nakuru&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="80%"
            height="500"
            frameborder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="home__map"
          ></iframe>
        </div>
      </div>

      <div className="home__testimonials">
        <h2 className="home__subtitle">Customer Testimonials</h2>
        <div className="home__testimonial-cards">
          <div className="home__testimonial-card">
            <div className="home__testimonial-card-img">
              <img src={customer1} alt="customer1" />
              <h3 className="home__testimonial-card-name">Jane</h3>
            </div>
            <p className="home__testimonial-card-text">
              "I have been a customer of Annelle Waters for over a year now and
              I can confidently say that their water is the purest I have ever
              had. Their delivery service is also very prompt and efficient."
            </p>
          </div>
          <div className="home__testimonial-card">
            <div className="home__testimonial-card-img">
              <img src={customer2} alt="customer2" />
              <h3 className="home__testimonial-card-name">John</h3>
            </div>
            <p className="home__testimonial-card-text">
              "The customer service at Annelle Waters is top-notch. They are
              always willing to go the extra mile to ensure that I am satisfied
              with their service."
            </p>
          </div>
          <div className="home__testimonial-card">
            <div className="home__testimonial-card-img">
              <img src={customer3} alt="customer3" />
              <h3 className="home__testimonial-card-name">Mary</h3>
            </div>
            <p className="home__testimonial-card-text">
              "I have been using Annelle Waters for my office and I have never
              had any issues. Their water is always fresh and their delivery is
              always on time."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
