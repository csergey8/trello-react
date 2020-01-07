import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { Task } from '../Task';
import styles from './List.module.scss';
import { AddCard } from '../AddCard';

interface ListProps {
  list: any, 
  setAddCardMode: (id: string) => void,
  clearAddCardMode: () => void;
  addCard: (cardParams: any, id: string) => void;
}

const List: React.FC<ListProps> = (props) =>  {
  const renderCards = () => props.list.cards.map((card: any) => <Task text={card.name} key={card.id}/>)
    return (
      <Paper elevation={3} className={styles.list}>
        <Typography variant="body1" gutterBottom paragraph>
         <span className={styles.name}>{props.list.name}</span>
         {renderCards()}
        </Typography>
        <AddCard {...props}/>
      </Paper>
    );
  }


export { List };