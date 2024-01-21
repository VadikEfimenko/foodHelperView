import mongoose, {Document, Schema} from 'mongoose';

export interface IUser extends Document {
    _id: string,
    name: string,
    email: string,
}

export const UserSchema = new mongoose.Schema(
    {
        _id: String,
        name: String,
        email: String,
        doctor: { type: Schema.Types.ObjectId },
    },
    { _id: false }
);

const User = mongoose.model<IUser>('User', UserSchema);
export default User;