import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from "@material-ui/icons/Edit";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
    },
  },
}));

export default function IconButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <IconButton color="secondary" aria-label="edit summary">
      <EditIcon  />
      </IconButton>
      
    </div>
  );
}
