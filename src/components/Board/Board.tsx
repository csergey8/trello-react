import * as React from 'react';
import { BoardsCards } from '../App/App';
import { Card } from '../Card';

interface Props {
    name?: string;
    id: string;
    boardCards: any;
}

export const Board: React.SFC<Props> = ({ name, id, boardCards }) => {
    console.log(id, boardCards);
    return (
        <React.Fragment>
            Board
        </React.Fragment>
    )
}
