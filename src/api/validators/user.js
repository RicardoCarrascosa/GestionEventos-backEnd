const { body } = require('express-validator')

const validateUser = (method) => {
  switch (method) {
    case 'registerUser': {
      return [
        body('name').exists().withMessage('User Name needed').escape(),
        body('email')
          .exists()
          .withMessage('Email needed')
          .isEmail()
          .withMessage('Invalid email address')
          .normalizeEmail()
          .escape(),
        body('password')
          .exists()
          .withMessage('Password needed')
          .isLength({ min: 8 })
          .withMessage('Email needs minimum 8 character')
          .escape(),
        body('rol').optional(),
        body('birthday')
          .optional()
          .isDate()
          .withMessage('Needs to be a date  '),
        body('profileImage').optional()
      ]
    }
    case 'loginUser': {
      return [
        body('email')
          .exists()
          .withMessage('Email needed')
          .isEmail()
          .withMessage('Invalid email address')
          .normalizeEmail()
          .escape(),
        body('password').exists().withMessage('Password needed').escape()
      ]
    }
    case 'updateUser': {
      return [
        body('name').withMessage('User Name needed').escape(),
        body('email')
          .isEmail()
          .withMessage('Invalid email address')
          .normalizeEmail()
          .escape(),
        body('password')
          .isLength({ min: 8 })
          .withMessage('Password needs minimum 8 character')
          .matches(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/)
          .withMessage(
            'Password must contain only alphanumeric and special characters'
          )
          .escape(),
        body('rol').optional(),
        body('birthday')
          .optional()
          .isDate()
          .withMessage('Needs to be a date  '),
        body('profileImage').optional()
      ]
    }
  }
}

module.exports = validateUser
