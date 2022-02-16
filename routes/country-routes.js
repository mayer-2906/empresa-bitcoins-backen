const { Router } = require('express');
const { check } = require('express-validator')
const { validateFields, validateRol } = require('../middlewares/validate-fields')
const { getCountry, createCountry, updateCountry, deleteCountry} = require('../controllers/country-controller')

const router = Router();


router.get('/get', getCountry);

router.post('/create',
  [    
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
  ],
  createCountry
);

router.put('/update/:id',
  [
    validateRol,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
  ],
   updateCountry
);

router.delete('/delete/:id',[
  validateRol
],deleteCountry)

module.exports = router