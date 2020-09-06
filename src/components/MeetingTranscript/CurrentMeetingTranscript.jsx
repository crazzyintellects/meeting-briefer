import React, { useState, useEffect ,useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
//import comprehend from "../../apihelpers/comprehend";

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
  //const transcriptLength = meeting.transcript === undefined ? 0 : meeting.transcript.length;
  const initialState = {
    originalTranscript: meeting.transcript,
    clearScanTimeout: 0,
    intervalDuration: 30000,
    beginOffset: 0,
    endOffset: 0,
    sentiment: "NEUTRAL",
    processedTrancript: meeting.transcript,
    meetingON: meeting.meetingON,
    entities: [],
    keyPhrases: [],
  };

  // Set up initial Transcript
  const [meetingTranscript, setMeetingTranscript] = useState(initialState);

  //Update the original transcript
  useEffect(() => {
    if (meeting.transcript !== meetingTranscript.originalTranscript) {
      setMeetingTranscript((prevState) => {
        // Object.assign would also work
        return {
          ...prevState,
          originalTranscript: meeting.transcript,
          processedTrancript: meeting.transcript,
          meetingON: meeting.meetingON,
        };
      });
    }
  }, [
    meeting.transcript,
    meetingTranscript.originalTranscript,
    meeting.meetingON,
  ]);

  //Update the processed transcript and offset
  useEffect(() => {
    const transcriptLength =
      meetingTranscript.originalTranscript === undefined
        ? 0
        : meetingTranscript.originalTranscript.length;
    setMeetingTranscript((prevState) => {
      // Object.assign would also work
      return {
        ...prevState,
        beginOffset: prevState.endOffset,
        endOffset: transcriptLength,
      };
    });
  }, [meetingTranscript.originalTranscript]);

  // Comprehend api call method
  const processTranscript = async (meetingTranscript) => {
    //extract only new text to process
    const textToProcess =
      meetingTranscript.originalTranscript.length !== 0
        ? meetingTranscript.originalTranscript.slice(
            meetingTranscript.beginOffset,
            meetingTranscript.endOffset
          )
        : "";

    //set up params
    const params = {
      LanguageCode: "en" /* required - other option is es */,
      Text: textToProcess /* required - string that will parse for detecting entities */,
    };

    //call entities

    processEntities(params);

    //call keyphrase
    processKeyPhrases(params);

    //call sentiment
    processSentiment(params);
  };

  //process entities
  const processEntities = (params) => {
    //Data from api call
    const entities = {
      Entities: [
        {
          Score: 0.9888877272605896,
          Type: "ORGANIZATION",
          Text: "Amazon.com, Inc.",
          BeginOffset: 0,
          EndOffset: 16,
        },
        {
          Score: 0.9904236793518066,
          Type: "LOCATION",
          Text: "Seattle, WA",
          BeginOffset: 31,
          EndOffset: 42,
        },
        {
          Score: 0.998209536075592,
          Type: "DATE",
          Text: "July 5th, 1994",
          BeginOffset: 59,
          EndOffset: 73,
        },
        {
          Score: 0.9998189806938171,
          Type: "PERSON",
          Text: "Jeff Bezos",
          BeginOffset: 77,
          EndOffset: 87,
        },
        {
          Score: 0.9969415068626404,
          Type: "LOCATION",
          Text: "Seattle",
          BeginOffset: 150,
          EndOffset: 157,
        },
        {
          Score: 0.7944285869598389,
          Type: "LOCATION",
          Text: "Portland",
          BeginOffset: 170,
          EndOffset: 178,
        },
        {
          Score: 0.8503561019897461,
          Type: "LOCATION",
          Text: "Vancouver, BC",
          BeginOffset: 192,
          EndOffset: 205,
        },
        {
          Score: 0.9941838383674622,
          Type: "LOCATION",
          Text: "Seattle",
          BeginOffset: 221,
          EndOffset: 228,
        },
        {
          Score: 0.9990622401237488,
          Type: "ORGANIZATION",
          Text: "Starbucks",
          BeginOffset: 251,
          EndOffset: 260,
        },
        {
          Score: 0.9989330172538757,
          Type: "ORGANIZATION",
          Text: "Boeing",
          BeginOffset: 265,
          EndOffset: 271,
        },
      ],
    };

    //Logic to update processedTranscript
   
    let OriginalTranscript =
      "Amazon.com, Inc. is located in Seattle, WA and was founded July 5th, 1994 by Jeff Bezos, allowing customers to buy everything from books to blenders. Seattle is north of Portland and south of Vancouver, BC. Other notable Seattle - based companies are Starbucks and Boeing.";
    let result = entities.Entities;
    if (result.length > 0) {
      let startIndex = 0;
      renderTranscript = "";

      for (let entity of result) {
        //console.log(entity);
        let beforeString = OriginalTranscript.slice(startIndex, entity.BeginOffset);
        let afterString = OriginalTranscript.slice(entity.EndOffset,entity.EndOffset);
         renderTranscript+= `${beforeString} <span style='background-color:${entityTypeToColorMap.get(
          entity.Type
        )}'>${OriginalTranscript.slice(
          entity.BeginOffset,
          entity.EndOffset
        )}</span> ${afterString}`;
       // console.log(processedString);
        startIndex = entity.EndOffset + 1;
      }
    }

    //console.log(renderTranscript);
  //  var element = document.getElementById("typeText");
    //document.getElementById("typeText").innerHTML = renderTranscript;
    
   // console.log(element);


    
  };
  processEntities();

  let element = useRef(document.getElementById("typeText"));
  useEffect(() => {
   //element = document.getElementById("typeText");
   if(element != null)
    document.getElementById("typeText").innerHTML = renderTranscript;

  }, [element]);

  const processKeyPhrases = (params) => {};

  const processSentiment = (params) => {};

  const sentiment = {
    Sentiment: {
      Sentiment: "NEUTRAL",
      SentimentScore: {
        Positive: 0.00525312777608633,
        Negative: 0.0001172995544038713,
        Neutral: 0.9946269392967224,
        Mixed: 0.0000025949941573344404,
      },
    },
  };

  const keyPhrases = {
    KeyPhrases: [
      {
        Score: 0.9999395608901978,
        Text: "Amazon.com",
        BeginOffset: 0,
        EndOffset: 10,
      },
      {
        Score: 0.9999938607215881,
        Text: "Seattle, WA",
        BeginOffset: 31,
        EndOffset: 42,
      },
      {
        Score: 1,
        Text: "July 5th, 1994",
        BeginOffset: 59,
        EndOffset: 73,
      },
      {
        Score: 1,
        Text: "Jeff Bezos",
        BeginOffset: 77,
        EndOffset: 87,
      },
      {
        Score: 0.9999998807907104,
        Text: "customers",
        BeginOffset: 98,
        EndOffset: 107,
      },
      {
        Score: 0.9999995231628418,
        Text: "books",
        BeginOffset: 131,
        EndOffset: 136,
      },
      {
        Score: 0.9999986886978149,
        Text: "Seattle",
        BeginOffset: 150,
        EndOffset: 157,
      },
      {
        Score: 0.9999940395355225,
        Text: "Portland",
        BeginOffset: 170,
        EndOffset: 178,
      },
      {
        Score: 0.9999502301216125,
        Text: "Vancouver, BC",
        BeginOffset: 192,
        EndOffset: 205,
      },
      {
        Score: 0.9999995231628418,
        Text: "Other notable Seattle - based companies",
        BeginOffset: 207,
        EndOffset: 246,
      },
      {
        Score: 0.9999994039535522,
        Text: "Starbucks and Boeing",
        BeginOffset: 251,
        EndOffset: 271,
      },
    ],
  };

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
          {/*meetingTranscript.processedTrancript*/}
          
        </Typography>
      </div>
    </>
  );
};

export default CurrentMeetingTranscript;
