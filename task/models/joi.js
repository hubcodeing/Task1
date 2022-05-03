const Joi = require("joi");
const userRegistrationSchema = Joi.object().keys({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(10).required(),
  phone: Joi.string().required(),
});

const userNotesSchema = Joi.object().keys({
  title: Joi.string().min(3).max(20).required(),
  discription: Joi.string().min(5).required(),
  age: Joi.string().max(2).required(),
  userId: Joi.string().required(),
});
const updateNotesSchema = Joi.object().keys({
  title: Joi.string().min(3).max(20).required(),
  discription: Joi.string().min(5).required(),
  age: Joi.string().max(2).required(),
  userId: Joi.string(),
});
module.exports = {
  userRegistrationSchema,
  userNotesSchema,
  updateNotesSchema,
};
