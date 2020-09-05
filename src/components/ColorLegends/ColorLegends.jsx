import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
}));

const entityTypeToColorObj = [
  { entity: "PERSON", color: "#756bb1" },
  { entity: "LOCATION", color: "#D4B924" },
  { entity: `ORGANIZATION`, color: "#56a7a7" },
  { entity: `COMMERCIAL_ITEM`, color: "#eb8f8f" },
  { entity: `EVENT`, color: "#f58743" },
  { entity: `DATE`, color: "#ffd571`" },
  { entity: `QUANTITY`, color: "#799351" },
  { entity: `TITLE`, color: "#e287ae" },
  { entity: `OTHER`, color: "#9c938b" },
  { entity: `KEY PHRASES`, color: "#a4b494" },
];

const ColorLegends = () => {
  const classes = useStyles();

  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        className={classes.title}
      >
        Text Legends
      </Typography>
      <div className={classes.root}>
        {entityTypeToColorObj.map((data) => {
          return (
            <Chip
              key={data.entity}
              label={data.entity}
              color="primary"
              style={{ backgroundColor: data.color }}
            />
          );
        })}
      </div>
    </>
  );
};

export default ColorLegends;
