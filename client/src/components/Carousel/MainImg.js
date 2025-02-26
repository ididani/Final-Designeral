import React from "react";
import "./MainImg.css";
import { Carousel } from "react-bootstrap";
import ExampleCarouselImage from "./ExampleCarouselImage";

const MainImg = () => {
  return (
    <div>
      <div className="mask">
        <Carousel fade>
          <Carousel.Item className="image-container">
            <video className="d-block w-100" autoPlay loop muted>
              <source
                src="https://www.prada.com/content/dam/pradanux/home_page/2024/09/CO_25-settembre/hero_fw24/loop_DT.mp4/_jcr_content/renditions/cq5dam.video.pradanux-large.1920.1080.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Carousel.Item>
          <Carousel.Item className="image-container">
            <ExampleCarouselImage img="https://www.chanel.com/puls-img/c_limit,w_2400/q_auto:good,dpr_auto,f_auto/1727787914112-homepagecorpoonedesktopv2jpg_1620x2880.jpg" />
          </Carousel.Item>
          <Carousel.Item className="image-container">
            <ExampleCarouselImage img="https://cdn.media.amplience.net/i/Marc_Jacobs/PLP_HERO_IMAGES_DESKTOP_New_Arrivals_2880x800?&qlt=68&w=1600" />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default MainImg;
