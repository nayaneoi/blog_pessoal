import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

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

}