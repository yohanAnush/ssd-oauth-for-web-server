const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile('../public/index.html');
});

/* Send other pages. */
router.get('/note', (req, res, next) => {
  res.send('<script>window.location.href = "note.html"</script>');
});

/* Get unathenticated error page */
router.get('/auth-error', (req, res, next) => {
  res.send('<script>window.location.href = "auth-error.html"</script>');
});

module.exports = router;
