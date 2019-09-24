### Simple Note Taking App With Google Drive.
This app saves simply notes as files, to google drive. It uses OAuth2 with Google's own googleapi module. This is a NodeJS project.

### How to Build.
Check if you are in app-server directory. If not, move into it,<br>
`cd app-server`

Install NPM modules.<br>
`npm install`

Finally, start the node server with,<br>
`npm start`

### How to Use.
Node server will now be listening on port 3000. Visit `http://localhost:3000` on your browser and click on Login button. This will take you to Google Login Page. Once you have logged in successfully, request will be redirected to `http://localhost:3000/authenticate`, which will then fetch an access token and redirect you to `http://localhost:3000/note`. This is where you can add a note and post it to Google Drive.

##### Disclaimer.
Done as a part of an assignment for university. This may contain hardcoded credentials which was necessary to make the submission runnable easily.