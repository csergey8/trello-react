import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styles from "./AddBoard.module.scss";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";

interface AddBoardProps {
  addBoard: (boardParams: any) => void;
}

const AddBoard: React.FC<AddBoardProps> = ({ addBoard }: AddBoardProps) => {
  const [addBoardMode, setAddBoardMode] = useState(false);
  const [ boardName, setBoardName ] = useState('');

  const dialogCloseHandler = () => {
    setAddBoardMode(false);
    setBoardName("");
  };

  const dialogOpenHandler = () => {
    setAddBoardMode(true);
  };

  const boardNameChangeHandler = (e: any) => {
    setBoardName(e.target.value)
  }

  const addBoardHandler = () => {
    if(boardName){
      addBoard({ name: boardName})
      setBoardName("");
      setAddBoardMode(false)
    }
  }

  return (
    <>
      <Dialog
        open={addBoardMode}
        className={styles.dialog}
        onClose={dialogCloseHandler}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Board Title"
            type="string"
            value={boardName}
            fullWidth
            onChange={boardNameChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={!boardName} onClick={addBoardHandler} variant="contained" color="primary">
            Create Board
          </Button>
          <Button onClick={dialogCloseHandler} variant="contained" color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
      <Paper
        className={styles.addBoard}
        elevation={3}
        onClick={dialogOpenHandler}
      >
        <Typography variant="body2" gutterBottom>
          Create new board
        </Typography>
      </Paper>
    </>
  );
};

export { AddBoard };
