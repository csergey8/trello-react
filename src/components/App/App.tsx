import * as React from 'react';
import { setToLocalStorage, getFromLocalStorage } from '../../utils';

const TOKEN_STORAGE = 'TOKEN'

interface Board {
  id: string;
  name: string;
  desc?: string;
  pinned?: boolean
}


interface AppState {
  token: string;
  boards: Array<Board>;
}

export class App extends React.Component<{},AppState> {
  public state = {
    token: '',
    boards: []
  }

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



  public async componentDidMount() {
    const savedToken = await this.getToken();
    const newToken = this.getTokenFromUrl();
    console.log(newToken)
    
  }

  public render() {
    const redirectUrl = 'http://localhost:3000';
    const scope = ['read', 'write', 'account'];
    const appName = 'TRELLO_REACT_APP';
    const ApiKey = '350be62a0a7bac70d98aaf94b5b0cb76'
    const requestUrl = `https://trello.com/1/authorize?return_url=${redirectUrl}&expiration=1day&name=${appName}&scope=${scope.join(',')}&response_type=token&key=${ApiKey}`
    return (
      <div>
        {/* <Header /> */}
        <a href={requestUrl}>Login</a>
        <h2>Trelloz</h2>      
      </div>
    );
  }
  
}

