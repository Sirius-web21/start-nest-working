import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    name: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @Min(1, { message: 'Рейтинг не может быть мение 1' })
    @Max(5)
    @IsNumber()
    raiting: number;

    @IsString()
    productId: string;
}
