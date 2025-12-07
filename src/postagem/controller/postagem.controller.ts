import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
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
    
    @Get("/:id_post")
    @HttpCode(HttpStatus.OK) // Monta a Resposta GTTP para o Front com o status 200
    findById(@Param('id_post' , ParseIntPipe) id_post: number): Promise<Postagem> {  // o parseintpipe converte a informação, neste caso recebe texto e converte para numero
        return this.postagemService.findById(id_post)
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByAllTitulo(@Param('titulo') titulo: string): Promise<Postagem[]>{
        return this.postagemService.findAllByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.create(postagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return  this.postagemService.update(postagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe)id: number){
        return this.postagemService.delete(id);
    }
}