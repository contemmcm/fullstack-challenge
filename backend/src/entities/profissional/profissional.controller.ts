import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { IProfissional } from './profissional.model';
import { ProfissionalService } from './profissional.service';

@Controller('api/v1/profissional')
export class ProfissionalController {
  private readonly logger = new Logger(ProfissionalController.name);

  constructor(protected profissionalService: ProfissionalService) {}

  @Get()
  async findAllPaginated(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Response() res: any,
  ) {
    const pageResult = await this.profissionalService.findPage({
      page: page,
      take: size,
      sort: sort,
    });

    return res
      .set({ 'x-total-count': pageResult.count })
      .json(pageResult.results);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.profissionalService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(
    @Body() profissional: IProfissional,
    @Request() req: any,
    @Response() res: any,
  ) {
    const response = await this.profissionalService.createOne(profissional);

    // log e auditoria
    this.logger.log(
      `User ${req.user.sub} created new entity Profissional: ${JSON.stringify(
        response,
      )}`,
    );

    return res
      .set('X-app-alert', `Profissional "${response.nome}" criado com sucesso!`)
      .json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() profissional: IProfissional,
    @Request() req: any,
    @Response() res: any,
  ) {
    const response = await this.profissionalService.updateOne(id, profissional);

    // log e auditoria
    this.logger.log(
      `User ${req.user.sub} updated a Profissional: ${JSON.stringify(
        response,
      )}`,
    );

    return res
      .set('X-app-alert', 'Profissional atualizado com sucesso!')
      .json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(
    @Param('id') id: number,
    @Request() req: any,
    @Response() res: any,
  ) {
    this.profissionalService.deleteOne(id);

    // log e auditoria
    this.logger.log(`User ${req.user.sub} deleted a Profissional: ${id}`);

    return res
      .set('X-app-alert', 'Profissional removido com sucesso!')
      .json({ id: id });
  }
}
