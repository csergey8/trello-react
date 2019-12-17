import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

interface PrivatRouterProps extends RouteProps {
  isAuthenticated?: boolean;
  userProfile?: any;
  children?: React.ReactNode;
}


const ProtectedRoute: React.FC<PrivatRouterProps> = ({ children, render, isAuthenticated, ...rest }: PrivatRouterProps) => {
  debugger;
  return (
    <Route
      {...rest}
      render={(routeCompProps: RouteComponentProps) => 
         isAuthenticated ? (
          render!(routeCompProps)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeCompProps.location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.authReducer.isAuthenticated
})

const ProtectedRouteWithRedux = connect(mapStateToProps)(ProtectedRoute);

export { ProtectedRouteWithRedux as ProtectedRoute }