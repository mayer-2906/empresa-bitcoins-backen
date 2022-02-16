const { Router } = require('express');
const { check } = require('express-validator')
const { validateFields, validateRol} = require('../middlewares/validate-fields')
const { getCoins, createCoin, updateCoin, deleteCoin} = require('../controllers/coin-controller')

const router = Router();


router.get('/get', getCoins);

router.post('/create',
  [    
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('symbol', 'El simbolo es obligatorio').not().isEmpty(),
    check('value', 'El valor es obligatorio').not().isEmpty(),
    validateFields
  ],
  createCoin
);

router.put('/update/:id',
  [
    validateRol,
    check('value', 'El valor es obligatorio').not().isEmpty(),
    validateFields
  ],
   updateCoin
);

router.delete('/delete/:id',[
  validateRol
],deleteCoin)

module.exports = router