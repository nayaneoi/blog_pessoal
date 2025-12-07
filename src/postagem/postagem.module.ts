import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { Module } from "@nestjs/common";
import { PostagemController } from "./controller/postagem.controller";
import { PostagemService } from "./services/postagem.services";
import { TemaModule } from "../tema/tema.module";

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
  controllers: [PostagemController],
  providers: [PostagemService],
})

export class PostagemModule { }