const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const {
  check,
  validationResult
} = require('express-validator/check');

const User = require('../../models/user');

// @route  POST api/users
// @desc   Register user
// @access Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email.').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({
    min: 6
  })
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  const {
    name,
    email,
    password
  } = req.body;

  try {
    let user = await User.findOne({
      email
    });
    // If user exists, send err
    if (user) {
      return res.status(400).json({
        errors: [{
          msg: 'User already exists'
        }]
      })
    }
    // Get users avatar
    const avatar = gravatar.url(email, {
      s: "200", // default size
      r: "pg", // rating
      d: "mm" // default img
    })

    user = new User({
      name,
      email,
      avatar,
      password
    })

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // return jsonwebtoken
    res.send('User registered')
  } catch {
    console.error(err.message);
    res.status(500).send('Server error.')
  }

});

module.exports = router;
