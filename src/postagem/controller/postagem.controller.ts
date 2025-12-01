import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { PostagemService } from "../services/postagem.services";
import { Postagem } from "../entities/postagem.entity";

@Controller ("/postagens") // Indica que a classe é uma controller
export class PostagemController {

    constructor(private readonly postagemService: PostagemService){}

    @Get() // Indica qual tipo de requisição esse método é executado
    @HttpCode(HttpStatus.OK) // monta a resposta HTTP para front
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll();

    }
}