import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  name: string
  email: string
  password: string
  isAdmin: boolean
  isValidated: boolean
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Va rugam adaugati un nume'],
    },
    email: {
      type: String,
      required: [true, 'Va rugam adaugati un email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Va rugam adaugati o parola'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isValidated: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model<IUser>('User', userSchema)

export default User
