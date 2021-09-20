import React from "react";
import AOS from "aos";
import { Helmet } from "react-helmet";
import Categray from "../components/homepage/Categray";
import Blocks from "../components/homepage/Blocks";
import Hero from "../components/homepage/Hero";

function Home() {
  AOS.init();
  return (
    <div data-aos="fade-right" data-aos-duration="1500">
      <Helmet>
        <title>Holidaze|| Home</title>
        <meta name="description" content="Find accommodations in Bergen!" />
      </Helmet>
      <Hero />
      <Categray />
      <Blocks />
    </div>
  );
}

export default Home;
