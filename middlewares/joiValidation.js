const { celebrate, Joi } = require('celebrate');

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.required': 'Field has to be filled',
      }),
    director: Joi.string().required()
      .messages({
        'string.required': 'Field has to be filled',
      }),
    duration: Joi.number().required() // проверить формат и исправить валидацию
      .messages({
        'number.required': 'Field has to be filled',
      }),
    year: Joi.string().required()
      .messages({
        'string.required': 'Field has to be filled',
      }),
    description: Joi.string().required()
      .messages({
        'string.required': 'Field has to be filled',
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
    nameRU: Joi.string().required()
      .messages({
        'string.required': 'Field has to be filled',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.required': 'Field has to be filled',
      }),
    thumbnail: Joi.string().required().pattern(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/)
      .messages({
        'string.required': 'Field has to be filled',
        'string.pattern': 'Field must be a link',
      }),
    movieId: Joi.string().required() // проверить формат и исправить валидацию
      .messages({
        'string.required': 'Field has to be filled',
      }),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required()
      .messages({
        'string.required': 'Field has to be filled',
      }),
  }),
});

const userUpdateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
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
    password: Joi.string().required()
      .messages({
        'string.required': 'Password has to be filled',
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
    password: Joi.string().required()
      .messages({
        'string.required': 'Password has to be filled',
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
