import React, { FunctionComponent } from "react";
import { RouteChildrenProps, Redirect } from "react-router";
import { isAuthenticated, initTokenThunk } from '../../redux/auth';
import { connect } from 'react-redux';
import { setToken } from "../../store/auth";

interface OAuthProps extends RouteChildrenProps {
  onInitToken?: (token: string) => void
  
}

const OAuth: FunctionComponent<OAuthProps> = ({ location: { hash }, onInitToken }: OAuthProps) => {
  const token = hash.split('=')[1];
  if(token) {
    onInitToken && onInitToken(token);
  }
  return <Redirect to={'/dashboard'} />
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: isAuthenticated(state)
})

const mapDispathToProps = (dispatch: any) => {
  return {
    onInitToken: (token: string) => dispatch(initTokenThunk(token))
  };
};

const OAuthWithRedux = connect(mapStateToProps, mapDispathToProps)(OAuth)

export { OAuthWithRedux as OAuth }

