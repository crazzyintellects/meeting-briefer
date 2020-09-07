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
        Color Legends
      </Typography>
      <Typography
      variant="caption"
      gutterBottom
      style={{fontSize:`0.8rem`}}
    >
    "Life is like a box of crayons. Find yours" <span role="img" aria-label="crayon">🖍</span>
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

        <Chip
              key="KEY PHRASES"
              label="KEY PHRASES"
              color="primary"
              style={{ backgroundColor: `#a4b494` , textDecorationLine:'underline' }}
            />
      </div>
    </>
  );
};

export default ColorLegends;
