const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-2'});

exports.handler = async (event, context, callback) => {
    if(Object.keys(event).length !== 5) {
        return {statusCode: 400, body: 'invalid parameters'};
    }

    const requestId = context.awsRequestId;

    await createObject(event, requestId).then(() => {
        callback(null, {
            statusCode: 201,
            body: 'The movie '+event.title+' has been added!',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        });
    }).catch((err) => {
        console.log(err);
    });
};

function createObject(event, requestId) {
    const params = {
        TableName: 'movieList',
        Item: {
            'movieId' : requestId,
            'title' : event.title,
            'year': event.year,
            'format': event.format,
            'length': event.length,
            'rating': event.rating
        }
    };
    return ddb.put(params).promise();
}
