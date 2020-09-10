import { config } from "../config/config";
const AWS = require("aws-sdk");

if (!AWS.config.region) {
  AWS.config.update({
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}
export const comprehend = new AWS.Comprehend();

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
// Comprehend api call method
export const processTranscript = async (meetingTranscript) => {
  //set up params
  if (meetingTranscript === undefined || meetingTranscript === "") return;

  const params = {
    LanguageCode: "en" /* required - other option is es */,
    Text: meetingTranscript /* required - string that will parse for detecting entities */,
  };

  //call entities
  processEntities(params);
  //processKeyPhrases(params);

  //call keyphrase
  // processKeyPhrases(params);

  //call sentiment
  //processSentiment(params);
};
export const processPhrasesOfTranscript = async (meetingTranscript, fn) => {
  //set up params
  if (meetingTranscript === undefined || meetingTranscript === "") return;

  const params = {
    LanguageCode: "en" /* required - other option is es */,
    Text: meetingTranscript /* required - string that will parse for detecting entities */,
  };
comprehend.detectKeyPhrases(params,(err, data)=> {
    return  data.KeyPhrases;
  });

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
        let endIndex = 0;
        renderTranscript = "";

        for (let entity of result) {
          //console.log(entity);
          let beforeString = params.Text.slice(startIndex, entity.BeginOffset);

          renderTranscript += `${beforeString} <span style='background-color:${entityTypeToColorMap.get(
            entity.Type
          )}'>${params.Text.slice(
            entity.BeginOffset,
            entity.EndOffset
          )}</span> `;
          // console.log(processedString);
          startIndex = entity.EndOffset + 1;
          endIndex = entity.EndOffset;
        }

        //last part of the string to be appended
        if (endIndex !== 0 && endIndex !== params.Text.length - 1) {
          let afterString = params.Text.slice(endIndex + 1, params.Text.length);
          renderTranscript += afterString;
        }

        if (renderTranscript !== "")
          document.getElementById("typeText").innerHTML = renderTranscript;
      }
    }
  });
};

/* const processKeyPhrases = async (params) => {
   comprehend.detectKeyPhrases(params,(err, data)=>{
     return data;

   })
 };*/
  //const processSentiment = (params) => {};