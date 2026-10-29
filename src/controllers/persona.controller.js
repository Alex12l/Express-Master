const db = require('../config/db')
const { httpError, requireFields, isEmail } = require('../utils')

//lista de campos obligatorios
//omitir los campos que son NULL
const camposRequeridos = ['apellidos', 'nombres', 'telefono', 'email', 'direccion']

//Evaluamos que el contenido de cada campo sea de tipo cadena
//(1) arreglo > (2)filter > (3)map > (4) operador ternario
//filter() : retorna un arreglo que cumpla una condicion
//map()   : recorre toda la estructura / objeto
const pick = (body) => {
  return Object.fromEntries(
    camposRequeridos.filter( (key) => key in body).map(
      (key) => [key, typeof body[key] === 'string' ? body[key].trim() : body[key]]
    )
  )
}

//Listar
exports.list = async (req, res) => {
  res.json(
    await db("personas")
    .select("id", ...camposRequeridos)
    .orderBy("apellidos")
  )
} 

//Buscar
exports.get = async (req, res) => {
  const row = await db("personas").where({id: req.params.id}).first()
  if(!row) throw httpError(404, 'Persona no encontrada')
    res.json(row)
}

//registrar
exports.created = async (req, res) => {
  requireFields(req.body, ["apellidos", "nombres"])
  //Solo es posible validar el email si es obligtatorio
  if (!isEmail(req.body.email)){
    throw httpError(400, "Email incorrecto")
  }

  //Insertar (validando que solo envies cadenas)
 // const [id] = await db("personas").insert(pick(req.body))
  const [id] = await db("personas").insert(req.body)
  res.status(201).json({id, message: 'persona registrada'})
}


//Actualizar
exports.update = async (req, res) => {
  requireFields(req.body, ["apellidos","nombres","email"])

  //Email escrito correctamente
  if(!isEmail(req.body.email)){
    throw httpError(400, 'Email incorrecto')
  }

  //Actualizando
  const num = await db("personas")
  .where({id: req.params.id})
  .update(req.body)

  if(!num) throw httpError(404,"Persona no encontrada")
    res.json({message: "Persona Actualizada"})
}

//Eliminar
exports.remove = async (req, res) => {
  const num = await db("personas")
  .where({id:req.params.id})
  .del()

  if(!num) throw httpError(404, "Persona no encontrada")
    res.json({message: "Persona Eliminada"})
}
