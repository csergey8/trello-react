import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../../store/auth";

const { REACT_APP_API_KEY, REACT_APP_APP_NAME, REACT_APP_REDIRECT_URL, REACT_APP_SCOPE } = process.env

interface LoginProps {
  isAuthenticated: boolean
}

class Login extends Component<LoginProps> {
  render() {
    if(this.props.isAuthenticated) {
      return <Redirect to='/dashboard' />
    }
    const requestUrl = `https://trello.com/1/authorize?return_url=${REACT_APP_REDIRECT_URL}&expiration=1day&name=${REACT_APP_APP_NAME}&scope=${REACT_APP_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;
    return <div>
      <a href={requestUrl}>Login with trello account</a>
      <h2>Please login</h2>
    </div>
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: isAuthenticated(state)
})

const LoginWithRedux = connect(mapStateToProps)(Login);

export { LoginWithRedux as Login};