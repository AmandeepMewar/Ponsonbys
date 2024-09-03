import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { redis } from '../utils/redis.js';

function generateTokens(userId) {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
}

async function storeRefreshToken(userId, refreshToken) {
  const refreshTokenExpiresIn = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN);
  await redis.set(
    `refresh_token: ${userId}`,
    refreshToken,
    'EX',
    refreshTokenExpiresIn * 24 * 60 * 60
  );
}

function setCookies(res, accessToken, refreshToken) {
  const accessTokenExpiresIn = parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN);
  res.cookie('accessToken', accessToken, {
    httpOnly: true, // prevents XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict', // prevents CSRF attacks, cross-site request forgery attack
    maxAge: accessTokenExpiresIn * 60 * 1000,
  });

  const refreshTokenExpiresIn = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: refreshTokenExpiresIn * 24 * 60 * 60 * 1000,
  });
}

export async function signup(req, res) {
  const { name, email, password, passwordConfirm } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists)
      return res
        .status(400)
        .json({ status: 'fail', message: 'User already exists' });

    const user = await User.create({ name, email, password, passwordConfirm });

    const { accessToken, refreshToken } = generateTokens(user._id);
    storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      status: 'success',
      result: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
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
