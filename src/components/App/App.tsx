import * as React from 'react';
import { Header } from '../Header';
import { connect } from 'react-redux';
import { initThunk } from '../../redux/initialization'
import { routes, AppRoute, ROUTES_URLS } from './routes';
import { Route, Switch, RouteChildrenProps, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { OAuth } from '../OAuth';
import { ProtectedRoute } from '../ProtectedRoute';

interface Board {
  id: string;
  name: string;
  desc?: string;
  pinned: boolean;
}

interface AppState {
  token: string;
  boards: Array<Board>;
  userProfile: any;
}

interface AppProps extends RouteComponentProps {
  onInit: () => void
}

interface CustomToken {
  token: string;
  expireIn: number;
}

const INTIAL_STATE = {
  token: '',
  boards: [],
  userProfile: undefined
}

class App extends React.Component<AppProps,AppState> {
  public state = INTIAL_STATE;

  componentWillMount() {
    this.props.onInit()
  }

  private renderContent() {
    return (
      <Switch>
        { routes.map(this.renderRoute)}
        <Route path={ROUTES_URLS.OAUTH} render={(props: RouteChildrenProps) => <OAuth {...props} />} />
        <Redirect to="/404" />
      </Switch>
    )
  }

  private renderRoute = (route: AppRoute, i: number) => {
    if(route.isProtected){
      return <ProtectedRoute
        {...route}
        key={route.path}
      />
    } else {
      return <Route
        key={route.path}
        {...route}
      />
    }
  }

  public render() {
    return (
      <>
        <Header {...this.props}/>
        {this.renderContent()}
      </>
    );
  }
  
}

const mapDispatchToProps = (dispatch: any) => ({
  onInit: () => dispatch(initThunk())
})

const appWithRouter = withRouter(connect(undefined, mapDispatchToProps)(App));

export { appWithRouter as App };
