
const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const eventRouter = require('./event');
const tagRouter = require('./tag');
const authTokenMiddleware = require('../services/authToken');



router.all('/', async function(_, res) {
  res.send("Coucou ça marche :D");
});

router.use('/user', userRouter);
router.use('/event', authTokenMiddleware, eventRouter);
router.use('/tag', authTokenMiddleware, tagRouter);


module.exports = router;