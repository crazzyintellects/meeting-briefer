import {config} from '../config/config';
const AWS = require("aws-sdk");


//AWS.config.loadFromPath('../config/config.json');
//var creds = new AWS.FileSystemCredentials('../config/config.json');
//console.log(creds);
if (!AWS.config.region) {
  AWS.config.update({
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}
const comprehend = new AWS.Comprehend();
export default comprehend;
