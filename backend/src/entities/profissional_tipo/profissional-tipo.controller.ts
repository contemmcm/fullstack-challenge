import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  UseGuards,
  Put,
  Response,
  Logger,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { IProfissionalTipo } from './profissional-tipo.model';
import { ProfissionalTipoService } from './profissional-tipo.service';

@Controller('api/v1/profissional-tipo')
export class ProfissionalTipoController {
  private readonly logger = new Logger(ProfissionalTipoController.name);

  constructor(
    private readonly profissionalTipoService: ProfissionalTipoService,
  ) {}

  @Get()
  async findAllPaginated(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Response() res: any,
  ) {
    const pageResult = await this.profissionalTipoService.findPage({
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
    return this.profissionalTipoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOne(
    @Body() profissional: IProfissionalTipo,
    @Request() req: any,
    @Response() res: any,
  ) {
    const response = await this.profissionalTipoService.createOne(profissional);

    // log e auditoria
    this.logger.log(
      `User ${
        req.user.sub
      } created new entity ProfissionalTipo: ${JSON.stringify(response)}`,
    );

    return res
      .set(
        'X-app-alert',
        `Tipo de profissional "${response.descricao}" criado com sucesso!`,
      )
      .json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() profissional: IProfissionalTipo,
    @Request() req: any,
    @Response() res: any,
  ) {
    const response = await this.profissionalTipoService.updateOne(
      id,
      profissional,
    );

    // log e auditoria
    this.logger.log(
      `User ${req.user.sub} updated a ProfissionalTipo: ${JSON.stringify(
        response,
      )}`,
    );

    return res
      .set('X-app-alert', 'Tipo de profissional atualizado com sucesso!')
      .set('X-app-params', response.id)
      .json(response);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(
    @Param('id') id: number,
    @Request() req: any,
    @Response() res: any,
  ) {
    this.profissionalTipoService.deleteOne(id);

    // log e auditoria
    this.logger.log(`User ${req.user.sub} deleted a ProfissionalTipo: ${id}`);

    return res
      .set('X-app-alert', 'Tipo de profissional removido com sucesso!')
      .json({ id: id });
  }
}
