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
    `refresh_token:${userId}`,
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
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.checkPassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);

      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);

      res.status(200).json({
        status: 'success',
        result: {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
        message: 'Logged In Successfully',
      });
    } else {
      res
        .status(401)
        .json({ status: 'fail', message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res
      .status(200)
      .json({ status: 'success', message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function refreshTokens(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ status: 'fail', message: 'NO refresh Token provided' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedRefreshToken = await redis.get(
      `refresh_token:${decoded.userId}`
    );

    if (storedRefreshToken !== refreshToken) {
      return res
        .status(401)
        .json({ status: 'fail', message: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res
      .status(200)
      .json({ status: 'success', message: 'Token refreshed Successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function getProfile(req, res) {
  try {
    res.status(200).json({ status: 'success', result: req.user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
