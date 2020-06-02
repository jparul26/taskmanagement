import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import I1 from "../Images/h2.jpg"
import I2 from "../Images/h3.jpg"
import I3 from "../Images/h4.jpg"
import classnames from "classnames";
import './carousel.css'
export default class carousel extends Component {
  render() {
    return (
        <div className="slider-container">
        <Carousel className="carousel-style" showArrows={true} showThumbs={false} showStatus={false}>
        <div>
            <img src={I2} />
            <p className="legend" ><h4>Welcome To Your Task-Desk</h4></p>
        </div>
        <div>
            <img src={I3}  />
            <p className="legend" ><h4> Add new Task here!</h4>
            <Link to="/add" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Add Task
            </Link></p>
           
        </div>
        <div>
            <img src={I1}  />
            <p className="legend" ><h4>Manage Your Task</h4>
            <p>When you click on Card, You will be able to edit and see all info!</p>
            <Link to="/get" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Your Desk
            </Link>
            </p>
        </div>
    </Carousel>
    </div>
    )
  }
}
 