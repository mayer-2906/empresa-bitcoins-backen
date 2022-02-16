const { Router } = require('express');
const { check } = require('express-validator')
const { validateFields, validateRol } = require('../middlewares/validate-fields')
const { getUsers, getUser, createUser, updateUser, addCoin, deleteUser} = require('../controllers/user-controller')

const router = Router();


router.get('/get', getUsers);

router.get('/getUser/:id', getUser)

router.post('/create',
  [    
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validateFields
  ],
  createUser
);

router.put('/update/:id',
  [
    validateRol,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
  ],
   updateUser
);

router.put('/addCoin/:id',[],addCoin);

router.delete('/delete/:id',[
  validateRol
],deleteUser)

module.exports = router