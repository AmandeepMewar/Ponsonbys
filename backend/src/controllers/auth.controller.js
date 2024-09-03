import User from '../models/user.model.js';

export async function signup(req, res) {
  const { name, email, password, passwordConfirm } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists)
      return res
        .status(400)
        .json({ status: 'fail', message: 'User already exists' });

    const user = await User.create({ name, email, password, passwordConfirm });

    res.status(201).json({
      status: 'success',
      result: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      message: 'User created successfully',
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function login(req, res) {
  res.send('Sign up route called!');
}

export async function logout(req, res) {
  res.send('Sign up route called!');
}
