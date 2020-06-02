import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core';
import 'date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {Card} from '@material-ui/core'
import Select from '@material-ui/core/Select';

var sectionStyle = {
  position : 'absolute',
  width: "100%",
  height: "auto",
 background: `url(${process.env.PUBLIC_URL}/h1.jpg)` ,
 backgroundPosition: 'center',
 backgroundSize: 'cover',
 backgroundRepeat: 'no-repeat'
};
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
         todoid: "",
         title:"",
         done: "",
         dueDate:new Date('2020-05-20T21:11:54'),
         tododescription:"",
         label:""

        };
      }
      handleDateChange = (date) => {
        this.setState({dueDate: date});
        console.log(this.state);
      };
      handlelabelChange = (e) =>{
        this.setState({label:e.target.value});

      }
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
          tododescription: this.state.tododescription,
          label:this.state.label
        };
        axios.put(`/api/users/update/${this.props.match.params.id}`,newTodo)
        console.log(newTodo);
      };
      componentDidMount() {
        console.log("hey");
        axios.get(`/api/users/edit/${this.props.match.params.id}`)
        .then((response) => {
            console.log(response.data)
            this.setState({todoid : response.data.todoid});
            this.setState({title: response.data.title});
            this.setState({done: response.data.done});
            this.setState({tododescription:response.data.tododescription});
            this.setState({dueDate: response.data.dueDate});
            this.setState({label: response.data.label});
        });
       }
    render() {
        return (
          <div style= {sectionStyle}>
          <div style={{marginTop:"7%"}}>
            <div class="container">
              <div class="row">
              <Card style={{width:"60%"}} >
               <div style={{marginLeft:"5%", marginRight:"5%"}}>
                  <h3 style={{textAlign:"center"}}>  <b>To-Do </b></h3>
                  <form noValidate onSubmit={this.onSubmit} style={{ margin: "30px 30px "  }}>
                     <div >
                       <h5 style={{marginTop:"3%"}}>Title:</h5>
                     <TextareaAutosize
                       variant="outlined"
                       halfWidth
                       onChange={this.onChange}
                       value={this.state.title}
                       id="title"
                       type="text"
                       style={{width: "47%"}}
                     />
                     </div>
                     <div  style={{marginTop:"3%"}}>
                     <h5>Description:</h5>
                     <TextareaAutosize
                       variant="outlined"
                       fullWidth
                       onChange={this.onChange}
                       value={this.state.tododescription}
                       id="tododescription"
                       type="text"
                       rowsMin={3}
                     />
                    </div>
                    <div style={{marginTop:"3%"}}>
              
                     <FormControl >
                       <h5>Status:</h5>
                       <InputLabel id="done"></InputLabel>
                       <Select 
                         id="done"
                         variant="outlined"
                         value={this.state.done}
                         onChange={this.handleDoneChange}
                         fullWidth
                         style={{fontSize:"1.5rem"}}
                        >
                         <MenuItem value="Todo">Todo</MenuItem>
                         <MenuItem value="Doing">Doing</MenuItem>
                         <MenuItem value="Done">Done</MenuItem>
                       </Select>
                     </FormControl>
                     <br/>
                     <FormControl style={{marginTop:"3%"}} >
                     <h5>Label:</h5>
                       <InputLabel id="done" ></InputLabel>
                       <Select 
                      id="label"
                      variant="outlined"
                      value={this.state.label}
                      onChange={this.handlelabelChange}
                      fullWidth
                      style={{fontSize:"1.5rem"}}
                       >
                        <MenuItem value="Personal">Personal</MenuItem>
                        <MenuItem value="Work">Work</MenuItem>
                       <MenuItem value="Shopping">Shopping</MenuItem>
                       <MenuItem value="Others">Others</MenuItem>
                      </Select>
                     </FormControl>
                   </div>
                  <div className="field" style={{marginTop:"3%"}}>
                    <h5>Due Date:</h5>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                     <KeyboardDatePicker
                       margin="normal"
                       id="dueDate"
                       variant="outlined"
                       format="dd/MM/yyyy"
                       value={this.state.dueDate}
                       onChange={this.handleDateChange}
                       KeyboardButtonProps={{
                      'aria-label': 'change date',
                       }}
                       style={{width: "50%", marginTop:"10px", marginBottom:"20px"}}
                      />
                      <h5>Time:</h5>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    variant="outlined"
                    value={this.state.dueDate}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                     'aria-label': 'change time',
                    }}
                   />
                 </MuiPickersUtilsProvider>
              </div>
              <button 
              type="button" 
              class="btn btn-primary btn-lg btn-block card-1" 
              type="submit" 
               style={{
              borderRadius: "3px",
              letterSpacing: "1.5px",
               marginTop: "1rem"
              }}>
                Save
              </button>
              </form>
          </div>
          </Card>
          </div>
        </div>
       </div> 
       </div>
          
        )
    }
}

Edit.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
  )(Edit);