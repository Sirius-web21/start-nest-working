import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopPageDocument = HydratedDocument<TopPageModel>;

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Product,
}

export class HhData {
    @Prop()
    count: number;

    @Prop()
    juniorSalary: number;

    @Prop()
    middleSalary: number;

    @Prop()
    seniorSalary: number;
}

export class TopPageAdventage {
    @Prop()
    title: string;

    @Prop()
    description: string;
}

@Schema({ timestamps: true })
export class TopPageModel {
    @Prop({ enum: TopLevelCategory })
    firstCategory: TopLevelCategory;

    @Prop()
    secondCategory: string;

    @Prop({ unique: true })
    alias: string;

    @Prop()
    title: string;

    @Prop()
    category: string;

    @Prop({ type: () => HhData })
    hh?: HhData;

    @Prop({ type: () => [TopPageAdventage] })
    adventages: TopPageAdventage[];

    @Prop()
    seoText: string;

    @Prop()
    tegsTitle: string;

    @Prop({ type: () => [String] })
    tags: string[];
}

export const TopPageModelScheme = SchemaFactory.createForClass(TopPageModel);
TopPageModelScheme.index({ '$**': 'text' });
