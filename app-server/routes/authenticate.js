const axios = require("axios");
const queryString = require("querystring");
const FormData = require("form-data");
const request = require("request");
const express = require("express");

const router = express.Router();

// Google OAuth authorization request parameters.
const BASE_URL_FOR_CODE = "https://accounts.google.com/o/oauth2/v2/auth";
const CLIENT_ID =
  "665544571310-iaus1nm279n78gdn6hng18t8f6mboosq.apps.googleusercontent.com";
const CLIENT_SECRET = "Ro8VmtbfLrKl-JgLK7PHTanD";
const RESPONSE_TYPE = "code";
const SCOPE = "https://www.googleapis.com/auth/drive.file";
const REDIRECT_URI = "http://localhost:3000/authenticate";
const ACCESS_TYPE = "offline";

// Google OAuth bearer token request parameters.
const BASE_URL_FOR_TOKEN = "https://www.googleapis.com/oauth2/v4/token";
const GRANT_TYPE = "authorization_code";

/*
 * Google OAuth API will redirect here.
 * Sample url:- localhost/authenticate?code=<token>&scope=<access scope>
 * Use the value under 'code' query parameter in order to send further requests,
 * to Google APIs.
 * For ease of use, this token is stored as a cookie named 'gToken'.
 *
 * User is then redirected to a usable screen.
 */
router.get("/", (req, res, next) => {
  var authorizationCode = req.query.code;

  // Retrieve bearer token from google.
  // This request has to be a POST/x-www-form-urlencoded.
  fetchToken(authorizationCode)
    .then(token => {
      console.log(token);
      var access_token = token.access_token;
      
      // Set cookies for necessary routes.
      res.cookie('token', access_token, {path: '/upload'});
      res.cookie('token', access_token, {path: '/authenticate'});
      res.redirect('/note');
    })
    .catch(reject => {
      res.redirect('/auth-error')
    });
});


/*
 * Send authentication url to the client.
 * This URL is used as a redirection to google's sign in page,
 * and once completed, will be redirected to /authenticate ^
 */
router.get("/url", (req, res, next) => {
  var query = queryString.stringify({
    client_id: CLIENT_ID,
    response_type: RESPONSE_TYPE,
    scope: SCOPE,
    redirect_uri: REDIRECT_URI,
    access_type: ACCESS_TYPE
  });

  const authUrl = `${BASE_URL_FOR_CODE}?${query}`;
  res.send({ url: authUrl });
});

/*
 * Promise for returning token from Google.
 */
let fetchToken = authorizationCode => {
  return new Promise((resolve, reject) => {
    var body = {
      code: authorizationCode,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: GRANT_TYPE,
      redirect_uri: REDIRECT_URI
    };
    var headers = { "Content-Type": "application/x-www-form-urlencoded" };

    request(
      {
        uri: BASE_URL_FOR_TOKEN,
        method: "POST",
        form: {
          code: authorizationCode,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: GRANT_TYPE,
          redirect_uri: REDIRECT_URI
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          var token = JSON.parse(body);
          resolve(token);
        }
      }
    );
  });
};

module.exports = router;
