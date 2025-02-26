import React from "react";
import NavigationBar from "./NavigationBar/NavigationBar";
import MainImg from "./Carousel/MainImg";
import Cards from "./Cards/Cards";
import MainGrid from "./MainGrid/MainGrid";
import MainAbout from "./MainAbout/MainAbout";
import Footer from "./Footer/Footer";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <MainImg />
      <Cards />
      <MainGrid />
      <MainAbout />
      <Footer />
    </div>
  );
};

export default Home;
