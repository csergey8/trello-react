import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAuthenticated } from '../../redux/auth';

interface PrivatRouterProps extends RouteProps {
  isAuthenticated?: boolean;
  userProfile?: any;
  children?: React.ReactNode;
}


const ProtectedRoute: React.FC<PrivatRouterProps> = ({ children, render, isAuthenticated, ...rest }: PrivatRouterProps) => {
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
  isAuthenticated: isAuthenticated(state)
})

const ProtectedRouteWithRedux = connect(mapStateToProps)(ProtectedRoute);

export { ProtectedRouteWithRedux as ProtectedRoute }