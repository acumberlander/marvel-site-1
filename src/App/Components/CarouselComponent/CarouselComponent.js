import React, { Component } from "react";
import { ProfilePage } from "./../ProfilePage/ProfilePage";
import Slider from "react-slick";

export class CarouselComponent extends Component {
  render() {
    return (
      <>
        <div className="wrapper">
          <Slider
            speed={500}
            slidesToShow={5}
            slidesToScroll={1}
            infinite={true}
          ></Slider>
        </div>
      </>
    );
  }
}

export default CarouselComponent;
