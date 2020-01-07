import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAuthenticated } from '../../redux/auth';
import { setRedirectUrl } from '../../redux/navigation';

interface PrivatRouterProps extends RouteProps {
  isAuthenticated?: boolean;
  userProfile?: any;
  children?: React.ReactNode;
  setRedirectUrl: (url: any) => void;
}


const ProtectedRoute: React.FC<PrivatRouterProps> = ({ children, render, isAuthenticated, setRedirectUrl, ...rest }: PrivatRouterProps) => {
  setRedirectUrl(rest.path)
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

const mapDispatchToProps = (dispatch: any) => ({
  setRedirectUrl: (url: any) => dispatch(setRedirectUrl(url))
})

const ProtectedRouteWithRedux = connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);

export { ProtectedRouteWithRedux as ProtectedRoute }