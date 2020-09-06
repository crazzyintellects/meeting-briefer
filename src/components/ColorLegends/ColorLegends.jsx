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
  { entity: "PERSON", color: "#aba1e6" },
  { entity: "LOCATION", color: "#D4B924" },
  { entity: `ORGANIZATION`, color: "#56a7a7" },
  { entity: `COMMERCIAL_ITEM`, color: "#a05656" },
  { entity: `EVENT`, color: "#f58743" },
  { entity: `DATE`, color: "#fb6e94" },
  { entity: `QUANTITY`, color: "#799351" },
  { entity: `TITLE`, color: "#259ee4" },
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
