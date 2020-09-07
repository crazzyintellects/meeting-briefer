const AWS = require("aws-sdk");

//AWS.config.loadFromPath('../config/config.json');
//var creds = new AWS.FileSystemCredentials('../config/config.json');
//console.log(creds);
if (!AWS.config.region) {
  AWS.config.update({
    region: "us-east-2",
    credentials: {
      accessKeyId: "",
      secretAccessKey: "",
    },
  });
}
const comprehend = new AWS.Comprehend();
export default comprehend;
