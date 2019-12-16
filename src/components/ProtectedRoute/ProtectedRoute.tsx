import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface PrivatRouterProps extends RouteProps {
  isAuthenticated: boolean;
  userProfile?: any;
  children?: React.ReactNode;
}


export const ProtectedRoute: React.FC<PrivatRouterProps> = ({ children, render, isAuthenticated, ...rest }: PrivatRouterProps) => {
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