import React from "react";
import { connect } from "react-redux";
import {
  getBoardListWithCardsThunk,
  getBoardByIdThunk,
  getListByPositionSelector,
  setAddCardModeThunk,
  clearAddCardModeThunk,
  addCardThunk,
  addListThunk,
  setAddListMode,
  clearAddListMode
} from "../../redux/boards";
import { List } from "../List";
import styles from "./Board.module.scss";
import Typography from "@material-ui/core/Typography";
import { AddList } from "../AddList";

interface BoardProps {
  lists: [];
  addListMode: boolean;
  getBoardList: (id: any) => void;
  getBoardById: (id: string) => void;
  setAddCardMode: (id: string) => void;
  clearAddCardMode: () => void;
  addCard: (cardParams: any, id: string) => void;
  setAddListMode: () => void;
  clearAddListMode: () => void;
  addList: (name: string) => void;
  match: {
    params: {
      id: string;
    };
  };
  board: {
    name?: string;
  };
}

class Board extends React.PureComponent<BoardProps> {
  componentDidMount() {
    this.props.getBoardList(this.props.match.params.id);
    this.props.getBoardById(this.props.match.params.id);
  }

  renderLists = () =>
    this.props.lists.map((list: any) => (
      <List
        list={list}
        key={list.id}
        clearAddCardMode={this.props.clearAddCardMode}
        setAddCardMode={this.props.setAddCardMode}
        addCard={this.props.addCard}
      />
    ));

  render() {
    return (
      <>
        <Typography variant="h5" className={styles.title}>
          {this.props.board ? this.props.board.name : "Loading"}
        </Typography>
        <div className={styles.container}>
          {this.props.lists.length > 0 ? this.renderLists() : null}
          <AddList
            board={this.props.board}
            addList={this.props.addList}
            addListMode={this.props.addListMode}
            clearAddListMode={this.props.clearAddListMode}
            setAddListMode={this.props.setAddListMode}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  lists: getListByPositionSelector(state),
  board: state.boardsReducer.board,
  addListMode: state.boardsReducer.addListMode
});

const mapDispatchToProps = (dispatch: any) => ({
  getBoardList: (id: any) => dispatch(getBoardListWithCardsThunk(id)),
  getBoardById: (id: string) => dispatch(getBoardByIdThunk(id)),
  setAddCardMode: (id: string) => dispatch(setAddCardModeThunk(id)),
  clearAddCardMode: () => dispatch(clearAddCardModeThunk()),
  addCard: (cardParams: any, id: string) =>
    dispatch(addCardThunk(cardParams, id)),
  addList: (name: string) => dispatch(addListThunk(name)),
  setAddListMode: () => dispatch(setAddListMode()),
  clearAddListMode: () => dispatch(clearAddListMode())
});

const BoardWithRedux = connect(mapStateToProps, mapDispatchToProps)(Board);

export { BoardWithRedux as Board };
