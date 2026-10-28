const router = require('express').Router()
const c = require('../controllers/persona.controller')

//Recuerda
//las rutas requieren las funcinalidades de los controladores
router.get('/',c.list)
router.get('/:id', c.get)
router.post('/', c.created)
router.put('/',c.update)
router.delete('/', c.remove)

module.exports = router