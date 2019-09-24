const readline = require("readline");
const { google } = require("googleapis");
const express = require("express");
const router = express.Router();

/* Send note page. */
router.get("/", (req, res, next) => {
  res.send('<script>window.location.href = "note.html"</script>');
});

/* Upload note. */
router.post("/", (req, res, next) => {
  var token = req.cookies.token;

  var title = req.body.title;
  var content = req.body.content;

  const oAuth2Client = getOAuth3Client(token);
  const drive = google.drive({ version: "v3", auth: oAuth2Client });

  drive.files.list(
    {
      pageSize: 10,
      fields: "nextPageToken, files(id, name)"
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const files = res.data.files;
      if (files.length) {
        console.log("Files:");
        files.map(file => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log("No files found.");
      }
    }
  );
});

// OAuth client.
let getOAuth3Client = accessToken => {
  const oAuth2Client = new google.auth.OAuth2(
    "665544571310-iaus1nm279n78gdn6hng18t8f6mboosq.apps.googleusercontent.com",
    "Ro8VmtbfLrKl-JgLK7PHTanD",
    "http://localhost:3000/authenticate"
  );

  oAuth2Client.setCredentials({
    access_token: accessToken,
    expiry_date: 3600
  });

  return oAuth2Client;
};

module.exports = router;
