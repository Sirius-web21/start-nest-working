import { Injectable } from '@nestjs/common';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { HydratedDocument, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TopPageCreateDto } from './dto/top-page-create.dto';

@Injectable()
export class TopPageService {
    constructor(@InjectModel(TopPageModel.name) private readonly topPageModel: Model<HydratedDocument<TopPageModel>>) {}
    async create(dto: TopPageCreateDto) {
        return this.topPageModel.create(dto);
    }

    async findById(id: string) {
        return this.topPageModel.findById(id).exec();
    }

    async findByAlias(alias: string) {
        return this.topPageModel.findOne({ alias }).exec();
    }

    async deleteById(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: TopPageCreateDto) {
        return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async findByCategory(firstCategory: TopLevelCategory) {
        return this.topPageModel
            .aggregate([
                {
                    $match: {
                        firstCategory,
                    },
                },
                {
                    $group: {
                        _id: { secondCategory: '$secondCategory' },
                        pages: { $push: { alias: '$alias', title: '$title' } },
                    },
                },
            ])
            .exec();
    }

    async findByText(text: string) {
        return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec();
    }
}
