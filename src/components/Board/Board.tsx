import * as React from 'react';
import Card from '@material-ui/core/Card';
import { Task } from '../Task';
import Typography from '@material-ui/core/Typography';
import styles from './Board.module.scss';

interface IProps {
    board: {
        cards: any[],
        name: string
    };
}

export const Board: React.FC<IProps> = ({ board }: IProps) => {
    return (
        <React.Fragment>
            <Card className={styles.card}>
                <Typography color="textSecondary" variant="h6" gutterBottom>
                    {board.name}
                </Typography>
                    {
                        board.cards.map(task => (<Task key={task.id} text={task.name} />))
                    }
            </Card>
        </React.Fragment>
    )
}
