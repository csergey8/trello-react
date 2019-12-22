import React, { FunctionComponent } from "react";
import { RouteChildrenProps, Redirect } from "react-router";
import { isAuthenticated } from '../../redux/auth';
import { connect } from 'react-redux';
import { setToken } from "../../store/auth";

interface OAuthProps extends RouteChildrenProps {
  onSetToken?: (token: string) => void
  
}

const OAuth: FunctionComponent<OAuthProps> = ({ location: { hash }, onSetToken }: OAuthProps) => {
  const token = hash.split('=')[1];
  console.log(token)
  onSetToken && onSetToken(token);
  debugger;
  return <Redirect to={'/dashboard'} />
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: isAuthenticated(state)
})

const mapDispathToProps = (dispatch: any) => {
  return {
    onSetToken: (token: string) => dispatch(setToken(token))
  };
};

const OAuthWithRedux = connect(mapStateToProps, mapDispathToProps)(OAuth)

export { OAuthWithRedux as OAuth }

