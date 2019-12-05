import * as React from 'react';
import { Header } from '../Header';
import { Board } from '../Board';
import Container from '@material-ui/core/Container';
import { setToLocalStorage, getFromLocalStorage } from '../../utils';

const TOKEN_STORAGE = 'TOKEN';
const { REACT_APP_REDIRECT_URL, REACT_APP_SCOPE, REACT_APP_API_KEY, REACT_APP_APP_NAME } = process.env;

interface Board {
  id: string;
  name: string;
  desc?: string;
  pinned: boolean;
}
//Q why typescript does not show error if interface doesnt describe all properties setting in setState

interface AppState {
  token: string;
  boards: Array<Board>;
}


export class App extends React.Component<{},AppState> {
  public state = {
    token: '',
    boards: []
  }
  //Q do i need to set returned type in methods or function in rsc

  private async setToken(token: string) {
    this.setState({
      token
    })
    await setToLocalStorage(TOKEN_STORAGE, token)
  }

  private async getToken() {
    const token = await getFromLocalStorage(TOKEN_STORAGE);
    return token
  }

  private getTokenFromUrl() {
    return window.location.hash.split('=')[1]
  }
  
  private isLoggedIn() {
    return !!this.state.token
  }

  private login() {
    return `https://trello.com/1/authorize?return_url=${REACT_APP_REDIRECT_URL}&expiration=1day&name=${REACT_APP_APP_NAME}&scope=${REACT_APP_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;
  }

  private async getBoardsWithCards(){
    const response = await fetch(`https://trello.com/1/members/me/boards?token=${this.state.token}&key=${REACT_APP_API_KEY}`)
    const boards = await response.json();
    const newBoards: any[] = [];
    boards.map(async (board: any) => {
      //Q how to make multiply async 
      let newBoard = {};
      const response = await fetch(`https://trello.com//1/boards/${board.id}/cards?key=${REACT_APP_API_KEY}&token=${this.state.token}`);
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
    // async await setState here
    
}

  private renderBoards() {
    return this.state.boards.map((board: any) => <Board key={board.id}  board={board}/>)
  }

  public async componentDidMount() {
    const savedToken = await this.getToken();
    const newToken = this.getTokenFromUrl();
    this.setState({
      token: newToken
    })
    if(this.state.token){
      this.getBoardsWithCards()
    }
  }

  public render() {
    return (
      <React.Fragment>
        <Header isLoggedIn={this.isLoggedIn()} login={this.login()} />
        <Container maxWidth="lg" style={{ display: 'flex'}}>
          {this.state.boards.length > 0 ? this.renderBoards(): 'no boards'}     
        </Container>
      </React.Fragment>
    );
  }
  
}

