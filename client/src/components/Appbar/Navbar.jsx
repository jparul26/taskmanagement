import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions"; 
import axios from "axios";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Divider, Drawer, Fab , TextField, Avatar , Paper, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from "@material-ui/icons/Menu"
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreateIcon from '@material-ui/icons/Create';
import FaceIcon from '@material-ui/icons/Face';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ShopIcon from '@material-ui/icons/AddShoppingCart';
import OthersIcon from '@material-ui/icons/Apps'
import AddIcon from '@material-ui/icons/BorderColor';
import GetIcon from '@material-ui/icons/FormatListNumbered'
import LockIcon from '@material-ui/icons/Lock';
import PersonalIcon from '@material-ui/icons/Person'

function searchingfor(searchstring) {
  return function (x) {
      return x.name.toLowerCase().includes(searchstring.toLowerCase()) || !searchstring;
  }
}

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.reload(false);
  };
  state = {
    right: false,
    left: false,
    searchstring: "",
    Data: []
  }
  componentDidMount() { 
    axios.get('/users/getdata')
    .then((response) => {
        this.setState({Data: response.data})
    });
  }
  toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ [side]: open });
  };
  onSearchInputChange = (event) => {
    console.log("Search changed ..." + event.target.value)
    if (event.target.value) {
        this.setState({ searchstring: event.target.value })
    } else {
        this.setState({ searchstring: '' })
    }
  }

  sideList1 = side => (
    <div class="container" style={{width: "200px",backgroundColor:"#BB8FCE",height:"100%"}} 
    onClick={this.toggleDrawer(side,false)}>
       <div class="text-dec" style={{paddingTop:"5%"}}>
        <IconButton onClick={this.toggleDrawer(side, false)} >
          <h5 style={{marginLeft: "60px",color:"white"}}>Back &nbsp;<ArrowBackIosIcon  />   
          </h5>
        </IconButton>
        <hr />
        </div>
        {this.props.auth.user.id ?
          <div>
            <div style={{color: "white", fontFamily: "roboto"}}>
                   <h4>  Hey  {this.props.auth.user.name} </h4>
                </div > 
                <hr />
             <List>
             <ListItem >
             <ListItemIcon> <AddIcon/> </ListItemIcon>
               <Link to = "/add" style={{color: "white", fontFamily: "roboto"}}>
                  <h4> Add Task </h4>
                </Link>
              </ListItem>
             <ListItem >
             <ListItemIcon> <GetIcon/> </ListItemIcon>
               <Link to = "/get" style={{color: "white", fontFamily: "roboto"}}>
                  <h4> List</h4>
                </Link>
              </ListItem>
              <ListItem >
             <ListItemIcon> <PersonalIcon/> </ListItemIcon>
               <Link to = "/personal" style={{color: "white", fontFamily: "roboto"}}>
                  <h4> Personal</h4>
                </Link>
              </ListItem>
              <ListItem >
             <ListItemIcon> <AssignmentIcon/> </ListItemIcon>
               <Link to = "/work" style={{color: "white", fontFamily: "roboto"}}>
                  <h4> Work</h4>
                </Link>
              </ListItem>
              <ListItem >
             <ListItemIcon> <ShopIcon/> </ListItemIcon>
               <Link to = "/shopping" style={{color: "white", fontFamily: "roboto"}}>
                  <h4> Shopping</h4>
                </Link>
              </ListItem>
              <ListItem >
             <ListItemIcon> <OthersIcon/> </ListItemIcon>
               <Link to = "/others" style={{color: "white", fontFamily: "roboto"}}>
                  <h4> Others</h4>
                </Link>
              </ListItem>
              <ListItem>
              <ListItemIcon> <LockIcon/> </ListItemIcon>
              <Link>
              <h4 style={{color: "white", fontFamily: "roboto"}} onClick= {this.onLogoutClick}>
                  Logout
              </h4>
              </Link>
              </ListItem>
             </List>
          </div>
          :
          <div>
             <List>
             <ListItem >
             <ListItemIcon> <LockOpenIcon/> </ListItemIcon>
               <Link to = "/login" style={{color: "white", fontFamily: "roboto"}}>
                  <h4> Login </h4>
                </Link>
              </ListItem>
              <ListItem >
              <ListItemIcon> <AssignmentIcon/> </ListItemIcon>
                <Link to = "/register" style={{color: "white" , fontFamily: "roboto"}}>
                  <h4> Register </h4>
                </Link>
              </ListItem>
             </List>
          </div>
        }
        
        
      </div>
  );
  render() {
  return (
    <div  >                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
       <AppBar  style={{backgroundColor:"#5D84E7",width:"100%" }}>
        <Toolbar>
        <IconButton
           
           onClick={this.toggleDrawer('left', true)}> <MenuIcon />
         </IconButton>
         <Drawer
           anchor={'left'}
           variant="temporary"  
           open={this.state.left}
           onClose={this.toggleDrawer('left', false)}
           onOpen={this.toggleDrawer('left', true)}
          
         >
         {this.sideList1('left')}
         </Drawer>
          <Link to ="/">
          <h4 style={{color:"white"}}>StackHack</h4>
          </Link>
          <div style={{ marginLeft: "auto"}}>
         

          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);