import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import comprehend from "../../apihelpers/comprehend";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    // color:theme.palette.secondary.main,
    textAlign: `start`,
    padding: `0 1.2rem`,
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.dark,
  },
}));

const entityTypeToColorMap = new Map([
  [`PERSON`, `#aba1e6`],
  [`LOCATION`, `#D4B924`],
  [`ORGANIZATION`, `#56a7a7`],
  [`COMMERCIAL_ITEM`, `#a05656`],
  [`EVENT`, `#f58743`],
  [`DATE`, `#fb6e94`],
  [`QUANTITY`, `#799351`],
  [`TITLE`, `#259ee4`],
  [`OTHER`, `#9c938b`],
]);
let renderTranscript = "";

const CurrentMeetingTranscript = ({ meeting }) => {
  const classes = useStyles();

  const initialState = {
    originalTranscript: meeting.transcript,
    intervalDuration: 30000,
    sentiment: "NEUTRAL",
    //processedTrancript: meeting.transcript,
    meetingON: meeting.meetingON,
  };

  // Set up initial Transcript
  // eslint-disable-next-line
  const [meetingTranscript, setMeetingTranscript] = useState(initialState);

  //Update the original transcript
  useEffect(() => {
    if (meeting.transcript !== meetingTranscript.originalTranscript) {
      /* setMeetingTranscript((prevState) => {
        // Object.assign would also work
        return {
          ...prevState,
          originalTranscript: meeting.transcript,
         // processedTrancript: meeting.transcript,
          meetingON: meeting.meetingON,
        };
      }); */
      console.log("inside use effect ");
      if (meeting.meetingON === false)
        setTimeout(processTranscript, 3000, meeting.transcript);
      //processTranscript(meeting.transcript);
    }
    // eslint-disable-next-line
  }, [
    // meeting.transcript,
    // meetingTranscript.originalTranscript,
    meeting.meetingON,
  ]);

  // Comprehend api call method
  const processTranscript = async (meetingTranscript) => {
    //set up params
    const params = {
      LanguageCode: "en" /* required - other option is es */,
      Text: meetingTranscript /* required - string that will parse for detecting entities */,
    };

    //call entities
    processEntities(params);

    //call keyphrase
    // processKeyPhrases(params);

    //call sentiment
    //processSentiment(params);
  };

  //process entities
  const processEntities = async (params) => {
    //Data from api call
    let count = 0;
    console.log("count " + ++count);
    comprehend.detectEntities(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else {
        console.log(data);
        if (Object.keys(data).length > 0) {
          let result = data.Entities;
          let startIndex = 0;
          renderTranscript = "";

          for (let entity of result) {
            //console.log(entity);
            let beforeString = params.Text.slice(
              startIndex,
              entity.BeginOffset
            );
            let afterString = params.Text.slice(
              entity.EndOffset,
              entity.EndOffset
            );
            renderTranscript += `${beforeString} <span style='background-color:${entityTypeToColorMap.get(
              entity.Type
            )}'>${params.Text.slice(
              entity.BeginOffset,
              entity.EndOffset
            )}</span> ${afterString}`;
            // console.log(processedString);
            startIndex = entity.EndOffset + 1;
          }
          document.getElementById("typeText").innerHTML = renderTranscript;
        }
      }
    });
  };
  /*let data = `The American Express Company, also known as Amex, is an American multinational financial services corporation headquartered at 200 Vesey Street in New York City. The company was founded in 1850 and is one of the 30 components of the Dow Jones Industrial Average. The company is best known for its charge card, credit card, and traveler's cheque businesses.
  During the 1980s, Amex invested in the brokerage industry, acquiring what became, in increments, Shearson Lehman Hutton and then divesting these into what became Smith Barney Shearson (owned by Primerica) and a revived Lehman Brothers. By 2008 neither the Shearson nor the Lehman name existed.In 2016, credit cards using the American Express network accounted for 22.9% of the total dollar volume of credit card transactions in the United States. As of December 31, 2019, the company had 114.4 million cards in force, including 54.7 million cards in force in the United States, each with an average annual spending of $19,972.`;
  processTranscript(data);*/

  // const processKeyPhrases = async (params) => {};
  //const processSentiment = (params) => {};

  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        className={classes.title}
      >
        Meeting Transcript for {meeting.meetingName}
      </Typography>

      <div className={`${classes.root} `}>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          style={{ fontWeight: 600 }}
          id="typeText"
        >
          {meeting.transcript}
        </Typography>
      </div>
    </>
  );
};

export default CurrentMeetingTranscript;
