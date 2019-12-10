import * as React from 'react';

interface IProps {
    text: string
}

export const Task: React.SFC<IProps> = ({ text }) => {
    return (
        <div>
            {text}
        </div>
    )
}
