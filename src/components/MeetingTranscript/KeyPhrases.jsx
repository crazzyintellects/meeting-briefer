import React, { useState, useEffect , useContext, useRef} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {comprehend} from "../../apihelpers/comprehend";
import {SingleMeetingContext} from "../../context/singleMeeting.context.js";
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
/*const hightlightCss={
    backgroundColor: `rgb(164, 180, 148)`, textDecorationLine: `underline`,
}*/
/*const getPhrases =async (transcript)=>{
    const resp =await processPhrasesOfTranscript(transcript);
    console.log("AWIAT KEY PHRASES",resp);

    }*/

const KeyPhrases = () => {

    const { singleMeeting } = useContext(SingleMeetingContext);
    const classes = useStyles();
    const ref = useRef();
    const initialState = {
        originalTranscript: singleMeeting.transcript,
        intervalDuration: 30000,
        sentiment: "NEUTRAL",
        //processedTrancript: meeting.transcript,
        meetingON: singleMeeting.meetingON,
        keyPhrases:singleMeeting.keyPhrases,
        textsegmentArr: singleMeeting.textsegmentArr
    };

    // Set up initial Transcript
    // eslint-disable-next-line
    const [meetingTranscript, setMeetingTranscript] = useState(initialState);
   /* const clearState = () => {
        setMeetingTranscript({ ...initialState });
    };*/
    //Update the original transcript
    useEffect(() => {
        console.log("inside use effect KeyPhrases");


        if (singleMeeting.transcript !== meetingTranscript.originalTranscript) {

            if (singleMeeting.meetingON === false)
            {
                if (singleMeeting.transcript  === undefined || singleMeeting.transcript  === "") return;

                const params = {
                    LanguageCode: "en" /* required - other option is es */,
                    Text: singleMeeting.transcript /* required - string that will parse for detecting entities */,
                };
                comprehend.detectKeyPhrases(params,(err, data)=> {
                    setMeetingTranscript({'keyPhrases': data.KeyPhrases,'textsegmentArr':getHighlightedText(singleMeeting.transcript,data.KeyPhrases)})  ;
                });

                    /*      setMeetingTranscript({'keyPhrases': data.Text})
                      } )*/

            }
        }
      /*  return ()=>{
            if (singleMeeting.meetingON === true && singleMeeting.transcript !== meetingTranscript.originalTranscript) {
                setMeetingTranscript(initialState);
            }
        }*/
        // eslint-disable-next-line
    }, [
        // meeting.transcript,
        // meetingTranscript.originalTranscript,
        singleMeeting.meetingON,meetingTranscript.keyPhrases
    ]);

    /*const getHighlightedText =(text, highlight)=> {
        // Split on highlight term and include term into parts, ignore case
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span> { parts.map((part, i) =>
            <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
        } </span>;
    }*/
    const renderedKeyPhrases=meetingTranscript.keyPhrases.map((phrase,idx)=>{
        return <span style={{textDecoration:'underLine'}} key={idx}>{` ${phrase.Text},`}</span>;
    })
    const renderHighligtedTest=meetingTranscript.textsegmentArr.map((textsegment,idx)=> {
            return (
                <span key={idx}>
                {
                    Array.from(textsegment.keys()).map((key, idx1) => {
                        return (<span key={idx1} className={key}>{textsegment.get(key)}</span>)
                    })
                }

            </span>
            )
        }





    )
    return (
    <>
        <Typography
            variant="h6"
            component="h6"
            gutterBottom
            className={classes.title}
        >
            {singleMeeting.meetingName===''? 'Key Noun Phrases': `${singleMeeting.meetingName}'s Key Phrases` }
        </Typography>

        <div className={`${classes.root} `}>
            <Typography
                variant="body1"
                component="p"
                gutterBottom
                style={{ fontWeight: 600 }}
                id="phraseText"
            ><span id="renderedTranscriptWithPhrase" ref={ref}>{renderHighligtedTest}</span>
                <br/>
                <span id="renderedPhrases">{renderedKeyPhrases.length<1?'':'Phrase List : '}{renderedKeyPhrases}</span>
            </Typography>
        </div>
    </>
);
};
const getHighlightedText=(text,keyPhrases)=>{
    let beginIdx=0;
    const textsegmentArr=[];
    keyPhrases.forEach((phrase)=>{
        const highlightMap = new Map();
        highlightMap.set('regular',text.slice(beginIdx,phrase.BeginOffset));
        highlightMap.set('highlight',text.slice(phrase.BeginOffset,phrase.EndOffset));
        beginIdx=phrase.EndOffset;
        textsegmentArr.push(highlightMap)
        //

    });
    return textsegmentArr;
}

export default KeyPhrases;
