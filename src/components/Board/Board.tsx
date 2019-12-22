import * as React from 'react';
import Card from '@material-ui/core/Card';
import { Task } from '../Task';
import Typography from '@material-ui/core/Typography';
import styles from './Board.module.scss';

interface BoardProps {
    board: {
        cards?: any[],
        name: string, 
        prefs?: any
    };
}



export const Board: React.FC<BoardProps> = ({ board }: BoardProps) => {
    const style = {
        background: board.prefs.backgroundImage ? board.prefs.backgroundImage : board.prefs.background
    }
    return (
        <React.Fragment>
            <Card className={styles.card} style={style}>
                <Typography color="textSecondary" variant="h6" gutterBottom>
                    {board.name}
                </Typography>
            </Card>
        </React.Fragment>
    )
}
