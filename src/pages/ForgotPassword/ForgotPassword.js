import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


import './ForgotPassword.scss';

class ForgotPassword extends Component {
  constructor(){
    super();
    this.state = {
      the_email: ''
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmail(event){
     this.setState({the_email: event.target.value});
  }

 /*Use the reset-password api call from frontend api, post the email input to front end api through fetch. The user will get a verification email*/
  handleSubmit(event){
     event.preventDefault();
     const that = this;
     var the_url = "http://178.128.233.31/frontend/reset_password";
     var opts = {email: that.state.the_email}
     fetch(the_url, {
       method: 'POST',
       mode: 'cors',
       body: JSON.stringify(opts),
       headers: {
              'Content-Type': 'application/json'
       }
     }).then(function(res){
       if(res.ok){
       alert("Success! An confirmation email has been sent, please check your mailbox.");
       window.location.href = "/signIn";
      }
      else {
         alert("Reset failed");
         return;
      }
     }
     )
  }

  render(){
    return <div className="signin-container">
        <div >
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="email" className="form-control" id="email" placeholder="Email" onChange={this.handleEmail}></input>
            </div>
            <div >
              <button type="submit" name="signIn" className=" btn btn-info fogotpwd btn">Forgot Password</button>
            </div>
          </form>
        </div>
        <div className="signup-options-container">
          <NavLink to="/signIn" className="signup-link">Sign In</NavLink>
          <NavLink to="/signUp" className="forgot-password-link">Sign Up</NavLink>

        </div>
      </div>
  }
}

export default ForgotPassword;
