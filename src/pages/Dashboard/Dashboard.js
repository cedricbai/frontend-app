import React, { Component } from 'react';
import './Dashboard.scss';
import cookie from 'react-cookies'

import { LeftSidebar, TransferModal, DoughnutChart, LineChart, ChartTable, TransactionTable, Footer } from './../../components';

class Dashboard extends Component{


  constructor(){
    super();
    this.state = {
      the_code: ''
    };
    this.timer = this.timer.bind(this);
  }

 /*After the component is mounted, the program will fetch the user's referral code through fetch api, and then it will check if the cookie is expired every second */
  componentDidMount(){
    const that = this;
    var userName = cookie.load('username'); //get the username from the cookie which was created in the login page
    console.log(userName);
    var the_url = "http://178.128.233.31/frontend/user_data/" + userName;
    fetch(the_url, {
      method: "GET",
      mode: "cors",
    }).then(response => response.json())
      .then(function(res){
         that.setState({the_code: res["ref_code"]});
         setInterval(that.timer, 1000); //check if the cookie is expired every second
      })
  }

/*check if the cookie is expired, if it is expired, redirect to the login page*/
 timer(){
   if(!cookie.load("username"))
   {
     alert("Sorry, your session timed out");
     window.location.href = "/signIn";
     return;
   }
 }
  //pass the referral Code to the sidebar component through the props
    render(){
         return (
            <div className="dashboard-container">
                <div className="navigation">

                    <LeftSidebar value={this.state.the_code}/>
                </div>
                <div className="content-wrapper" id="content-div">
                    <div className="overview-container">
                        <div className="overview-table"><ChartTable/></div>
                        <div className="overview-graph"><DoughnutChart /></div>
                    </div>
                    <div className="graph-container"><LineChart /></div>
                    <div className="table-container"><TransactionTable /></div>
                    <div className="transfer-modal-container"><TransferModal/></div>
                    <div className="footer-container"><Footer/></div>
                </div>
            </div>
        );
    }



}

export default Dashboard;
