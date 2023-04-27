require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
  let { date } = req.params;
<<<<<<< HEAD
  let isValideDate = !!Date.parse(date);
=======
  let isValideDate = Date.parse(date);
>>>>>>> 27c1fbea587b2b07e0c7edd7badfcce3f3d0fb13
  let isTimestampString = /^\d+$/.test(date);
  let unix;
  let utc;

  if (!date) {
    console.log("there is no date");
    unix = Date.now();
    utc = new Date();
    utc = utc.toUTCString();
    res.json({ unix, utc });

  } else if (!isValideDate) {
    if(isTimestampString) {
      console.log("it is a timestamp string");
      unix = parseInt(date);
      utc = new Date(unix);
      utc = utc.toUTCString();
      res.json({ unix, utc });

    } else {
      console.log("there is a date, but the date is not valid");
      res.json({ error: 'Invalide Date' });
    }
  } else {
    console.log("there is a valid date");
    utc = new Date(date);
    utc = utc.toUTCString();
    unix = Date.parse(date);
    res.json({ unix, utc });
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
