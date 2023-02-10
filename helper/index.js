const Joi = require('joi');

//User-defined function to validate the user
function validateItem(item) {
  const JoiSchema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.string().required(),
    unit: Joi.string().required(),
    quantity: Joi.string().required(),
    category: Joi.string().required(),
    store: Joi.string().required(),
    notes: Joi.string().required(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(item);
}

module.exports = {
  validateItem,
};
