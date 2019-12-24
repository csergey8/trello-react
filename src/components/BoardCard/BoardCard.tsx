import * as React from 'react';
import Card from '@material-ui/core/Card';
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
    const style = {
        background: board.prefs.backgroundImage ? board.prefs.backgroundImage : board.prefs.background
    }
    return (
        <NavLink to={`/board/${board.id}`}>
            <Card className={styles.card} style={style}>
                <Typography color="textSecondary" variant="h6" gutterBottom>
                    {board.name}
                </Typography>
            </Card>
        </NavLink>
    )
}
