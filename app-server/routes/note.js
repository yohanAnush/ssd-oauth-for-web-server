const express = require('express');
const router = express.Router();

/* Send note page. */
router.get('/', (req, res, next) => {
  res.send('<script>window.location.href = "note.html"</script>');
});


module.exports = router;
