require("dotenv").config()
const express = require('express');
const moment = require('moment');
const app = express();

// Middleware to handle JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next();
});

app.get('/api', (req, res) => {
  try {
    // Get query parameters slack_name and track
    const slackName = req.query.slack_name || 'example_name';
    const track = req.query.track || 'backend';

    // Get the current day of the week
    const currentDay = moment().format('dddd');

    // Get the current UTC time with validation of +/-2 minutes
    const currentUtcTime = moment()
      .utc()
      .subtract(2, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ss[Z]');

    // Define GitHub URLs
    const githubFileUrl = `https://github.com/rhouzmerii/HNG-BACKEND/blob/main/${track}/server.js`;
    const githubRepoUrl = `https://github.com/rhouzmerii/HNG-BACKEND${track}`;

    // Create the JSON response object
    const response = {
      slack_name: slackName,
      current_day: currentDay,
      utc_time: currentUtcTime,
      track: track,
      github_file_url: githubFileUrl,
      github_repo_url: githubRepoUrl,
      status_code: 200,
    };

    res.json(response);
  } catch (error) {
    // Handle unexpected errors
    console.error('It is giving :', error, 'vibes');
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(process.env.PORT, () => {
    console.log("Connect to dbListening port", process.env.PORT)
  })

process.env