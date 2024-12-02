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
          .isAfter(new Date().toString())
          .withMessage('Events cannot be in the past')
          .escape(),
        body('description')
          .exists()
          .withMessage('Description is needed')
          .escape(),
        body('organizer')
          .exists()
          .withMessage('Organizer is needed')
          .isMongoId()
          .withMessage('Needs to be MongoID')
          .escape(),
        // body('eventImage')
        //   .optional()
        //   .isURL()
        //   .withMessage('Needs to be URL')
        //   .escape(),
        body('verified')
          .optional()
          .isBoolean()
          .withMessage('Needs to be a Boolean')
          .escape()
      ]
    }
    case 'updateEvent': {
      return [
        body('name').optional().escape(),
        body('type').optional().escape(),
        body('date')
          .optional()
          .isDate()
          .withMessage('Needs to be date format')
          .escape(),
        body('description').optional().escape(),
        body('organizer')
          .optional()
          .isMongoId()
          .withMessage('Needs to be MongoID')
          .escape(),
        body('eventImage')
          .optional()
          .isURL()
          .withMessage('Needs to be URL')
          .escape(),
        body('verified')
          .optional()
          .isBoolean()
          .withMessage('Needs to be a Boolean')
          .escape()
      ]
    }
  }
}

module.exports = validateEvent
