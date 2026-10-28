const jwt = require('jsonwebtoken')
const db = require('../config/db')

//No se ecporta porque colabora con verifytoken
//error 1: no autorizado
//error 2: expirado
const unauthorized = (res, msg = 'No autorizado') => {
  res.status(401).json({message: msg})
}

//token = firma, permiso, dato encriptado
//funciones definidas como asincronas llevan promesas
exports.verifyToken = async (req, res,next) =>{
  //Cookies = arcdhivos que guardan la configuracion
  //nota: en tu navegador INESPECCIONAR -> RED
  const token = req.cookies.token

  //SI no existe un token, no puedes acceder a la App
  if(!token){return unauthorized(res)}

  //Existe el token
  // JWT = 3 partes
  let payload
  //Manejador de excepcones
  try{
    payload = jwt.verify(token, process.env.JWT_SECRET,{algorithms: ['HS256']})
  }catch(e){
    return unauthorized(res, 'Sesion ya invalida o expirado')
  }
  //Se consulta a la BD para respetar los usuarios que estan desactivados
  const user = await db("usuarios").where({id : payload.id})
  .select('id','nombre_usuario','nivel_acceso','estado').first()

  if(!user || !user.estado){
    return unauthorized(res,'Usuario inactivo o inexistente')
  }
  req.user = user; 
  //¿Siguente? - FLUJO
  next()
}

exports.requireLevel = (...niveles) =>(req,res,next)=>{
  niveles.includes(req.user.nivel_acceso) ? next() : res.status(403).json({message: 'No tienes permiso para esta accion'})
}