import mongoose, { Document, Model, model, Schema } from 'mongoose';

interface IWilder extends Document {
  name: string,
  city: string,
  about: string,
  skills: [{ title: string, votes: number }],
}

const WilderSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    about: { type: String, required: true },
    skills: [{ title: String, votes: Number }],
  },

);
const Wilder: Model<IWilder> = model('wilder', WilderSchema);

export { IWilder, Wilder }



