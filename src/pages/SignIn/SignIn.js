import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchToken } from '../../actions/signInActions';
import { NavLink } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import cookie from 'react-cookies';
import './SignIn.scss';


class SignIn extends Component {


  constructor(props){
    super(props);
    this.state = {
      the_username: '',
      the_password: ''
    };
    this.handleName = this.handleName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  /*Whenever the username input has been changed, the username property will be changed in the state section*/
  handleName(event) {
    this.setState({the_username: event.target.value});
  }

 /*Whenever the password input has been changed, the password property will be changed in the state section*/
  handlePassword(event) {
    this.setState({the_password: event.target.value});
  }

  /*get the login response from the frontend api by using fetch */
  handleSubmit(event) {
    event.preventDefault();
    const that = this;
    var the_url = "http://178.128.233.31/frontend/login";
    var opts = {username : that.state.the_username, password: that.state.the_password }
    fetch(the_url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(opts),
      headers: {
             'Content-Type': 'application/json'
      }
    }).then(function(res){
      console.log(res.status);
      /*if the password doesn't match with the username, an error message will pop up*/
      if (!res.ok) {
        alert("Username/Password doesn't match");
        window.location.href = "/signIn";
     }
     /*otherwise, it will save the username in a cookie and redirect to dashboard page*/
     else {
       cookie.save('username', that.state.the_username, {path: '/', maxAge: 3600});
       window.location.href = "/dashboard";
     }
    })
  }
 //combine the submit event of the form with handleSubmit
  render(){
    return (
      <div className="signin-container">
        <div >
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id="userName" placeholder="Username" onChange={this.handleName}></input>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handlePassword}></input>
                </div>
                <div>
                    <button type="submit" name="signIn" className="btn btn-info signin-btn">Login</button>
                </div>
            </form>
        </div>
        <div className="signup-options-container">
            <NavLink to="/signup" className="signup-link">Sign Up</NavLink>
            <NavLink to="/forgotpassword" className="forgot-password-link">Forgot</NavLink>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    UserStore: state.UserStore
  }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                fetchToken,
            },
            dispatch
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)
