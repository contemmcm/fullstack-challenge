import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfissionalRepository } from './profissional.repository';
import { ProfissionalService } from './profissional.service';
import { ProfissionalController } from './profissional.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfissionalRepository])],
  providers: [ProfissionalService],
  controllers: [ProfissionalController],
})
export class ProfissionalModule {}
