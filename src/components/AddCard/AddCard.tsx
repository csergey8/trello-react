import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Typography from "@material-ui/core/Typography";
import styles from "./AddCard.module.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

interface AddCardProps {
  list: {
    id: string;
    addMode?: boolean;
  };
  setAddCardMode: (id: string) => any;
  clearAddCardMode: () => void;
  addCard: (cardParams: any, id: string) => void;
}

const AddCard: React.FC<AddCardProps> = props => {
  const [cardText, setCardText] = useState("");

  const onCardTextChangeHandler = (e: any) => {
    setCardText(" ");
    setCardText(e.target.value);
  };

  const setAddCardModeHanlder = () => {
    props.setAddCardMode(props.list.id);
  };

  const addCardHandler = () => {
    if (cardText) {
      props.addCard({ name: cardText }, props.list.id);
      setCardText(" ");
    }
  };

  const clearAddCardModeHandler = () => {
    props.clearAddCardMode();
  };

  return (
    <>
      {props.list.addMode ? (
        <>
          <TextField
            multiline
            rows="2"
            value={cardText}
            variant="outlined"
            autoFocus={true}
            onChange={onCardTextChangeHandler}
          />
          <Button variant="contained" color="primary" onClick={addCardHandler}>
            Add Card
          </Button>
          <CloseIcon onClick={clearAddCardModeHandler} />
        </>
      ) : (
        <Paper className={styles.addCard} onClick={setAddCardModeHanlder}>
          <AddOutlinedIcon />
          <Typography variant="body2" display="inline">
            Add another card
          </Typography>
        </Paper>
      )}
    </>
  );
};

export { AddCard };
