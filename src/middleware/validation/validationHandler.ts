export const validationHandler = async (req, schema, res, next) => {
  const { error } = await schema.validate(req, { abortEarly: false });
  if (error) {
    const messages = [];
    error.details.map((err) => {
      messages.push(err.message);
    });
    return res.status(400).send({
      status: 400,
      messages,
    });
  }
  next();
};
