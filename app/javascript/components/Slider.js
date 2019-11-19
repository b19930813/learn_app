import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './image.css';

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
   
    };
    const SliderStyle = {
        width: "600px",
    }
    const image = {
        width: "600px",
    };
    return (
      <div>
        
        <Slider {...settings} style = {SliderStyle} >
          <div>
          <img src={require('../pic/1.jpg')} style = {image} />
          </div>
          <div>
          <img src={require('../pic/2.jpg')} style = {image} />
          </div>
          <div>
          <img src={require('../pic/3.jpg')} style = {image} />
          </div>
        </Slider>
      </div>
    );
  }
}