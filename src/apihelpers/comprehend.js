const AWS = require('aws-sdk');

if (!AWS.config.region) {
    console.log(`empty region`);
    AWS.config.update({
      region: 'us-east-2'
    });

  };
const comprehend = new AWS.Comprehend();
export default comprehend ;