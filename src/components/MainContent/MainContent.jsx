import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ColorLegends from "../ColorLegends/ColorLegends";
import UserMeeingAction from "../MeetingAction/UserMeetingAction";
import CurrentMeetingTranscript from "../MeetingTranscript/CurrentMeetingTranscript";
import SummaryTimeline from "../MeetingSummaryTimeline/SummaryTimeline";
import InProgress from "../InProgressMeetings/InProgress";
//import {startTranscribing,closeSocket} from '../../apihelpers/transcribe';
import {config} from "../../config/config";

const audioUtils = require("../../utils/audioUtils"); // for encoding audio data as PCM
const crypto = require("crypto"); // tot sign our pre-signed URL
const v4 = require("../../utils/aws-signature-v4"); // to generate our pre-signed URL
const marshaller = require("@aws-sdk/eventstream-marshaller"); // for converting binary event stream messages to and from JSON
const util_utf8_node = require("@aws-sdk/util-utf8-node"); // utilities for encoding and decoding UTF8
const mic = require("microphone-stream");
//const $                 = require('jquery');  // collect microphone input as a stream of raw bytes


// our converter between binary event streams messages and JSON
const eventStreamMarshaller = new marshaller.EventStreamMarshaller(
  util_utf8_node.toUtf8,
  util_utf8_node.fromUtf8
);

// our global variables for managing state
let languageCode = "en-US";
let region;
let sampleRate;
let inputSampleRate;
//let transcription = "";
let socket;
let micStream;
let socketError = false;
let transcribeException = false;

//DO NOT COMMIT
let accessID = config.accessKeyId;
let secret = config.secretAccessKey;

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
    // margin :`8rem`,
    marginTop: `-8.5rem`,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.primary.dark,
    borderRadius: `1.2rem`,
  },
}));

