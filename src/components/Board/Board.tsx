import * as React from 'react';
import Card from '@material-ui/core/Card';
import { Task } from '../Task';
import Typography from '@material-ui/core/Typography';


interface IProps {
    board: {
        cards: any[],
        name: string
    };
}

export const Board: React.FC<IProps> = ({ board }) => {
    return (
        <React.Fragment>
            <Card style={{ margin: '20px', width: 300}}>
                <Typography color="textSecondary" variant="h5" gutterBottom>
                    {board.name}
                </Typography>
                    {
                        board.cards.map(task => (<Task key={task.id} text={task.name} />))
                    }
            </Card>
        </React.Fragment>
    )
}
