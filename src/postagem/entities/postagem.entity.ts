import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Tema } from "../../temas/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name:'tb_postagens'})  // Indicando que a classe é uma Entidade/Model - Converte em uma tabela no banco de dados
export class Postagem {

    @PrimaryGeneratedColumn() // Chave Primária e Autto Incremental
    id: number;

    @IsNotEmpty()   // Validados de Objeto
    @Column({length: 100, nullable: false}) //length é o tamanho máximo // É o NOTT NULL do MySQL
    titulo: string;

    @IsNotEmpty()   // Validados de Objeto
    @Column({length: 100, nullable: false}) //length é o tamanho máximo // É o NOTT NULL do MySQL
    texto: string;

    @UpdateDateColumn()
    data: Date;

    @ManyToOne(()=> Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema
    // Indica o lado MUITO do relacionamento, indicando que esse campo se conecta ao campo Postagem da Model Usuario
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    usuario: Usuario

}