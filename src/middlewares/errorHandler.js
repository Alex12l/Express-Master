// Gestor de manejo de errores
exports.notFound = (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
};

exports.errorHandler = (err, req, res, next) => {
  // 1. Si el error trae un status personalizado
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // 2. Error de duplicidad en MySQL
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ message: 'Ya existe un registro con ese valor' });
  }

  // 3. Error de llave foránea: registro en uso (no se puede eliminar)
  if (err.code === 'ER_ROW_IS_REFERENCED_2') {
    return res.status(410).json({ message: 'No se puede eliminar, registro en uso' });
  }

  // 4. Error de llave foránea: el ID indicado no existe
  if (err.code === 'ER_NO_REFERENCED_2') {
    return res.status(400).json({ message: 'No existe el registro indicado' });
  }

  // 5. Error por defecto (Cualquier otro error inesperado)
  console.error(err);
  return res.status(500).json({ message: 'Error interno del servidor' });
};