import React, { Component } from 'react'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import openSocket from 'socket.io-client';
const socket = openSocket('localhost:5000');

class Addchat extends Component {
    state = {
        text: "",
        name : this.props.auth.user.name,
    }
    
    onClick= () => {
        this.setState({ name: this.props.auth.user.name });
        socket.emit('post_chat', this.state);

        this.setState({text:""})
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state);
    }; 
    render() {
        return (
            <div className= 'card container bg-light' style={{marginLeft:"10%",marginRight:"10%"}}>
              <div style={{marfinLeft:"1rem"}}>
                <textarea 
                 placeholder = "Enter Message"
                className ="md-textarea form-control" rows="5"
                value={this.state.text}
                id="text"
                onChange={this.onChange} />
                </div>
                <br />  

                <button 
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginBottom : "1rem",
                    marginRight: "1rem",
                    height:"50px"  ,
                    marginLeft:"1rem"

                }}
                onClick = {this.onClick}
                className=" text-center btn waves-effect waves-light" 
                >
                Send 
                </button>
                <Link
                to="/dashboard"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Back
              </Link>
            </div>
        )
    }
}

Addchat.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
  )(Addchat);
