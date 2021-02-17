const { addKindergartenQuery } = require('../../database/queries');
const { boomify } = require('../../utils');
const { addKindergartenSchema } = require('../../utils/validation');

const addKindergarten = async (req, res, next) => {
  try {
    const { userId } = req;
    const validatdData = await addKindergartenSchema.validate(req.body, {
      abortEarly: false,
    });
    // console.log(validatdData);
    await addKindergartenQuery({
      ...validatdData,
      userId,
    });

    res.status(201).json({
      statusCode: 201,
      message: 'Kindergarten has been added successfully',
    });
  } catch (error) {
    next(
      error.name === 'ValidationError'
        ? boomify(400, 'ValidationError', error.errors)
        : error
    );
  }
};

module.exports = addKindergarten;
