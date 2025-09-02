import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';

export class TopPageDto {
    @IsEnum(TopLevelCategory)
    firstCategory: TopLevelCategory;
}
