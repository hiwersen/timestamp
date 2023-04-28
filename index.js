require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/**
 * Enable CORS (Cross-origin resource sharing) middleware
 * so that your API is remotely testable by FreeCodeCamp
 * @see {@link https://www.npmjs.com/package/cors}
 */
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

/**
 * Serve static files (CSS, JavaScript, images) from the 'public' directory
 */
app.use(express.static(__dirname + '/public'));

/**
 * Handle the root route and serves the index.html file.
 */
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/**
 * Handle the API route with an optional date parameter.
 * @param {string} [date] - An optional date string or Unix timestamp.
 */
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  // Parse the date parameter from a string representing a date to a Unix timestamp {Number}
  // @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date}
  // @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#date_time_string_format}
  let parsedDate = Date.parse(date);

  // Declare the unix and utc variables, which will be the keys for the JSON object returned in response to server requestes
  let unix; 
  let utc;

  // Check if the optional date value was passed in the route parameter
  if (!date) {
    // Initialize unix and utc values as current time
    unix = Date.now();
    utc = new Date().toUTCString();
    res.json({ unix, utc });

    // Check if the date represents a valid format
  } else if (!parsedDate) { 

    // Check if it is a Unix timestamp {String} 
    let isTimestampString = /^\d+$/.test(date);
    if(isTimestampString) {
      // Initialize unix and utc values as input date
      unix = parseInt(date);
      utc = new Date(unix).toUTCString();
      res.json({ unix, utc });

    } else {
      res.json({ error: 'Invalid Date' });
    }

  }  else {
    // Initialize unix and utc values as input date
    unix = parsedDate;
    utc = new Date(unix).toUTCString();
    res.json({ unix, utc });
  }

});

/**
 * Starts the server and logs the listening port.
 */
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
