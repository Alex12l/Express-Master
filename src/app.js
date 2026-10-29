require("dotenv").config()

//Modulos de aplicacion
const path = require('path')//Gestion de rutas
const express = require('express') //Framework Backend
const helmet = require('helmet') //Seguridad - JWT (Json Web Token)
const cookieParser = require('cookie-parser') //Cookie (Archivo guarda configuracion - navegador)


//Gestion de rutas
const routes = require('./routes')

//Otras configuraciones
const {apiLimiter} = require('./middlewares/rateLimit')
const {notFound, errorHandler } = require('./middlewares/errorHandler')

const app = express() //Inicializar Framework
const isProd = process.env.NODE_ENV === 'production' //Evalua el tiopo de emtorno

//Proxy = mascaras de navegacion (Ngnix)
if(process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY))

  //Configuracion de seguridad
  //Cross-Site Scripting (XSS)
  app.use(helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives:{
        'defaultSrc': ["'self'"],
        'scriptSrc': ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@6.0.0-alpha.1/dist/js/"],
        'styleSrc': ["'self'","https://cdn.jsdelivr.net/npm/bootstrap@6.0.0-alpha.1/dist/css/"],
        'connectSrc': ["'self'", "https://cdn.jsdelivr.net"],
        'upgrade-insecure-requests': isProd ? []:null
      }
    }
  }))

  //Configurando express...
  app.use(express.json({limit: '10kb'}))  //Tamaño maximo del JSON
  app.use(cookieParser()) //Leer cookie (configuracion)
  app.use(express.static(path.join(__dirname, '..' , 'public')))  //Ruta fronted


//Cnfiguracion de ruta
  app.use('/api', apiLimiter, routes)

  //ruta raiz '/' (dev) localhost:3000, (prod) miapp.com
  app.get('/',(req, res) => res.redirect('/index.html'))

  //Manejamos rutas inexistentes
  app.use('/api', notFound)
  app.use(errorHandler)
  module.exports = app;