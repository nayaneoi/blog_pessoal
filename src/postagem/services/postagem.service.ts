import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TemaService } from "../../temas/services/tema.service";

/*
    @Injectable: Indica que é uma Classe de Serviço e pode ser inserida/injetada 
    diretamente em outras classes sem a necessidade de instância

    @InjectRepository(Postagem): Decorator que inverte a dependência da Classe(Repository).
    Com isso, podemos criar objetos de Classes Repository sem precisar instanciar objetos.
    Além disso, indica ao Nest que a nossa Repository aponta para a Entidade Postagem, isto é,
    os métodos de manipulação de BD dentro da Repository serão direcionados a tabela tb_postagem
*/
@Injectable()
export class PostagemService {

    // Inicia alguns recursos(Repository, Services) para a classe de Serviço funcionar
    constructor(
        @InjectRepository(Postagem) // Aplica a inversão de dependência a nossa classe Repository
        private postagemRepository: Repository<Postagem>,    // Criamos um Objeto da classe Repository voltado para Postagens
        private temaService: TemaService                    // Dentro do Construtor injetamos o temaService para podermos usar seus métodos 
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations: {    // Indica que queremos trazer também o relacionamento
                tema: true,
                usuario: true
            }
        })
    }

    async findById(id: number): Promise<Postagem> {
        // Verifica primeiro se a postagem existe
        const postagem = await this.postagemRepository.findOne({
            where: { id },
            relations: {    // Indica que queremos trazer também o relacionamento
                tema: true,
                usuario: true
            }
        })

        // Se a postagem não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
        if (!postagem) {
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)
        }

        // Se a postagem foi encontrada, retorna ela
        return postagem
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        // Verifica se existi postagem com o parametro informado
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {    // Indica que queremos trazer também o relacionamento
                tema: true,
                usuario: true
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        /*
            {
                "id": 1
                "titulo": "",
                "texto": "Texto da Postagem 3",
                "tema": {
                    "id": 1
                }
            }
        */

        if (postagem.tema) {
            let tema = await this.temaService.findById(postagem.tema.id)

            if (!tema) {
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
            }

        }

        return await this.postagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {

        /*
            {
                "id": 1
                "titulo": "",
                "texto": "Texto da Postagem 3",
                "tema": {
                    "id": 1
                }
            }
        */

        // Chama o método findById anteriro para pesquisar uma postagem pelo id extraido do objeto postagem
        let buscaPostagem = await this.findById(postagem.id);

        // Se a postagem não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
        if (!buscaPostagem || !postagem.id) {
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
        }

        if (postagem.tema) {
            let tema = await this.temaService.findById(postagem.tema.id)

            if (!tema) {
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
            }

        }

        // Se a postagem foi encontrada, cadastra ela no BD e retorna ela
        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {

        // Chama o método findById anteriro para pesquisar uma postagem pelo id extraido do objeto postagem
        let buscaPostagem = await this.findById(id);

        // Se a postagem não existir, lace uma Exceção que vai direto para o Cliente com o status 404 Not Found
        if (!buscaPostagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

        // Se a postagem foi encontrada, apaga ela no BD e retorna uma confirmação de exclusão
        return await this.postagemRepository.delete(id);

    }

}

/* REPOSITORY<POSTAGEM>

    find() => SELECT * FROM tb_postagens
    save() => INSERT INTO tb_postagens VALUES (titulo, texto, data)

    findOne() => SELECT * FROM tb_postagens WHERE id = {id}

*/