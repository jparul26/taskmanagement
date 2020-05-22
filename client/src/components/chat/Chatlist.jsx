import React, { Component } from 'react'
import PropTypes from "prop-types";
import {Link} from "react-router-dom"; 
import { connect } from "react-redux";
import openSocket from 'socket.io-client';
const socket = openSocket('localhost:5000');

class Chatlist extends Component {
    state = {
         chat_array: []
    };
        get_chat_Data = (e) => {
        this.setState({ chat_array: e });
        console.log(this.chat_array);

       }
        change_chat_Data = () =>{
         socket.emit("initial_chat_data");
         console.log("change_data")
        }
        
        componentDidMount() {
            socket.emit("initial_chat_data");
           socket.on("get_chat_data", this.get_chat_Data);
           socket.on("change_chat_data", this.change_chat_Data);
          }
          componentWillUnmount() {
           socket.off("get_chat_data");
           socket.off("change_chat_data");
         }
         fetch_Post() {
          
             return this.state.chat_array.map(Chat =>{

              return (


                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-lg-12 mx-auto" key= {Chat._id}>
                            <div class="jumbotron">
                                <hr class="my-4"/>
                                <b><span > {Chat.author}</span> </b>
                                <p>{Chat.postText}</p>
                               
                               
                               
                            </div>
                        </div>
                    </div>
            </div>   
              )});
           }
    render() {
        return (
            <div>
                {this.fetch_Post()}
            </div>
        )
    };
}
Chatlist.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(Chatlist);