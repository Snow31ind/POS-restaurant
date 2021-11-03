import React, { Component } from "react";
import Slider from "react-slick";
import './App.css'
export default class SimpleSlider extends Component {


  render() {
    const items = [1,2,3,4,5,,6,7,8,9];

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
            <div style={{backgroundColor: 'red'}}> asda </div>
            <div style={{backgroundColor: 'red'}}> asda </div>

        </Slider>
      </div>
    );
  }
}