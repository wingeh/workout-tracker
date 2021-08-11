const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const API = require('./api.js');

router.use('/', homeRoutes);
router.use('/api', API);

module.exports = router;

