import mongoose from "mongoose";
export declare const Usermodel: mongoose.Model<{
    email?: string | null;
    password?: string | null;
    firstName?: string | null;
    lastName?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    email?: string | null;
    password?: string | null;
    firstName?: string | null;
    lastName?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    email?: string | null;
    password?: string | null;
    firstName?: string | null;
    lastName?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email?: string | null;
    password?: string | null;
    firstName?: string | null;
    lastName?: string | null;
}, mongoose.Document<unknown, {}, {
    email?: string | null;
    password?: string | null;
    firstName?: string | null;
    lastName?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    email?: string | null;
    password?: string | null;
    firstName?: string | null;
    lastName?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    email?: string | null;
    password?: string | null;
    firstName?: string | null;
    lastName?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    email?: string | null;
    password?: string | null;
    firstName?: string | null;
    lastName?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Accountmodel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    balance: number;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    balance: number;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId: mongoose.Types.ObjectId;
    balance: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    balance: number;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    balance: number;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    userId: mongoose.Types.ObjectId;
    balance: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: mongoose.Types.ObjectId;
    balance: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: mongoose.Types.ObjectId;
    balance: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=model.d.ts.map