import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<UserModel>;

@Schema({ timestamps: true })
export class UserModel {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;
}

export const UserModelSheme = SchemaFactory.createForClass(UserModel);
