import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import 'date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Select from '@material-ui/core/Select';
class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
         todoid: "",
         title:"",
         done: "Todo",
         dueDate:new Date('2020-05-20T21:11:54'),
         tododescription:""

        };
      }
      handleDateChange = (date) => {
        this.setState({dueDate: date});
        console.log(this.state);
      };
      handleDoneChange = (e) =>{
        this.setState({done:e.target.value});

      }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
   
    onSubmit = e => {
        e.preventDefault();
    const newTodo = {
         todoid: this.props.auth.user.id,
          title: this.state.title,
          done: this.state.done,
          dueDate : this.state.dueDate,
          tododescription: this.state.tododescription
        };
        axios.post('/api/users/todo',newTodo)
        console.log(newTodo);
        this.setState({title:""})
        this.setState({done:""})
        this.setState({dueDate:new Date('2020-05-20T21:11:54')})
   
      };
    render() {
        return (
            <div>
               <div className= 'card container bg-light' style={{marginLeft:"10%",marginRight:"10%"}}>
              <div style={{marginLeft:"1rem"}}>
              <input
                  onChange={this.onChange}
                  value={this.state.title}
                  id="title"
                  type="text"
                />
                </div>
                <br />  
                 <br/>
                 <div style={{marginLeft:"1rem"}}>
              <input
                  onChange={this.onChange}
                  value={this.state.tododescription}
                  id="tododescription"
                  type="text"
                />
                </div>
                <div style={{marginLeft:"15px"}}>
                
                <FormControl >
                  <InputLabel id="done">Status</InputLabel>
                 <Select 
                  id="done"
                   value={this.state.done}
                    onChange={this.handleDoneChange}
                    >
                    <MenuItem value="Todo">Todo</MenuItem>
                    <MenuItem value="Doing">Doing</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                </Select>
              </FormControl>
               </div>
              <div className="field">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <KeyboardDatePicker
              margin="normal"
              id="dueDate"
              label="dueDate"
              format="dd/MM/yyyy"
              value={this.state.dueDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
                
              }}
              style={{width: "50%", marginTop:"20px", marginBottom:"20px"}}
             />
            </MuiPickersUtilsProvider>
            </div>
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
                onClick = {this.onSubmit}
                className=" text-center btn waves-effect waves-light" 
                >
                Send 
                </button>
               
            </div>
            </div>
        )
    }
}

Add.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
  )(Add);