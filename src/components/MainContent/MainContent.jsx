import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
    margin :`8rem`,
    marginTop:`-8.5rem`,

    
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.primary.dark,
    borderRadius: `1.5rem`,
    
  },
}));

export default function MainContent() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignContent="center" justify="space-between">
       
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={5}>Stats</Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper} elevation={5}>Action Item</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} style={{minHeight:`24rem`}} elevation={5}>In Progress</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={5}>Typing Text</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={5}>Comprehend Text Legend</Paper>
        </Grid>
       
      </Grid>
    </div>
  );
}
