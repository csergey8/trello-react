import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import styles from './Header.module.scss';

interface Props {
  isLoggedIn: string;
  initials?: string;
}

export const Header: React.FC<Props> = ({ isLoggedIn,  initials }) => {
  console.log(isLoggedIn)
  const renderUserControlPanel = () => isLoggedIn ?
    <IconButton
      edge="end"
      aria-label="account of current user"
      // aria-controls={menuId}
      aria-haspopup="true"
      // onClick={handleProfileMenuOpen}
      color="inherit"
    >
      <Avatar>{initials}</Avatar>
    </IconButton>
    : null
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Trello React
        </Typography>
        {renderUserControlPanel()}
      </Toolbar>
    </AppBar>
  );
};

