const mongoose = require('mongoose');
const User = require('./user');

const wineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vineyard: {
    type: String,
  },
  type: {
    type: String,
  },
  year: {
    type: Number,
  },
  comment: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: {
    type: String,
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  }],
}, { timestamps: true });

wineSchema.pre('remove', async function (next) {
  try {
    const user = await User.findById(this.user);
    user.wines.remove(this.id);
    await user.save();
    return next();
  } catch (error) {
    return next(error);
  }
});

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;
