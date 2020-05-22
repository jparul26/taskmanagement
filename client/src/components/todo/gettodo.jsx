import React, { Component } from 'react'
import axios from "axios"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class gettodo extends Component {
    constructor() {
        super();
        this.state = {
          array: [],
        };
      }
      componentDidMount() {
        console.log("hey");
        axios.get("/api/users/todos")
        .then((response) => {
            console.log(response.data)
            this.setState({array : response.data});
        });
       }
 
       fetch_data() { 
        return this.state.array.map(arr=>{
           if(arr.todoid ===this.props.auth.user.id )
           if(arr.done === "Todo")
           return(
             <div>
               <h2>Todo</h2>
               <p>
                  {arr.title}
               </p>
               <p>
                 {arr.dueDate.split("T")[0]}
               </p>
               <p>
                 {arr.tododescription}
               </p>
             </div>
           )
           if(arr.done==="Doing")
           return(
            <div>
              <h2>Doing</h2>
            <p>
               {arr.title}
            </p>
            <p>
              {arr.dueDate.split("T")[0]}
            </p>
            <p>
              {arr.tododescription}
            </p>
            <div className="col s6">
              
            </div>
          </div>
           )
        })
        
}
render() {
    return (
        <div style={{marginTop: "100px"}}>
            {this.fetch_data()}
        </div>
    )
}
}

gettodo.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(gettodo);