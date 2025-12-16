import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.module';
import { Tema } from './temas/entities/tema.entity';
import { TemaModule } from './temas/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

// Decorator - Etiqueta de metadaos - tudo o que estiver dentro desta class appmodule, vira um modulo. o @module simplifica o comportamente, construção da classe
@Module({
  imports: [ 
  ConfigModule.forRoot(),
  TypeOrmModule.forRootAsync({
	  useClass: ProdService,
    imports: [ConfigModule],
}),
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
