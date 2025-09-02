import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModel, TopPageModelScheme } from './top-page.model';
import { TopPageService } from './top-page.service';

@Module({
    imports: [ConfigModule, MongooseModule.forFeature([{ name: TopPageModel.name, schema: TopPageModelScheme }])],
    controllers: [TopPageController],
    providers: [TopPageService],
})
export class TopPageModule {}
