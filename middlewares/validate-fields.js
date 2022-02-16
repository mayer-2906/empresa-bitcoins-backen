const { response } = require('express')
const { validationResult } = require('express-validator')
const User = require('../models/user')


const validateFields = (req, resp = response, next) => {

  const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return resp.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

const validateRol = (req, resp=response, next) => {
  const rol = req.header('rol')
  if(rol!=="ADMIN_ROL"){
    return resp.status(400).json({
      ok:false,
      message: "You do not have administrator permissions"
    })
  };
  next();
}

module.exports = {
  validateFields,
  validateRol
}