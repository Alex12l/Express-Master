//Gestor de manejo de errores
exports.notFound = (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada'})
}

exports.errorHandler = (err, req, res, next) => {
  //Si existe un error ... detenemos y retornamos un mensaje de  formato JSON
  if (err.status) {return res.status(err.status).json({message: err.message})}
}

//mismo valor , mismo tipo ===
//Error de duplicidad
if(err.code === 'ER_DRUP_ENTRY'){
  return res.status(409).json({message: 'Ya existe un registro con ese valor'})
}

if(err.code === 'ER_ROW_IS_REFERENCED_2'){
  return res.status(410).json({message: 'No se puede eliminar, registro en uso'})

}

//Error de id no existe
if (err.code === 'ER_NO_REFERENCED_2'){
  return res.status(400).json({message: 'No existe el registro indicado'})
}

//test
console.error(err)