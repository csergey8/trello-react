import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import styles from "./AddList.module.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

interface AddListProps {
  addListMode: boolean;
  addList: (name: string) => void;
  setAddListMode: () => void;
  clearAddListMode: () => void;
  board?: any;
}

const AddList: React.FC<AddListProps> = props => {
  const [listText, setListText] = useState("");

  const addListHandler = () => {
    if (listText) {
      props.addList(listText);
      setListText("");
      props.clearAddListMode();
    }
  };

  const listTextHandler = (e: any) => {
    setListText(e.target.value);
  };

  const clearAddListModeHandler = (e: any) => {
    e.stopPropagation();
    props.clearAddListMode();
  };

  return props.addListMode ? (
    <Paper className={styles.addList}>
      <TextField
        variant="outlined"
        value={listText}
        onChange={listTextHandler}
        autoFocus={true}
      />
      <Button variant="contained" color="primary" onClick={addListHandler}>
        Add List
      </Button>
      <CloseIcon onClick={clearAddListModeHandler} />
    </Paper>
  ) : (
    <Paper className={styles.addList} onClick={props.setAddListMode}>
      <AddOutlinedIcon />
      <Typography display="inline" variant="body2">
        Add another list
      </Typography>
    </Paper>
  );
};

export { AddList };
