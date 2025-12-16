import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// Indicamos o nome dessa suíte/grupo de testes
describe('Testes dos Módulos Usuário e Auth (e2e)', () => {
    let token: any;
    let usuarioId: any;
    let app: INestApplication<App>;

    // Esse  métedo, beforeAll, significa antes de todos, ou seja, antes de todos os testes ele será executado
    // Usado geralmente quando queremos fazer configurações como BD e indicar o que queremos e como queremos testar
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [__dirname + "./../src/**/entities/*.entity.ts"],
                    synchronize: true,
                    dropSchema: true,
                }),
                AppModule],
        }).compile();

        // Criamos uma varíavel chamada app, que recebe o modulo configurado para criamos os testes
        app = moduleFixture.createNestApplication();
        // Indicamos que queremos as validações aqui também
        app.useGlobalPipes(new ValidationPipe());
        // Iniciamos o módulo de testes
        await app.init();
    });

    // Esse  métedo afterAll indica depois de todos. Usado para finalizar o módulo de Testes
    afterAll(async () => {
        await app.close();
    })

    // it - este, isso
    // usamos essa estrutura para criar o nosso teste 
    it("01 - Deve Cadastrar um novo Usuário", async () => {
        const resposta = await request(app.getHttpServer()) // simulamos uma requisição HTTP
            .post('/usuarios/cadastrar')    // indicamos qual endpoint da nossa aplicação essa requisição será enviada
            .send({                         // simulamos o objeto JSON
                nome: 'Root',
                usuario: 'root@root.com',
                senha: 'rootroot',
                foto: '-',
            })
            .expect(201)                    // indicamos qual resultado é esperado (expect) para esse teste

        usuarioId = resposta.body.id;       // guardamos o id criado em uma variavel para reutilizá-lo em outro teste

    });

    it("02 - Não Deve Cadastrar um Usuário Duplicado", async () => {
        await request(app.getHttpServer())
            .post('/usuarios/cadastrar')
            .send({
                nome: 'Root',
                usuario: 'root@root.com',
                senha: 'rootroot',
                foto: '-',
            })
            .expect(400)
    });

    it("03 - Deve Autenticar o Usuário (Login)", async () => {
        const resposta = await request(app.getHttpServer())
            .post("/usuarios/logar")
            .send({
                usuario: 'root@root.com',
                senha: 'rootroot',
            })
            .expect(200)

        token = resposta.body.token;    // guardamos o token criado em uma variavel para reutilizá-lo em outro teste
    })

    it("04 - Deve Listar todos os Usuários", async () => {
        return request(app.getHttpServer())
            .get('/usuarios/all')
            .set('Authorization', `${token}`)   // passamos a variavel token nessa requisição pois ela é protegida pela Security
            .send({})
            .expect(200)
    })

    it("05 - Deve Atualizar um Usuário", async () => {
        return request(app.getHttpServer())
            .put('/usuarios/atualizar')
            .set('Authorization', `${token}`)
            .send({
                id: usuarioId,
                nome: 'Root Atualizado',
                usuario: 'root@root.com',
                senha: 'rootroot',
                foto: '-',
            })
            .expect(200)
            .then(resposta => { // Depois da execução do teste, então (then) execute o a asserção abaixo
                expect("Root Atualizado").toEqual(resposta.body.nome)   // esperamos que o valor do nome dentro corpo da resposta seja igual a Root Atualizado
            })

    })
});
