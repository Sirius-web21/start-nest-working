import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class ProductCharacteristic {
    @Prop()
    name: string;

    @Prop()
    value: string;
}

export type AuthDocument = HydratedDocument<ProductModel>;

@Schema({ timestamps: true })
export class ProductModel {
    @Prop()
    image: string;

    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    oldPrice?: number;

    @Prop()
    credit: number;

    @Prop()
    description: string;

    @Prop()
    adventages: string;

    @Prop()
    disAdventages: string;

    @Prop({ type: () => [String] })
    categories: string[];

    @Prop({ type: () => [String] })
    tags: string[];

    @Prop({ type: () => [ProductCharacteristic], _id: false })
    characteristics: ProductCharacteristic[];
}

export const ProductModelSchema = SchemaFactory.createForClass(ProductModel);
