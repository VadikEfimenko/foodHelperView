import mongoose, {Schema} from 'mongoose';

const DoctorSchema = new mongoose.Schema(
    {
        _id: { type: Schema.Types.ObjectId },
        login: { type: String },
        password: { type: String, required: true },
    },
);

const Doctor = mongoose.model('Doctor', DoctorSchema);
export default Doctor;