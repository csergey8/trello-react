import * as React from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { getBoardsThunk, addBoardThunk } from '../../redux/boards';
import styles from './Dashboard.module.scss';
import { BoardCard } from '../BoardCard';
import { getUserProfileThunk } from '../../redux/userProfile';
import { AddBoard } from '../AddBoard';

interface DashboardProps extends RouteChildrenProps {
  getBoards: () => void;
  getUserProfile: () => void;
  addBoard: (boardParams: any) => void;
  boards?: [];
  token?: string;
}

class Dashboard extends React.Component<DashboardProps> {
  componentDidMount() {
    this.props.getBoards();
  }

  goBack = () => {
    this.props.history.goBack();
  }

  public renderBoards = () => {
    return this.props.boards ? this.props.boards.map((board: any) => <BoardCard board={board} key={board.id} />) : null
  }

  render() {
    console.log(this.props.boards)
    return (
    <>
      <div className={styles.dashboardContainer}>
        { !this.props.boards ? 
          <h2 onClick={this.goBack}>Hello from dashboard</h2> :
          this.renderBoards()
        }
      <AddBoard addBoard={this.props.addBoard}/>
      </div>
    </>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  getBoards: () => dispatch(getBoardsThunk()),
  getUserProfile: () => dispatch(getUserProfileThunk()),
  addBoard: (boardParams: any) => dispatch(addBoardThunk(boardParams))
})

const mapStateToProps = (state: any) => ({
  boards: state.boardsReducer.boards
})

const DashboardWithRedux = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export { DashboardWithRedux as Dashboard }

