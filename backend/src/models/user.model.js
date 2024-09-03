import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Confirm password is required'],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: 'Passwords do not match',
      },
    },
    cartItems: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  const checkPass = await bcrypt.compare(candidatePassword, userPassword);
  return checkPass;
};

const User = mongoose.model('User', userSchema);

export default User;
