import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalTipoController } from './profissional-tipo.controller';
import { ProfissionalTipoRepository } from './profissional-tipo.repository';
import { ProfissionalTipoService } from './profissional-tipo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalTipoRepository])],
  providers: [ProfissionalTipoService],
  controllers: [ProfissionalTipoController],
})
export class ProfissionalTipoModule {}
