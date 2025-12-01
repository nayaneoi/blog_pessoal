import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { Module } from "@nestjs/common";
import { PostagemController } from "./controller/postagem.controller";
import { PostagemService } from "./services/postagem.services";

@Module({
  imports: [TypeOrmModule.forFeature([Postagem])],
  controllers: [PostagemController],
  providers: [PostagemService],
})

export class PostagemModule { }