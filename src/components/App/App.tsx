import * as React from 'react';
import { Header } from '../Header';
import { Board } from '../Board';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setToLocalStorage, getFromLocalStorage } from '../../utils';
import styles from './App.module.scss';
import { Provider } from 'react-redux';
import { store } from '../../redux';
import { routes, AppRoute } from './routes';
import { Route, Switch, RouteChildrenProps, Redirect, withRouter } from 'react-router';
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
  userProfile: any
}

const INTIAL_STATE = {
  token: '',
  boards: [],
  userProfile: undefined
}

class App extends React.Component<any,AppState> {
  public state = INTIAL_STATE;

  componentDidMount() {
    this.getToken();
  }

  private setToken = (token: string) => {
    this.setState({
      token
    })
    setToLocalStorage(TOKEN_STORAGE, token)
  }

  private async getToken() {
    const token = await getFromLocalStorage(TOKEN_STORAGE);
    if(!token) {
      debugger;
      return this.navigateToLogin()
    } 
    const url = (`https://api.trello.com/1/members/me?token=${token}&key=${REACT_APP_API_KEY}`)
    const response = await fetch(url);
    if(response.ok === true && response.status === 200){
      const userProfile = await response.json();
      this.setProfile(userProfile);
      this.setToken(token);
      return this.navigateToDashboard();
    } 
    this.navigateToLogin();
    
    
  }

  private logOut = () => {
    this.setState(INTIAL_STATE);
    this.navigateToLogin();
  }

  private navigateToDashboard() {
    return this.props.history.push(ROUTES_URLS.DASHBOARD);
  }

  private navigateToLogin() {
    return this.props.history.push(ROUTES_URLS.LOGIN)
  }

  private setProfile = (userProfile: any) => {
      this.setState({
        userProfile
      })
  }

  private login() {
    return `https://trello.com/1/authorize?return_url=${REACT_APP_REDIRECT_URL}&expiration=1day&name=${REACT_APP_APP_NAME}&scope=${REACT_APP_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;
  }

  private async getBoardsWithCards(){
    const response = await fetch(`https://trello.com/1/members/me/boards?token=${this.state.token}&key=${REACT_APP_API_KEY}`)
    const boards = await response.json();
    const newBoards: any[] = [];
    boards.map(async (board: any) => {
      let newBoard = {};
      const response = await fetch(`https://trello.com/1/boards/${board.id}/cards?key=${REACT_APP_API_KEY}&token=${this.state.token}`);
      const data = await response.json();
      newBoard = {
        ...board,
        cards: data
      }
      newBoards.push(newBoard)
      this.setState({
        boards: newBoards
    })
  })
}

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

  private renderBoards() {
    return this.state.boards.map((board: any) => <Board key={board.id}  board={board}/>)
  }

  private renderContent() {
    return (
      <Switch>
        { routes.map(this.renderRoute)}
        <Route path="/oauth" render={(props: RouteChildrenProps) => <OAuth {...props} onSetToken={this.setToken} />} />
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
      <Provider store={store}>
        <Header userProfile={this.state.userProfile} logOut={this.logOut} />
        {this.renderContent()}
        {/* <Container maxWidth="lg" className={this.state.boards.length > 0 ? styles.container : styles.container_loader}>
          {this.state.boards.length > 0 ? this.renderBoards(): <CircularProgress />}     
        </Container> */}
      </Provider>
    );
  }
  
}

const appWithRouter = withRouter(App);

export { appWithRouter as App };
