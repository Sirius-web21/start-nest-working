import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { TopPageDto } from './dto/find-top-page.dto';
import { ConfigService } from '@nestjs/config';
import { TopPageCreateDto } from './dto/top-page-create.dto';
import { TopPageService } from './top-page.service';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
    constructor(
        private readonly configService: ConfigService,
        private readonly topPageService: TopPageService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() dto: TopPageCreateDto) {
        return this.topPageService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const topPage = await this.topPageService.findById(id);
        if (!topPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
        }
        return topPage;
    }

    @UseGuards(JwtAuthGuard)
    @Get('byAlias/:alias')
    async getByAlias(@Param('alias') alias: string) {
        const topPage = await this.topPageService.findByAlias(alias);
        if (!topPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
        }
        return topPage;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedTopPage = await this.topPageService.deleteById(id);
        if (!deletedTopPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
        }
        return deletedTopPage;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageModel) {
        const updatedTopPage = await this.topPageService.updateById(id, dto);
        if (!updatedTopPage) {
            throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR);
        }
        return updatedTopPage;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: TopPageDto) {
        return this.topPageService.findByCategory(dto.firstCategory);
    }

    @Get('textSearch/:text')
    async textSearch(@Param('text') text: string) {
        return this.topPageService.findByText(text);
    }
}
