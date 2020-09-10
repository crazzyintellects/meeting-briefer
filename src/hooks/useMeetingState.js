import { useState } from "react";
import { useLocalStorageState } from "./useLocalStorageState";
import { v4 as uuidv4 } from "uuid";

import { config } from "../config/config";

const audioUtils = require("../utils/audioUtils"); // for encoding audio data as PCM
const crypto = require("crypto"); // tot sign our pre-signed URL
const v4 = require("../utils/aws-signature-v4"); // to generate our pre-signed URL
const marshaller = require("@aws-sdk/eventstream-marshaller"); // for converting binary event stream messages to and from JSON
const util_utf8_node = require("@aws-sdk/util-utf8-node"); // utilities for encoding and decoding UTF8
const mic = require("microphone-stream");

// our global variables for managing transcribing state
let languageCode = "en-US";
let region;
let sampleRate;
let inputSampleRate;
//let transcription = "";
let socket;
let micStream;
let socketError = false;
let transcribeException = false;

let accessID = config.accessKeyId;
let secret = config.secretAccessKey;

//List of meetings management for In progress meetings and Recent meetings completed
export function useMeetingsState(initialMeeting) {
  const [meetings, setMeetings] = useLocalStorageState(
    "meetings",
    initialMeeting
  );

  return {
    meetings,
    submitMeeting: (newMeetingObject) => {
      setMeetings([...meetings, newMeetingObject]); // pass completed as false
    },
    completeMeeting: (meetingId) => {
      const updatedMeetings = meetings.map((meeting) =>
        meeting.meetingId === meetingId
          ? { ...meeting, completed: true }
          : meeting
      );
      setMeetings(updatedMeetings);
    },
  };
}

//For Single Meeting State management
export function useSingleMeetingState(initialMeeting) {
  const [singleMeeting, setSingleMeeting] = useState(initialMeeting);
  // const {startTranscribing,closeSocket} = useTranscribeMeeting();

  //start a single meeting
  function startMeeting(meetingName, startTime) {
    //meetingON should be true
    setSingleMeeting({
      meetingId: uuidv4(),
      meetingName: meetingName,
      startTime: startTime,
      meetingON: true,
      completed: false,
      textsegmentArr:[],
      keyPhrases:[],
    });

    //start transcribing
    startTranscribing();
  }

  // stop a single meeting
  function stopMeeting() {
    //meetingON be false
    setSingleMeeting((prevState) => {
      return {
        ...prevState,
        meetingON: false,
        endTime: new Date(),
        completed: false,
      };
    });
    closeSocket();
  }

  //Update meeting transcript
  function updateMeeting(newTranscript) {
    setSingleMeeting((prevState) => {
      return {
        ...prevState,
        transcript: newTranscript,
      };
    });
  }

  //Transcribing Portion
  const eventStreamMarshaller = new marshaller.EventStreamMarshaller(
    util_utf8_node.toUtf8,
    util_utf8_node.fromUtf8
  );

  async function startTranscribing() {
    // $('#error').hide(); // hide any existing errors
    //toggleStartStop(true); // disable start and enable stop button

    // check to see if the browser allows mic access
    if (!window.navigator.mediaDevices.getUserMedia) {
      // Use our helper method to show an error on the page
      console.error(
        "We support the latest versions of Chrome, Firefox, Safari, and Edge. Update your browser and try your request again."
      );

      // maintain enabled/distabled state for the start and stop buttons
      //toggleStartStop();
    }

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

  let transcription = "";
  let handleEventStreamMessage = function (messageJson) {
    let results = messageJson.Transcript.Results;
    // console.log(results);
    console.log(`results : ${JSON.stringify(results, null, 2)}`);

    if (results.length > 0) {
      if (results[0].Alternatives.length > 0) {
        let transcript = results[0].Alternatives[0].Transcript;

        // fix encoding for accented characters
        transcript = decodeURIComponent(escape(transcript));

        // document.getElementById("typeText").innerHTML = transcription + transcript + "\n";
        updateMeeting(transcription + transcript + "\n");
        // if this transcript segment is final, add it to the overall transcription
        if (!results[0].IsPartial) {
          transcription += transcript + "\n";
        }
      }
    }
  };
  //Transcription Ends

  return {
    singleMeeting,
    startMeeting: startMeeting,
    stopMeeting: stopMeeting,
    updateMeeting: updateMeeting,
  };
}
