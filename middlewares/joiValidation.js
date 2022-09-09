const { celebrate, Joi } = require('celebrate');

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(100)
      .messages({
        'string.required': 'Field has to be filled',
        'string.min': 'Field must contain at least of 1 characters',
        'string.max': 'Field must be no more than 100 characters',
      }),
    director: Joi.string().required().min(1).max(100)
      .messages({
        'string.required': 'Field has to be filled',
        'string.min': 'Field must contain at least of 1 characters',
        'string.max': 'Field must be no more than 100 characters',
      }),
    duration: Joi.number().required().min(1).max(100) // проверить формат и исправить валидацию
      .messages({
        'number.required': 'Field has to be filled',
        'number.min': 'Field must contain at least of 1 characters',
        'number.max': 'Field must be no more than 100 characters',
      }),
    year: Joi.number().required().min(2)
      .messages({
        'number.required': 'Field has to be filled',
        'number.min': 'Field must contain at least of 2 characters',
      }),
    description: Joi.string().required().min(1).max(100)
      .messages({
        'string.required': 'Field has to be filled',
        'string.min': 'Field must contain at least of 1 characters',
        'string.max': 'Field must be no more than 100 characters',
      }),
    image: Joi.string().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/)
      .messages({
        'string.required': 'Field has to be filled',
        'string.pattern': 'Field must be a link',
      }),
    trailerLink: Joi.string().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/)
      .messages({
        'string.required': 'Field has to be filled',
        'string.pattern': 'Field must be a link',
      }),
    nameRU: Joi.string().required().min(1).max(100)
      .messages({
        'string.required': 'Field has to be filled',
        'string.min': 'Field must contain at least of 1 characters',
        'string.max': 'Field must be no more than 100 characters',
      }),
    nameEN: Joi.string().required().min(1).max(100)
      .messages({
        'string.required': 'Field has to be filled',
        'string.min': 'Field must contain at least of 1 characters',
        'string.max': 'Field must be no more than 100 characters',
      }),
    thumbnail: Joi.string().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/)
      .messages({
        'string.required': 'Field has to be filled',
        'string.pattern': 'Field must be a link',
      }),
    movieId: Joi.string().required().min(1).max(100) // проверить формат и исправить валидацию
      .messages({
        'string.required': 'Field has to be filled',
        'string.min': 'Field must contain at least of 1 characters',
        'string.max': 'Field must be no more than 100 characters',
      }),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().min(1).max(100)
      .messages({
        'string.required': 'Field has to be filled',
        'string.min': 'Field must contain at least of 1 characters',
        'string.max': 'Field must be no more than 100 characters',
      }),
  }),
});

const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.required': 'Name has to be filled',
        'string.min': 'Name must contain at least of 2 characters',
        'string.max': 'Name must be no more than 30 characters',
      }),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } })
      .messages({
        'string.required': 'Email has to be filled',
        'string.email': 'Email must be real email',
      }),
  }),
});

const userCreateValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } })
      .messages({
        'string.required': 'Email has to be filled',
        'string.email': 'Email must be real email',
      }),
    password: Joi.string().required().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/)
      .messages({
        'string.required': 'Password has to be filled',
        'string.min': 'Password must be at least 6 characters',
        'string.pattern': 'Password must contain numbers or letters',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.required': 'Name has to be filled',
        'string.min': 'The name must contain at least of 2 characters',
        'string.max': 'Name must be no more than 30 characters',
      }),
  }),
});

const userLoginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: false } })
      .messages({
        'string.required': 'Email has to be filled',
        'string.email': 'Email must be real email',
      }),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/)
      .messages({
        'string.required': 'Password has to be filled',
        'string.min': 'Password must be at least 6 characters',
        'string.pattern': 'Password must contain numbers or letters',
      }),
  }),
});

module.exports = {
  movieValidation,
  movieIdValidation,
  userCreateValidation,
  userUpdateValidation,
  userLoginValidation,
};
