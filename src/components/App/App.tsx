import * as React from 'react';
import { Header } from '../Header';
import { Board } from '../Board';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setToLocalStorage, getFromLocalStorage } from '../../utils';
import { init } from '../../redux/initiazilation';
import styles from './App.module.scss';
import { routes, AppRoute, ROUTES_URLS } from './routes';
import { Route, Switch, RouteChildrenProps, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { OAuth } from '../OAuth';
import { ProtectedRoute } from '../ProtectedRoute';

const TOKEN_STORAGE = 'TOKEN';
const { REACT_APP_REDIRECT_URL, REACT_APP_SCOPE, REACT_APP_API_KEY, REACT_APP_APP_NAME } = process.env;

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

 

//   private async getBoardsWithCards(){
//     const response = await fetch(`https://trello.com/1/members/me/boards?token=${this.state.token}&key=${REACT_APP_API_KEY}`)
//     const boards = await response.json();
//     const newBoards: any[] = [];
//     boards.map(async (board: any) => {
//       let newBoard = {};
//       const response = await fetch(`https://trello.com/1/boards/${board.id}/cards?key=${REACT_APP_API_KEY}&token=${this.state.token}`);
//       const data = await response.json();
//       newBoard = {
//         ...board,
//         cards: data
//       }
//       newBoards.push(newBoard)
//       this.setState({
//         boards: newBoards
//     })
//   })
// }

  // private async getUserInfo(){
  //   const response = await fetch(`https://api.trello.com/1/members/me/?token=${this.state.token}&key=${REACT_APP_API_KEY}`);
  //   const { fullName } = await response.json();
  //   const initials = this.getUserInitials(fullName);
  //   this.setState({
  //     userInfo:{
  //       fullName,
  //       initials
  //     }
  //   })
  // }

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
        <Header logOut={() => console.log('logout')} />
        {this.renderContent()}
      </>
    );
  }
  
}

const mapDispatchToProps = (dispatch: any) => ({
  onInit: () => dispatch(init())
})

const appWithRouter = withRouter(connect(undefined, mapDispatchToProps)(App));

export { appWithRouter as App };
