import React, {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Icon from "@material-ui/core/Icon";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButtons from "./IconButtons";
import {SingleMeetingContext} from "../../context/singleMeeting.context";
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    "& > *": {
      //margin: theme.spacing(0.5),
    },
    //textAlign: `start`,
    // padding: `0 1.2rem`,
  },
  button: {
    margin: theme.spacing(1),
      width:200,
  },
  paper: {
    padding: "0.4rem .8rem",
    display: `flex`,
    justifyContent: `space-between`,
    color: theme.palette.primary.dark,
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
  customTextArea:{
      border:0,
      backgroundColor:theme.palette.primary.contrastText,
      width:200
  }
}));


export default function SummaryTimeline() {
  const classes = useStyles();
  const { singleMeeting } = useContext(SingleMeetingContext);
  const [state, setState] = useState(true);
  const [loading, setLoadingState] = useState(false);

  function toggleState(){
      setState(false);
  }
  function toggleStateOnBlur(){
      setState(true);
  }
  useEffect(() => {
      console.log("useEffect of SummaryTimeline called")
      if(singleMeeting.summary === null || singleMeeting.summary.length ===0){
          setLoadingState(true);
      }else{
          setLoadingState(false);
      }
  }, [singleMeeting.summary])
  return (
    <>
      <Typography
          variant="h6"
          component="h6"
          gutterBottom
          className={classes.title}
      >
        Meeting Summary Timeline
      </Typography>
        {loading ? (<div><Skeleton animation="wave" /><Skeleton animation="wave" /><Skeleton animation="wave" /><Skeleton animation="wave" /><Skeleton animation="wave" /></div>) : (<Timeline align="alternate" className={classes.root}>
                {singleMeeting.summary.map(summaryObject => (
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary">
                                {summaryObject.start.getHours() + ':' + summaryObject.start.getMinutes() + ':' + summaryObject.start.getSeconds()}
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary">
                                <LaptopMacIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <IconButtons changeState={toggleState}/>
                                <TextareaAutosize id={summaryObject.interval} disabled={state} aria-label="minimumHeight" rowsMin={5} rowsMax={10} className={classes.customTextArea} onBlur={toggleStateOnBlur}>
                                    {summaryObject.text + ' ' + summaryObject.start.getHours() + ':' + summaryObject.start.getMinutes() + ':' + summaryObject.start.getSeconds()}
                                </TextareaAutosize>
                                {/*<Typography style={{ textAlign: "start" }}>
                   {summaryObject.text}
                  </Typography>*/}
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>)}
        {loading ? (<div/>) : (<Button variant="contained" color="primary" className={classes.button} endIcon={<Icon>send</Icon>}>Email/Slack</Button>)}
    </>
  )
}
