import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
// import { carousel } from "../assets/caurosel"; // Adjust the path as necessary
import iconMap from "./icons"; // Import the icon mapping

import { carousel } from "./caurosel";

function CarouselFadeExample() {
  return (
    <div>
      <Carousel fade interval={5000} controls={true} indicators={false}>
        {Object.keys(carousel).map((key) => {
          const item = carousel[key];
          return (
            <Carousel.Item key={key}>
              <img src={item.image} alt={`Slide ${key}`} />
              <div
                className="position-absolute top-0 start-0 d-flex w-100 h-100 align-items-center"
                style={{ background: "rgba(24, 29, 56, .7)" }}
              >
                <Carousel.Caption>
                  <div className="d-flex align-items-center">
                    <div className="me-3">{iconMap[item.icon]}</div> {/* Render the icon based on the icon name */}
                    <h3 className="text-white">{item.heading}</h3>
                  </div>
                  <button className="btn btn-primary mt-3">{item.caption}</button>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className="nextprev">
        <button
          className="prev prev-white border"
          type="button"
          data-bs-target="#carouselFadeExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            style={{ width: "22px", height: "22px" }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="next next-white border"
          type="button"
          data-bs-target="#carouselFadeExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            style={{ width: "22px", height: "22px" }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default CarouselFadeExample;
