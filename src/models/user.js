import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  document: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  last_name: { 
    type: String,
    required: true 
  },
  cellphone: { 
    type: String, 
    required: true 
  },
  user_type: { 
    type: String, 
    required: true 
  },
});

UserSchema.plugin(mongoosePaginate);

export default model('User', UserSchema);
