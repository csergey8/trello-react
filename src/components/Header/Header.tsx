import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  userProfile?: any;
  logOut: () => any;
}

export const Header: React.FC<HeaderProps> = ({userProfile, logOut}: HeaderProps) => {
  const getUserInitials = (fullName: any): any => {
    const fullNameArray = fullName.split(' ')
    return `${fullNameArray[0][0]}${fullNameArray[1][0]}`
  }
  const renderUserControlPanel = () => userProfile ?
    <NavLink to="/profile">
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
      >
        <Avatar>{getUserInitials(userProfile.fullName)}</Avatar>
      </IconButton>
    </NavLink>
    : null
  return (
    <AppBar position="static">
      <Toolbar>
        <Button onClick={logOut}>
          Logout
        </Button>
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

