const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    const { username, email, password, confirmPassword } = body;

    if (password !== confirmPassword) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Passwords do not match" }),
        };
    }

    const params = {
        Bucket: 'signup-data-bucket',  // replace with your bucket name
        Key: `${username}.json`,
        Body: JSON.stringify(body),
        ContentType: 'application/json'
    };

    try {
        await s3.putObject(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Sign Up Successful" }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error storing data" }),
        };
    }
};
