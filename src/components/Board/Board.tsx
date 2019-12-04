import * as React from 'react';
import { BoardsCards } from '../App/App';
import { Card } from '../Card';

interface Props {
    name?: string;
    id: string;
    boardCards: any;
}

export const Board: React.SFC<Props> = ({ name, id, boardCards }) => {
    console.log(id, boardCards['5de56c2ffe5ed05f53262d9b']);
    console.log(boardCards)
    return (
        <React.Fragment>
            Board
        </React.Fragment>
    )
}
