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

export interface BoardsCards {
  [key: string]: any;
}

interface AppState {
  token: string;
  boards: Array<Board>;
  boardsCards?: any
}

export class App extends React.Component<{},AppState> {
  public state = {
    token: '',
    boards: [],
    boardsCards: {}
  }

  //Q do i need to set type of returned object in methods or fiunction in rsc

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
    const boardsData = await response.json();
    //Q if this.setState is async and set data will lately
    if(this.state.boards){
      let boardsCards: BoardsCards = {};
      boardsData.map( async (board: any) => {
        //Q how to make multiply async 
        let boardCard = {};
        const response = await fetch(`https://trello.com//1/boards/${board.id}/cards?key=${REACT_APP_API_KEY}&token=${this.state.token}`);
        const data = await response.json();
        boardsCards[board.id] = data
      })
      this.setState({
        boardsCards,
        boards: boardsData
      })
    }
  }

  private renderBoards() {
    //this.state.boardsCards[this.state.boardsCards[0].id])
    //why i can't use board.name
    //this.state.boardsCards[board['id']]
  return this.state.boards.map(board => {
  console.log(this.state.boardsCards);
  const id = board['id'];
  console.log(id);
  console.log(this.state.boardsCards[''])
  return <Board key={board['name']} name={board['name']} boardCards={this.state.boardsCards[board['id']]} id={board['id']}/>})
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
        <Container maxWidth="lg">
          {this.state.boards.length > 0 ? this.renderBoards(): 'no boards'}     
        </Container>
      </React.Fragment>
    );
  }
  
}

