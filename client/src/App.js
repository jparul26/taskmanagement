import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/Appbar/Navbar"
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Message from "./components/chat/Message"
import Add from "./components/todo/addTodo"
import Get from "./components/todo/gettodo"
import Personal from "./components/todo/Personal"
import Shopping from "./components/todo/Shopping"
import Others from "./components/todo/Others"
import Work from "./components/todo/Work"
import Edit from "./components/todo/Edit"
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar/>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Register} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/message" component={Message} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add" component={Add} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/get" component={Get} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/personal" component={Personal} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/shopping" component={Shopping} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/work" component={Work} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/others" component={Others} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit/:id" component={Edit} />
            </Switch>

          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;