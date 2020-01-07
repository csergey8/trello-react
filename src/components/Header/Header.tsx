import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteChildrenProps } from 'react-router';
import { getTokenAction } from '../../redux/auth';

interface HeaderProps extends RouteChildrenProps {
  profile?: any;
  logOut?: () => any;
  getToken?: () => any;
}

const Header: React.FC<HeaderProps> = ({profile, logOut, getToken, history}: HeaderProps, ...rest) => {
  const getUserInitials = (fullName: any): any => {
    const fullNameArray = fullName.split(' ')
    return `${fullNameArray[0][0]}${fullNameArray[1][0]}`
  }

  const renderUserControlPanel = () => profile ?
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        onClick={() => history.push('/profile')}
      >
        <Avatar>{getUserInitials(profile.fullName)}</Avatar>
      </IconButton>
    : null

  return (
    <AppBar position="static">
      <Toolbar className={styles.header}>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => history.push('/dashboard')}>
          <HomeOutlinedIcon />
        </IconButton>
        <Typography variant="h5">
          Trello React
        </Typography>
        {renderUserControlPanel()}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: any) => ({
  profile: state.userProfileReducer.profile
})

const HeaderWithRedux = connect(mapStateToProps)(Header);
export { HeaderWithRedux as Header};

