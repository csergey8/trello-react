import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import styles from './Task.module.scss';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

interface IProps {
    text: string
}

export const Task: React.SFC<IProps> = ({ text }: IProps) => {
    return (
        <Paper className={styles.task}>
            <Typography variant="body2">{text}<EditIcon className={styles.icon} /></Typography>
        </Paper>
    )
}
