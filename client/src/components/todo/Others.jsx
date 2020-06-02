import React, { Component } from 'react'
import axios from "axios"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css";
import B from '@material-ui/icons/BorderColor';
import D from '@material-ui/icons/Delete'
import ParticlesBg from "particles-bg";
import classnames from "classnames";
import Card from '@material-ui/core/Card'
import './get.css'

class Others extends Component {
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
       handleDeleteTodo = (todo_id) =>{
         axios.delete(`/api/users/delete/${todo_id}`)
         .then(res=> {console.log(res)
         axios.get("/api/users/todos")
        .then((response) => {
            console.log(response.data)
            this.setState({array : response.data});

        });
        })
        .catch(err=>console.log("fail"));
       }
       componentDidUpdate() {

        let collapsible = document.querySelectorAll(".collapsible");
    
        M.Collapsible.init(collapsible, {});
      }
       fetch_todo() { 
        return this.state.array.map(arr=>{
           if(arr.todoid ===this.props.auth.user.id )
           if(arr.done === "Todo")
           if(arr.label==="Others")
           return(
             
            <div>
            <Card >
         <div  style={{width:"100%"}}>
       
         <ul class="collapsible">
        <li>
         <div class="collapsible-header" style={{color:"#db53b7"}}><i class="material-icons">filter_drama</i><i>{arr.title}</i>
         <span class="new badge" data-badge-caption=" ">{arr.label}</span>
        </div>
        <br/>
        <div class="collapsible-header" >
          <p style={{color:"grey",marginLeft:"3%"}}>Due Date: {arr.dueDate.split("T")[0]}</p>
          <br/>
           <p style={{color:"grey",marginLeft:"3%"}}>Time: {arr.dueDate.split("T")[1].split(".")[0]}</p>
         </div>
            <div class="collapsible-body" style={{fontFamily:"monospace"}}><span><p>{arr.tododescription}</p></span>
           <div>
         <Link
             to={`/edit/${arr._id}`}>
             <B  style={{fontSize:"30px"}}/>
           </Link>
          <span style={{marginLeft:"5%"}}>
             <D id={arr._id} onClick={()=>this.handleDeleteTodo(arr._id)} style={{fontSize:"30px"}}>
               Delete
             </D>
           </span>
         </div>
         </div>
         </li>
       </ul>
       </div>
       </Card>
       </div>
   
           )
        })
        
}
fetch_doing() { 
  return this.state.array.map(arr=>{
     if(arr.todoid ===this.props.auth.user.id )
     if(arr.done === "Doing")
     if(arr.label==="Others")
     return(
      <div>
      <Card >
   <div  style={{width:"100%"}}>
 
   <ul class="collapsible">
  <li>
   <div class="collapsible-header" style={{color:"#db53b7"}}><i class="material-icons">filter_drama</i><i>{arr.title}</i>
   <span class="new badge" data-badge-caption=" ">{arr.label}</span>
  </div>
  <br/>
  <div class="collapsible-header" >
    <p style={{color:"grey",marginLeft:"3%"}}>Due Date: {arr.dueDate.split("T")[0]}</p>
    <br/>
     <p style={{color:"grey",marginLeft:"3%"}}>Time: {arr.dueDate.split("T")[1].split(".")[0]}</p>
   </div>
      <div class="collapsible-body" style={{fontFamily:"monospace"}}><span><p>{arr.tododescription}</p></span>
     <div>
   <Link
       to={`/edit/${arr._id}`}>
       <B  style={{fontSize:"30px"}}/>
     </Link>
    <span style={{marginLeft:"5%"}}>
       <D id={arr._id} onClick={()=>this.handleDeleteTodo(arr._id)} style={{fontSize:"30px"}}>
         Delete
       </D>
     </span>
   </div>
   </div>
   </li>
 </ul>
 </div>
 </Card>
 </div>
     )
    
     
     
     
    
  })
  
}
fetch_done() { 
  return this.state.array.map(arr=>{
     if(arr.todoid ===this.props.auth.user.id )
     if(arr.done === "Done")
     if(arr.label==="Others")
     return(
       
      <div>
      <Card >
   <div  style={{width:"100%"}}>
 
   <ul class="collapsible">
  <li>
   <div class="collapsible-header" style={{color:"#db53b7"}}><i class="material-icons">filter_drama</i><i>{arr.title}</i>
   <span class="new badge" data-badge-caption=" ">{arr.label}</span>
  </div>
  <br/>
  <div class="collapsible-header" >
    <p style={{color:"grey",marginLeft:"3%"}}>Due Date: {arr.dueDate.split("T")[0]}</p>
    <br/>
     <p style={{color:"grey",marginLeft:"3%"}}>Time: {arr.dueDate.split("T")[1].split(".")[0]}</p>
   </div>
      <div class="collapsible-body" style={{fontFamily:"monospace"}}><span><p>{arr.tododescription}</p></span>
     <div>
   <Link
       to={`/edit/${arr._id}`}>
       <B  style={{fontSize:"30px"}}/>
     </Link>
    <span style={{marginLeft:"5%"}}>
       <D id={arr._id} onClick={()=>this.handleDeleteTodo(arr._id)} style={{fontSize:"30px"}}>
         Delete
       </D>
     </span>
   </div>
   </div>
   </li>
 </ul>
 </div>
 </Card>
 </div>
     )
     
     
    
  })
  
}
render() {
    return (
    
      <div style={{marginTop:"10%"}}>
      <div class="container">
      <div  class="row">

   
         <div  class="col-md-4">
          <Card>
            <Card style={{backgroundColor:"#e38be8"}}>
            <h4 style={{textAlign:"center",color:"white"}}>New..</h4>
            </Card>	
        {this.fetch_todo()}	
        </Card>	
				</div>
				<div  class="col-md-4">
          <Card>
          <Card style={{backgroundColor:"#f0b256"}}>
            <h4 style={{textAlign:"center",color:"white"}}>In Progress..</h4>
          </Card>	
					{this.fetch_doing()}
          </Card>
				</div>
        
        <div  class="col-md-4">
         <Card>
         <Card style={{backgroundColor:"#5398ed"}}>
            <h4 style={{textAlign:"center",color:"white"}}>Completes</h4>
          </Card>	
					{this.fetch_done()}
          </Card>
				</div>	
        </div>
        </div>
        </div>
       
    )
}
}
Others.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(Others);