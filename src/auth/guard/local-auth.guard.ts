import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { }

/*
    Guard: São classes que decidem se uma requisição pode prosseguir, geralmente usada para autorização. 
    Elas interceptam a requisição antes do controlador e aplica validações como permissões ou autenticação.

    Iremos chama-lá na controller de autenticação (AuthController) indicando que usaremos o método de autenticação local,
    ou seja, via banco de dados.
*/