export default function MainContent() {
  const classes = useStyles();
  const initialMeeting = {
    meetingId: 1,
    meetingName: "",
    // transcript: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    transcript: "",
    startTime: new Date(),
    endTime : "",
    
    summary: {
      start: new Date(),
      text: "This is good",
      interval: 1,
    },
  };

  const [meeting, setMeeting] = useState(initialMeeting);
  async function startTranscribing() {
    // $('#error').hide(); // hide any existing errors
    //toggleStartStop(true); // disable start and enable stop button

    // set the language and region from the dropdowns
    setLanguage();
    setRegion();

    // first we get the microphone input from the browser (as a promise)...
    window.navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: true,
      })
      // ...then we convert the mic stream to binary event stream messages when the promise resolves
      .then(streamAudioToWebSocket)
      .catch(function (error) {
        console.error(
          "There was an error streaming your audio to Amazon Transcribe. Please try again."
        );
        //toggleStartStop();
      });
  }

  let streamAudioToWebSocket = function (userMediaStream) {
    //let's get the mic input from the browser, via the microphone-stream module
    micStream = new mic();

    micStream.on("format", function (data) {
      inputSampleRate = data.sampleRate;
    });

    micStream.setStream(userMediaStream);

    // Pre-signed URLs are a way to authenticate a request (or WebSocket connection, in this case)
    // via Query Parameters. Learn more: https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-query-string-auth.html
    let url = createPresignedUrl();

    //open up our WebSocket connection
    socket = new WebSocket(url);
    socket.binaryType = "arraybuffer";

    //let sampleRate = 0;

    // when we get audio data from the mic, send it to the WebSocket if possible
    socket.onopen = function () {
      micStream.on("data", function (rawAudioChunk) {
        // the audio stream is raw audio bytes. Transcribe expects PCM with additional metadata, encoded as binary
        let binary = convertAudioToBinaryMessage(rawAudioChunk);

        if (socket.readyState === socket.OPEN) socket.send(binary);
      });
    };

    // handle messages, errors, and close events
    wireSocketEvents();
  };

  function setLanguage() {
    sampleRate = 44100;
  }

  function setRegion() {
    region = "us-east-2";
  }

  function wireSocketEvents() {
    // handle inbound messages from Amazon Transcribe
    socket.onmessage = function (message) {
      //convert the binary event stream message to JSON
      let messageWrapper = eventStreamMarshaller.unmarshall(
        Buffer(message.data)
      );
      let messageBody = JSON.parse(
        String.fromCharCode.apply(String, messageWrapper.body)
      );
      if (messageWrapper.headers[":message-type"].value === "event") {
        return handleEventStreamMessage(messageBody);
      } else {
        transcribeException = true;
        console.error(messageBody.Message);
        // toggleStartStop();
      }
    };

    socket.onerror = function () {
      socketError = true;
      console.error("WebSocket connection error. Try again.");
      //toggleStartStop();
    };

    socket.onclose = function (closeEvent) {
      micStream.stop();

      // the close event immediately follows the error event; only handle one.
      if (!socketError && !transcribeException) {
        if (closeEvent.code !== 1000) {
          console.error(closeEvent.reason);
        }
        //toggleStartStop();
      }
    };
  }
 let transcription = "";
  let handleEventStreamMessage = function (messageJson) {
    let results = messageJson.Transcript.Results;
    
    // console.log(`results : ${JSON.stringify(results, null, 2)}`);

    if (results.length > 0) {
      if (results[0].Alternatives.length > 0) {
        let transcript = results[0].Alternatives[0].Transcript;

        // fix encoding for accented characters
        transcript = decodeURIComponent(escape(transcript));

       // document.getElementById("typeText").innerHTML = transcription + transcript + "\n";
        setMeeting((prevState) => {
         
          return { ...prevState, transcript:transcription + transcript + "\n" };
        });

        // if this transcript segment is final, add it to the overall transcription
        if (!results[0].IsPartial) {
         
           transcription += transcript + "\n";
          
        
      }

        //return transcription;

       
      }
    }
  };

  let closeSocket = function () {
    console.log("closing socket");
    if (socket.readyState === socket.OPEN) {
      micStream.stop();

      // Send an empty frame so that Transcribe initiates a closure of the WebSocket after submitting all transcripts
      let emptyMessage = getAudioEventMessage(Buffer.from(new Buffer([])));
      let emptyBuffer = eventStreamMarshaller.marshall(emptyMessage);
      socket.send(emptyBuffer);
    }
  };

  function convertAudioToBinaryMessage(audioChunk) {
    let raw = mic.toRaw(audioChunk);

    if (raw == null) return;

    // downsample and convert the raw audio bytes to PCM
    let downsampledBuffer = audioUtils.downsampleBuffer(
      raw,
      inputSampleRate,
      sampleRate
    );
    let pcmEncodedBuffer = audioUtils.pcmEncode(downsampledBuffer);

    // add the right JSON headers and structure to the message
    let audioEventMessage = getAudioEventMessage(Buffer.from(pcmEncodedBuffer));

    //convert the JSON object + headers into a binary event stream message
    let binary = eventStreamMarshaller.marshall(audioEventMessage);

    return binary;
  }

  function getAudioEventMessage(buffer) {
    // wrap the audio data in a JSON envelope
    return {
      headers: {
        ":message-type": {
          type: "string",
          value: "event",
        },
        ":event-type": {
          type: "string",
          value: "AudioEvent",
        },
      },
      body: buffer,
    };
  }

  function createPresignedUrl() {
    let endpoint = "transcribestreaming." + region + ".amazonaws.com:8443";

    // get a preauthenticated URL that we can use to establish our WebSocket
    return v4.createPresignedURL(
      "GET",
      endpoint,
      "/stream-transcription-websocket",
      "transcribe",
      crypto.createHash("sha256").update("", "utf8").digest("hex"),
      {
        key: accessID,
        secret: secret,
        // 'sessionToken': $('#session_token').val(),
        protocol: "wss",
        expires: 15,
        region: region,
        query:
          "language-code=" +
          languageCode +
          "&media-encoding=pcm&sample-rate=" +
          sampleRate,
      }
    );
  }

  const startMeetingAction = async (meeting) => {
    setMeeting(meeting);

    // check to see if the browser allows mic access
    if (!window.navigator.mediaDevices.getUserMedia) {
      // Use our helper method to show an error on the page
      console.error(
        "We support the latest versions of Chrome, Firefox, Safari, and Edge. Update your browser and try your request again."
      );

      // maintain enabled/distabled state for the start and stop buttons
      //toggleStartStop();
    }

    //call transcribing
      await startTranscribing();
    // console.log(`${transcription}`);
  };

  const stopMeetingAction = (meeting) => {
    // setMeeting({...meeting,startTime : meeting.startTime});
    setMeeting((prevState) => {
      // Object.assign would also work
      return { ...prevState, endTime: meeting.endTime ,meetingON : meeting.meetingON};
    });
    closeSocket();
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4} alignContent="center" justify="space-between">
        <Grid item xs={2} xl={3}>
          <Paper className={classes.paper} elevation={5}>
            Stats
          </Paper>
        </Grid>
        <Grid item xs={7} xl={6}>
          <Paper className={classes.paper} elevation={5}>
            <UserMeeingAction
              startMeetingAction={startMeetingAction}
              stopMeetingAction={stopMeetingAction}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={5}>
            <InProgress/>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={5}>
            {" "}
            <ColorLegends />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={5}>
            <CurrentMeetingTranscript meeting={meeting} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={5}>
            <SummaryTimeline />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
