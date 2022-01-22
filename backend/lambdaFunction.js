/*
 *@desc end point event handler used to return a short link url. 
 *@param {string} queryStringParam longUrl
*/
exports.handler = async (event) => {
  let response;
  let url = 
    {
      "longUrl": event['queryStringParameters']['longUrl']
    };

  if(url == null) {
    response = {
      statusCode: 400,
      body: "invalid url",
    };
    
    return response;
  }

  try {
      let urlObject = shortenUrl(url.longUrl)
      response = {
        statusCode: 200,
        body: JSON.stringify(urlObject),
      };
  } catch(error) {
    response = {
      statusCode: error.statusCode,
      body: error.statusCode + ": " + error.message
    };
  }
  return response;
};

/*
 *@desc Return a random string to be used as a url
 *@param {string} url
*/
const shortenUrl = url => {
  let shortUrl = 'www.' + (Math.random() + 1).toString(36).substring(7) + '.com';
  
  return {'longUrl': url, 'shortUrl': shortUrl};
};
