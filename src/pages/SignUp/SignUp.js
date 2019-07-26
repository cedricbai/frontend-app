import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


import './SignUp.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      the_username: '',
      the_password: '',
      the_email: '',
      the_referral_code: ''
    };
    this.handleName = this.handleName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleCode = this.handleCode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleName(event) {
    this.setState({the_username: event.target.value});
  }

  handlePassword(event) {
    this.setState({the_password: event.target.value});
  }

  handleEmail(event) {
   this.setState({the_email: event.target.value});
    //return (false)
  }

  handleCode(event) {
    this.setState({the_referral_code: event.target.value});
  }

  handleSubmit(event) {
    /*if any text field is empty, an error message will be shown in the alert window*/
    event.preventDefault();
    if(this.state.the_username == "" || this.state.the_password == "" || this.state.the_email == "" || this.state.the_referral_code == "")
    {
      alert("please fill all the text fields");
      return;
    }
    /*the username should contain at least 1 number and 1 letter, otherwise the user will be alerted*/
    if(/\d/.test(this.state.the_username) == false || /[A-Za-z]/.test(this.state.the_username) == false)
    {
      alert("You username needs to contain at least 1 number and 1 letter")
      window.location.reload();
      return;
    }
    /*the password should contain at least one upper case character and one lower case character and one number, otherwise the user will be alerted*/
    if(/[A-Z]/.test(this.state.the_password) == false || /[a-z]/.test(this.state.the_password) == false || /\d/.test(this.state.the_password) == false)
    {
      alert("The password needs to contain at least one upper case character, one lower case character and one number");
      return;
    }
    /*the password should be at least 8 digits long, otherwise the user will be alerted*/
    if(this.state.the_password.length < 8)
    {
      alert("The length for the password must be greater or equal 8 digits");
      return;
    }
    /*check the if the email is valid, otherwise the user will be alerted*/
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.the_email) == false)
    {
        alert("You have entered an invalid email address!");
        window.location.reload();
        return;
    }
    /*New user needs to use 21232 as the referral code when sign up, otherwise the user will be alerted*/
    if(this.state.the_referral_code != '21232')
    {
      alert("New user needs to use '21232' as the referral code");
      window.location.reload();
      return;
    }
    /*after checking every textfield, these information will be posted to the server through fetch, and the user will be directed to the signin page if he/she receive a successful response*/
    const that = this;
    var the_url = "http://178.128.233.31/frontend/signup";
    var opts = { code: that.state.the_referral_code, password: that.state.the_password, username: that.state.the_username, email: that.state.the_email }
    fetch(the_url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(opts),
    headers: {
           'Content-Type': 'application/json'
    }
  }).then(function(response){
    if(response.ok){
    alert("Success! An confirmation email has been sent, please check your mailbox.");
    window.location.href = "/signIn";
   }
   else {
      alert("Sign up failed");
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
                            <input type="text" className="form-control" id="userName" placeholder="Uername" onChange={this.handleName}></input>
                        </div>
                        <div className="form-group">
                            <input type="password" class="form-control" id="password" placeholder="Password" onChange={this.handlePassword}></input>
                        </div>
                        <div className="form-group">
                            <input type="email" class="form-control" id="email" placeholder="Email" onChange={this.handleEmail}></input>
                        </div>
                        <div className="form-group">
                            <input type="text" class="form-control" id="referralCode" placeholder="Referral code" onChange={this.handleCode}></input>
                        </div>
                        <div >
                            <button type="submit" name="signIn" class=" btn btn-info signup-btn">Sign Up</button>
                        </div>
                    </form>
                </div>
                <div class="signup-options-container">
                    <NavLink to="/signIn" className="signup-link" >Sign In</NavLink>
                    <NavLink to="/forgotpassword" className="forgot-password-link">Forgot</NavLink>

                </div>
            </div>
  }
}

export default SignUp;
