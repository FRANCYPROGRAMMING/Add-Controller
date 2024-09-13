const express = require('express');
const { getAll, getOneById, create, updateById, deleteById } = require('./controllers');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOneById);
router.post('/', create);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

module.exports = router;