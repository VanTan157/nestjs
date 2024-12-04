import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({default: ''})
    phone: string;

    @Prop({default:""})
    address: string;

    @Prop({default:""})
    image: string;

    @Prop({default: "USER"})
    role: string;

    @Prop()
    accountType: string;

    @Prop({default: false})
    isActive: boolean;

    @Prop()
    codeId: string;

    @Prop()
    codeExpired: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
