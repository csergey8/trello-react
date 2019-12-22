import * as React from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { getBoardsThunk } from '../../redux/boards';
import styles from './Dashboard.module.scss';
import { Board } from '../Board';
import { getUserProfileThunk } from '../../redux/userProfile';

interface DashboardProps extends RouteChildrenProps {
  getBoards: () => void;
  getUserProfile: () => void;
  boards?: [];
  token?: string;
}

class Dashboard extends React.Component<DashboardProps> {
  componentDidMount() {
    this.props.getBoards();
    this.props.getUserProfile();
  }

  goBack = () => {
    this.props.history.goBack();
  }

  public renderBoards = () => {
    return this.props.boards ? this.props.boards.map(board => <Board board={board} />) : null
  }

  render() {
    console.log(this.props.boards)
    return (
    <>
      <Container maxWidth="md" className={styles.dashboard_container}>
        { !this.props.boards ? 
          <h2 onClick={this.goBack}>Hello from dashboard</h2> :
          this.renderBoards()
        }
      </Container>
    </>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  getBoards: () => dispatch(getBoardsThunk()),
  getUserProfile: () => dispatch(getUserProfileThunk())
})

const mapStateToProps = (state: any) => ({
  boards: state.boardsReducer.boards
})

const DashboardWithRedux = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export { DashboardWithRedux as Dashboard }

