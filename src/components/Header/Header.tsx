import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

interface Props {
  isLoggedIn: boolean;
  login?: string;
}

export const Header: React.SFC<Props> = ({ isLoggedIn, login }) => {
  const renderUserLogin = () => isLoggedIn ?
    <Typography variant="h5">Hello User</Typography>
    : <a href={login}><Button color="inherit">Login</Button></a>
  console.log(isLoggedIn)
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Trello React
        </Typography>
        {renderUserLogin()}
      </Toolbar>
    </AppBar>
  );
};

