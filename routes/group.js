const express = require('express')
const { ensureAuth } = require('../middleware/auth')
const router = express.Router();
const groupController = require('../controllers/group.js')

//@route /group/
router.get('/:name',ensureAuth,groupController.getGroup)

module.exports=router