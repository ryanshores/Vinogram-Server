const jwt = require('jsonwebtoken');
const db = require('../../models');

exports.signin = async (req, res, next) => {
  // find the user
  const user = await db.User.findOne({ email: req.body.email });
  if (!user) {
    return next({
      status: 400,
      message: 'User not found',
    });
  }
  const { id, username } = user;
  // will return true or false
  const isMatch = await user.comparePassword(req.body.password);
  // log them in if true
  if (isMatch) {
    const token = jwt.sign({ id, username }, process.env.JWT_KEY);
    return res.status(200).json({ id, username, token });
  }
  return next({
    status: 400,
    message: 'Invalid email/password',
  });
};

exports.signup = async (req, res, next) => {
  console.log(req.body); // to see what is returned to you
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;

  res.status(200).json({ image });

//   try {
//     const user = await db.User.create(req.body);
//     const { id, username } = user;
//     const token = jwt.sign({ id, username }, process.env.JWT_KEY);
//     return res.status(200).json({ id, username, token });
//   } catch (error) {
//     if (error.code === 11000) {
//       error.message = 'Sorry, that username and/or email is taken';
//     }
//     return next({
//       status: 400,
//       message: error.message,
//     });
//   }
};
