import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { HydratedDocument, Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';

class Leak {}

const leaks = [];

@Injectable()
export class ReviewService {
    constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<HydratedDocument<ReviewModel>>) {}

    async create(dto: CreateReviewDto): Promise<HydratedDocument<ReviewModel>> {
        return this.reviewModel.create(dto);
    }

    async delete(id: string): Promise<HydratedDocument<ReviewModel> | null> {
        return this.reviewModel.findByIdAndDelete(id).exec();
    }

    async finfByProductId(productId: string): Promise<HydratedDocument<ReviewModel>[]> {
        leaks.push(new Leak());
        return this.reviewModel.find({ productId }).exec();
    }

    async deletedByProductId(productId: string) {
        return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
    }
}
