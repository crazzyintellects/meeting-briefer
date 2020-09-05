import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import user1 from "../../assets/images/user1.jpg";
import user2 from "../../assets/images/user2.jpg";
import user3 from "../../assets/images/user3.jpg";
import user4 from "../../assets/images/user4.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: `30rem`,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: `1rem`,
    color: theme.palette.primary.main,
  },
  pos: {
    marginBottom: `1rem`,
  },
  card: {
    maxWidth: `10rem`,
    margin :`.5rem`,
    borderRadius: `1.2rem`,
    padding:`0.5rem .5rem`,
    [theme.breakpoints.up("sm")]: {
      maxWidth: `29rem`,
      margin :`1rem`,
    
    },
  },
  meetingDate: {
    display: `flex`,
    color: theme.palette.primary.main,
  },
  meetingTitle: {
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
  meetingText: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  avatar :{
    display:`flex`,
    flexWrap:'wrap',
   
  }
}));

export default function MeetingItem() {
  const classes = useStyles();

  return (
    <Card raised className={classes.card}>
      <CardContent>
        <div className={classes.meetingDate}>
          <AccessTimeIcon />
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
            style={{ marginLeft: `.8rem` }}
          >
            Sep 5,2020 9:00 - 10:00 AM MST
          </Typography>
        </div>
        <Typography
          variant="h6"
          component="h6"
          gutterBottom
          className={classes.meetingTitle}
        >
          vPayment Launchpad
        </Typography>

        <Typography
          variant="body2"
          component="p"
          gutterBottom
          className={classes.meetingText}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
          <Button color="secondary" size="small">
            Read More
          </Button>
        </Typography>
        <AvatarGroup max={5} className={classes.avatar}>
          <Avatar alt="User 1" src={user1} />
          <Avatar alt="User 2" src={user2} />
          <Avatar alt="User 3" src={user3} />
          <Avatar alt="User 4" src={user4} />
          <Avatar alt="User 5"  />
          <Avatar alt="User 6"  />
          <Avatar alt="User 7"  />
          <Avatar alt="User 8"  />
          <Avatar alt="User 9"  />
          <Avatar alt="User 10"  />
          <Avatar alt="User 11"  />
          <Avatar alt="User 12"  />
        </AvatarGroup>
      </CardContent>
    </Card>
  );
}
