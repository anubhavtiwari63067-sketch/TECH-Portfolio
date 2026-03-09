import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Codename is required'],
  },
  email: {
    type: String,
    required: [true, 'Transmission frequency is required'],
  },
  message: {
    type: String,
    required: [true, 'Intel is required'],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
