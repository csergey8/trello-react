import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { Task } from '../Task';
import Typography from '@material-ui/core/Typography';
import styles from './Board.module.scss';
import { NavLink } from 'react-router-dom';

interface BoardCardProps {
    board: {
        cards?: any[],
        name: string, 
        prefs?: any, 
        id: any
    };
}



export const BoardCard: React.FC<BoardCardProps> = ({ board }: BoardCardProps) => {

    return (
        <NavLink to={`/board/${board.id}`} className={styles.text}>
            <Paper className={styles.card} elevation={10}>
                <Typography variant="h6" gutterBottom>
                    {board.name}
                </Typography>
            </Paper>
        </NavLink>
    )
}


