import * as React from 'react';
import { Header } from '../Header';
import { Board } from '../Board';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setToLocalStorage, getFromLocalStorage } from '../../utils';
import styles from './App.module.scss';
import { routes } from './routes';
import { Route, Switch, RouteChildrenProps, Redirect } from 'react-router';
import { OAuth } from '../OAuth';

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
  userInfo: {
    fullName: string;
    initials: string;
  }
}

export class App extends React.Component<any,AppState> {
  public state = {
    token: '',
    boards: [],
    userInfo: {
      fullName: '',
      initials: ''
    }
  }

  private setToken = (token: string) => {
    this.setState({
      token
    })
    setToLocalStorage(TOKEN_STORAGE, token)
  }

  private async getToken() {
    const token = await getFromLocalStorage(TOKEN_STORAGE);
    return token
  }

  private isLoggedIn() {
    return !!this.state.token
  }

  private getUserInitials(fullName: string) {
    const fullNameArray = fullName.split(' ')
    return `${fullNameArray[0][0]}${fullNameArray[1][0]}`
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

  private async getUserInfo(){
    const response = await fetch(`https://api.trello.com/1/members/me/?token=${this.state.token}&key=${REACT_APP_API_KEY}`);
    const { fullName } = await response.json();
    const initials = this.getUserInitials(fullName);
    this.setState({
      userInfo:{
        fullName,
        initials
      }
    })
  }

  private renderBoards() {
    return this.state.boards.map((board: any) => <Board key={board.id}  board={board}/>)
  }

  private renderContent() {
    return (
      <Switch>
        { routes.map((route: any, i: number) => <Route
          exact={route.exact}
          key={i}
          path={route.path}
          render={(props) => route.render({...props})}
          />
        )}
        <Route path="/oauth" render={(props: RouteChildrenProps) => <OAuth {...props} onSetToken={this.setToken} />} />
        <Redirect to="/404" />
      </Switch>
    )
  }

  public render() {
    return (
      <React.Fragment>
        <Header isLoggedIn={this.state.token} initials={this.state.userInfo.initials}/>
        {this.renderContent()}
        {/* <Container maxWidth="lg" className={this.state.boards.length > 0 ? styles.container : styles.container_loader}>
          {this.state.boards.length > 0 ? this.renderBoards(): <CircularProgress />}     
        </Container> */}
      </React.Fragment>
    );
  }
  
}

