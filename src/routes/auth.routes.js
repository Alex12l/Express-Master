const router = require('express').Router()
const c = require('../controllers/auth.controller')
const {verifyToken} = require('../middlewares/auth')
const {loginLimiter} = require('../middlewares/rateLimit')

//¿En un login que verbo debemos usar?
//POST (enviamos un paquete de datos)
router.post('/login')