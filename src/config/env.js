//VALIDACION #01 - PARAMETROS DE .env
//validacion de variables de configuracion
const required = ['DB_HOST','DB_USER','DB_NAME','JWT_SECRET']

//verificamos si una de las claves nop existe o esta vacia
const missing = required.filter((key) => !process.env[key])

//Si no encontre una de las claves
if(missing.length){
  console.error(`faltan variables de entorno: ${missing.join(',')}`)
  process.exit(1)
}

//VALIDACION #02 - JWT SEGURO
//para encriptar la comunicacion, JWT requiere 32 caracteres
const secret = process.env.JWT_SECRET

if(secret.length < 32){
  console.error('JSON_SECRET requiere una clave de 32 caracteres')
  process.exit(1)
}