const queryString = require('querystring');
const express = require('express');
const router = express.Router();

// Google OAuth request parameters.
const BASE_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const CLIENT_ID = '665544571310-iaus1nm279n78gdn6hng18t8f6mboosq.apps.googleusercontent.com';
const RESPONSE_TYPE = 'code';
const SCOPE = 'https://www.googleapis.com/auth/drive.file';
const REDIRECT_URI = 'http://localhost:3000/authenticate';
const ACCESS_TYPE = 'offline'

/*
 * Google OAuth API will redirect here.
 * Sample url:- localhost/authenticate?code=<token>&scope=<access scope>
 * Use the value under 'code' query parameter in order to send further requests,
 * to Google APIs.
 * For ease of use, this token is stored as a cookie named 'gToken'.
 * 
 * User is then redirected to a usable screen.
 */
router.get('/', (req, res, next) => {
  var token = req.query.code;
  
  // Set session cookie - encrypted.
  res.cookie('gToken', token);
  res.redirect('/note');
});

/*
 * Send authentication url to the client.
 * This URL is used as a redirection to google's sign in page,
 * and once completed, will be redirected to /authenticate ^
 */
router.get('/url', (req, res, next) => {
    var query = queryString.stringify({
        client_id: CLIENT_ID,
        response_type: RESPONSE_TYPE, 
        scope: SCOPE,
        redirect_uri: REDIRECT_URI,
        access_type: ACCESS_TYPE
    });

    const authUrl = `${BASE_URL}?${query}`;
    res.send({url: authUrl});
})

module.exports = router;
