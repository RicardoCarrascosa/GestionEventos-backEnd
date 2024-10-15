const { body } = require('express-validator')

const validateEvent = (method) => {
  switch (method) {
    case 'createEvent': {
      return [
        body('name').exists().withMessage('Event name is needed').escape(),
        body('type').exists().withMessage('Type is needed').escape(),
        body('date')
          .exists()
          .withMessage('Date is needed')
          .isDate()
          .withMessage('Needs to be date format')
          .escape(),
        body('description')
          .exists()
          .withMessage('description is needed')
          .escape(),
        body('organizer')
          .exists()
          .withMessage('Organizer is needed')
          .isMongoId()
          .withMessage('Needs to be MongoID')
          .escape(),
        body('eventImage').isURL().withMessage('Needs to be URL').escape(),
        body('verified')
          .exists()
          .withMessage('Verification is needed')
          .isBoolean()
          .withMessage('Needs to be a Boolean')
          .escape()
      ]
    }
    case 'updateEvent': {
      return [
        body('name').escape(),
        body('type').escape(),
        body('date').isDate().withMessage('Needs to be date format').escape(),
        body('description').escape(),
        body('organizer')
          .isMongoId()
          .withMessage('Needs to be MongoID')
          .escape(),
        body('eventImage').isURL().withMessage('Needs to be URL').escape(),
        body('verified')
          .isBoolean()
          .withMessage('Needs to be a Boolean')
          .escape()
      ]
    }
  }
}

module.exports = validateEvent