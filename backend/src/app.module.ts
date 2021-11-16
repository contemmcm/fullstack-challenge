import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfissionalTipoModule } from './entities/profissional_tipo/profissional-tipo.module';
import { typeOrmConfig } from './typeorm.config';
import { ProfissionalModule } from './entities/profissional/profissional.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './entities/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProfissionalModule,
    ProfissionalTipoModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
