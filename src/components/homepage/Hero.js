import React from "react";
import { Jumbotron } from "react-bootstrap";
import SearchBar from "../ui/Search/SearchBar";

function Hero() {
  return (
    <section className="hero">
      <Jumbotron className="home-hero  align-items-center text-center  ">
        <div className="home-hero-filter">
          <div className="home-hero-inner">
            <h1>Book accommodations in Bergen at best price</h1>
            <p>
              we help <span>you</span> with accommodations
            </p>
            <div className="home-hero-input">
              <SearchBar />
            </div>
          </div>
        </div>
      </Jumbotron>
    </section>
  );
}

export default Hero;
