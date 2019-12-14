import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivatRouterProps extends RouteProps {
  isAuthenticated: boolean;
  children?: React.ReactNode;
}


export const ProtectedRoute: React.FC<PrivatRouterProps> = ({ children, isAuthenticated, ...rest }: PrivatRouterProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}