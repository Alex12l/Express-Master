const rateLimit = require('express-rate-limit')

//Estas funciones controlaran la cantidad de intentos y el trafico en nuestra aplicacion
// "en localhost siempe funciona"
// "con 1 usuario nunca hubo problemas"

exports.loginLimiter = rateLimit({

})
//flujo de solicitudes (usuarios que se conectan a la app)
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiados intentos, verifique en unos minutos'}
})

//Flujo de solicitudes (usuarios que se conectan a la app
exports.apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiadas solicitudes, intente en un momento'}
})