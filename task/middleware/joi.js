const Joi = require("joi");
const validateSchema = require("../middleware/validation");

const userRegistrationSchema = async (req, res, next) => {
  const Schema = Joi.object().keys({
    name: Joi.string().min(3).max(40).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).required(),
    profile_file: Joi.string(),
  });
  validateSchema(req, res, next, Schema);
};
const userNotesSchema = async (req, res, next) => {
  const Schema = Joi.object()
    .keys({
      title: Joi.string().min(3).max(20).required(),
      discription: Joi.string().min(5).required(),
      age: Joi.string().max(2).required(),
      userId: Joi.string(),
    })
    .unknown(true);
  validateSchema(req, res, next, Schema);
};

const updateNotesSchema = async (req, res, next) => {
  const Schema = Joi.object().keys({
    title: Joi.string().min(3).max(20).required(),
    discription: Joi.string().min(5).required(),
    age: Joi.string().max(2).required(),
    userId: Joi.string(),
  });
  validateSchema(req, res, next, Schema);
};

module.exports = {
  userRegistrationSchema,
  userNotesSchema,
  updateNotesSchema,
};
