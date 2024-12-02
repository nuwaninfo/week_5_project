import mongoose, { Document, Schema , Model } from 'mongoose'


interface ITodo extends Document {
    todo: string
    checked: boolean
}

interface IUser extends Document {
    name: string
    todos: ITodo[]

}

const TodoSchema: Schema = new Schema<ITodo>({
    todo: { type: String, required: true },
    checked: { type: Boolean, default: false }
});
  
const UserSchema: Schema = new Schema<IUser>({
    name: { type: String, required: true },
    todos: { type: [TodoSchema], required: true },
});
  
const Todo: Model<ITodo> = mongoose.model<ITodo>('Todo', TodoSchema);
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export { Todo, User, IUser, ITodo };