export const validationHandler = async (req, schema, res, next) => {
  const { error } = await schema.validate(req);
  if (error) {
    return res.status(400).send({
      status: 400,
      message: error.details[0].message,
      field: error.details[0].path[0]
    });
  }
  next();
};
