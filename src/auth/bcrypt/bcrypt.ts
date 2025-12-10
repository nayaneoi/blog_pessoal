import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable() // Indica que é uma Classe de Serviço e pode ser inserida/injetada em outras classes diretamente
export class Bcrypt{
     // Função responsavel por criptografar a senha o usuário
    async criptografarSenha(senha: string): Promise<string>{

        let saltos: number=10; // Determina o qual forte a criptografia será
        return await bcrypt.hash(senha, saltos)
    }

    // Função responsavel por comparar a senha criptografa e salva no banco com a sem enviada no login
    async compararSenhas(senhaBanco: string, senhaDigitada: string): Promise<boolean>{
        return bcrypt.compareSync(senhaDigitada, senhaBanco);
    }

}