import React, { FunctionComponent } from "react";
import { RouteChildrenProps, Redirect } from "react-router";
import { isAuthenticated } from '../../redux/auth';
import { connect } from 'react-redux';

interface OAuthProps extends RouteChildrenProps {
  
}

const OAuth: FunctionComponent<OAuthProps> = ({ location: { hash } }: OAuthProps) => {
  const token = hash.split('=')[1];
  console.log(token)
  return <Redirect to={'/dashboard'} />
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: isAuthenticated(state)
})

const OAuthWithRedux = connect(mapStateToProps)(OAuth)

export { OAuthWithRedux as OAuth }

