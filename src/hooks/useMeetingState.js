import { useState , useEffect } from "react";
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
 
  //const MODEL_SUMMARY_ENDPOINT = 'http://localhost:5000/model/predict';
  const MODEL_SUMMARY_ENDPOINT_PROD = 'https://cors-anywhere.herokuapp.com/http://169.51.206.247:32281/model/predict';

  //Summary API Call
  useEffect(() => {
    console.log("inside use effect - summary api call");
    
      if (singleMeeting.meetingON === false){

        async function fetchData() {
          /*const transcript_data = {
            "text": [
                "nick gordon 's stepfather has revealed in a new interview that he fears for the life of bobbi kristina 's troubled fiance . it has been reported that gordon , 25 , has threatened suicide and has been taking xanax since whitney houston 's daughter was found unconscious in a bathtub in late january . on wednesday , access hollywood spoke exclusively to gordon 's stepfather about his son 's state of mind , asking him if he fears for nick 's life . scroll down for video . speaking out : nick gordon 's father -lrb- left and right -rrb- gave an interview about the 25-year-old fiance of bobbi kristina brown , who reportedly had threatened suicide . access hollywood will air the complete interview thursday . ' i fear ... that if something happens to bobbi kristina , like , if she does n't pull it through , then i will fear for my son 's life , ' the stepfather stated . access hollywood will air the complete interview thursday . speaking to dr phil mcgraw gordon , 25 , said : ` i lost the most legendary singer ever and i 'm scared to lose __krissy__ . i want to let all you guys know i did everything possible in the world to protect them . ' gordon 's impassioned assertion was made during a dramatic intervention staged by dr phil last week and due to air today . weeping and wailing and at times incoherent , gordon had believed that he was to be interviewed by dr phil . gordon had told the eminent psychologist that he wanted to tell his side of the story . he has felt ` vilified ' and ` depicted as a monster ' since january 31 when bobby kristina , 22 , was found face down and unresponsive in the __bath-tub__ at the roswell , georgia home he and bobby kristina shared . breakdown : with his mother , michelle , by his side nick gordon struggles to stay coherent . troubling preview : a trailer for the interview of bobbi kristina brown 's boyfriend nick gordon by dr phil mcgraw was released sunday night . swinging from crying to flying into a rage , the disturbing 30 second video shows a very troubled young man in a lot of pain as he is questioned by dr phil . but on learning of gordon 's emotional , mental and physical state dr phil could not ` in good conscience ' go on with the interview . according to gordon 's mother , michelle , who was by her son 's side during the highly emotional intervention , ` nicholas is at a breaking point . he can not bear not being without __krissy__ , by her side . he 's dealing with it by drinking . i 've begged him to stop . ' dr phil told gordon , who admitted to having taken xanax and to have drunk heavily prior to the meeting : ` nick , you 're out of control . you 've threatened suicide . you deserved to get some help because if you do n't , you know you 're going to wind up dead . ' he added : ` you 've got to get yourself cleaned up . you got to man up and straighten up . ' yesterday dailymail.com revealed that , barely 12 hours before the dramatic encounter with dr phil , gordon was so drunk and high he was unable to walk . the disturbing scenes captured on video showed the true extent of a deterioration described by dr phil as ` exponential . ' in the show , due to broadcast wednesday , a weeping and wailing gordon admitted that he has twice tried to kill himself and confessed : ` i 'm so sorry for everything . ' asked if he still intended to kill himself he said : ` if anything happens to __krissi__ i will . ' he said : ` my pain is horrible . my heart hurts . i have panic attacks . ' in recent weeks gordon has twice overdosed on a mixture of xanax , alcohol and prescription sleeping pills . gordon had agreed to meet with dr phil believing that he was there to be interviewed . according to dr phil : ` he felt like he was being vilified and presented as some sort of monster . ' instead , on learning of gordon 's rapidly deteriorating mental , emotional and physical state , the eminent psychologist staged an intervention and he is now in rehab . dr phil stated : ' i do n't think he has any chance of turning this round . left to his own devices he will be dead within the week . ' gordon 's mother , michelle , was by her son 's side as he __alternated__ between compliant and aggressive -- at one point threatening to attack camera men as they filmed . she described her son as ` at breaking point . ' she said : ` he can not take too much more of not being able to see __kriss__ . he blames himself . he 's torn up and carrying guilt . ` he 's dealing with it by drinking . i 've begged him to stop . i 've tried to help him but he ca n't let go of the guilt . ' leaning towards gordon 's mother , dr phil said : ` you and i have one mission with one possible outcome and that 's for him to agree to go to rehab to deal with his depression , his guilt ... and to get clean and sober . ' he added : ` his life absolutely hangs in the balance . ' questions still rage regarding just what happened in the early hours of january 31st that led to bobbi kristina , 22 , ending up face down in her tub . just two days ago bobbi kristina 's aunt , __leolah__ brown , made a series of explosive facebook posts in which she alleged that the family had ` strong __evidene__ of foul play ' relating to gordon 's role in events . she posted : ` nick gordon is very disrespectful and inconsiderate ! especially to my family . moreover , he has done things to my niece that i never thought he had in him to do ! ' __leolah__ made her claims in response to being invited onto dr phil 's show . tough to watch : the young man sobs and shakes at times through the trailer . in her message she wrote : ` with all due respect , nick gordon is under investigation for the attempted murder of my niece ... . we have strong evidence of foul play . ' marks were found on her face and arms , marks that gordon has explained as the result of cpr which he administered to her for 15 minutes before emergency services arrived . and speaking to dr phil , gordon insisted : ' i did everything possible in the world to protect them -lsb- whitney and bobbi kristina -rsb- . ' railing against the decision by bobbi 's father , bobby brown , to ban him from his fiancée 's bedside at atlanta 's emory hospital , gordon said : ` my name will be the first she calls . ' according to his mother , michelle , gordon can not forgive himself for his ` failure ' to revive bobbi kristina . his guilt is compounded by the eerily similar situation in which he found himself almost exactly three years earlier . ' i hate bobby brown ! ' his tears quickly turn to anger when he brings up his girlfriend 's father bobby brown , who has blocked him from seeing the 22-year-old in the hospital . ` are you drinking ? ' the emotional man 's anger only increases as dr. phil asks about nick 's sobriety . refuses to go : the 25-year-old aspiring rapper storms out when told he needs help . resigned : ultimately , gordon concedes that he needs help and leaves for a rehab facility . then , on 11 february 2012 , it was gordon who tried to resuscitate whitney when she was found unresponsive in her __bath-tub__ just hours before she was due to attend a grammy awards party . speaking to dr phil , michelle said : ` nicholas just continually expresses how much he has failed whitney . ` he administered cpr -lsb- to whitney -rsb- and he called me when he was standing over her body . he could n't understand why he could n't revive her . he said , `` mommy why ? i could n't get the air into her lungs . '' gordon has now entered a rehab facility in atlanta . meanwhile his fiancée continues to fight for her life in a medically-induced coma . it is now six weeks since bobbi kristina -- __krissi__ as she was known to friends - was found face down and unresponsive in the __bath-tub__ of the home she shared with gordon in roswell , georgia . unlike whitney 's death that was ruled accidental , police are treating bobbi kristina 's near drowning and injuries allegedly sustained by the 22-year-old as a criminal investigation . while bobbi kristina fights for her life a troubling picture of her relationship with nick , of drug use and domestic turbulence in the weeks leading up to the incident , has emerged . in an interview with the sun a friend of the couple , steven __stepho__ , claimed they were using various drugs daily including heroin , xanax , pot and heroin substitute __roxicodone__ . sounding eerily similar to bobbi 's mother and father 's __drug-dependent__ relationship , the friend said the pair used whatever they could get their hands on . ` bobbi and nick would spend a lot on drugs every day , it just depended on how much money they had . it was n't unusual for them to spend $ 1,000 a day on drugs . ` there were times when it got really bad - they would be completely passed out for hours , just lying there on the bed . there were times when she would be so knocked out she would burn herself with a cigarette and not even notice . she was always covered in cigarette burns . ' their relationship was also very volatile . ` when whitney died nick was left with nothing , so he knew he had to control __krissi__ to get access to the money . she 'd do whatever he told her . ` he was very manipulative and would even use the drugs to control her . they would argue a lot and there were times when he would be violent with her and push her around . ' according to __stepho__ : ` but __krissi__ really loved him because he was there to fill the gap left by her mother . she was not close to her father and did not have anyone else close to her . nick knew this and took advantage of it . ' troubled relationship : a friend of the couple , steven __stepho__ , claimed the pair were using various drugs daily including heroin , xanax , pot and heroin substitute __roxicodone__ ."
            ]
        }*/

        const transcript_data = {
          "text": [
              singleMeeting.transcript
          ]
      }
           
       const settings = {
            method: 'POST',
           // mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
                 keepalive: true
            },
            body: JSON.stringify(transcript_data)
        };
        try {
            const fetchResponse = await fetch(MODEL_SUMMARY_ENDPOINT_PROD, settings);
            const data = await fetchResponse.json();
            const summaryText = (data != null && data['summary_text'].length > 0) ? data['summary_text'][0] : "";
            setSingleMeeting((prevState) => {
              return {
                ...prevState,
                summary  :{
                    text : summaryText
                }
              };
            });
           
            
        } catch (e) {
            return e;
        }  
        }
    
        fetchData();


      }
        
    
    // eslint-disable-next-line
  }, [
    singleMeeting.meetingON,
  ]);


  //start a single meeting
  function startMeeting(meetingName, startTime) {
    //meetingON should be true
    setSingleMeeting({
      meetingId: uuidv4(),
      meetingName: meetingName,
      startTime: startTime,
      meetingON: true,
      completed: false,
      summary:[]
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
