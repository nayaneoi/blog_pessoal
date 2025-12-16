import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Tema } from "../../temas/entities/tema.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_postagens" })   // Indicando que a classe é uma Entitidade/Model
export class Postagem {

    @ApiProperty()
    @PrimaryGeneratedColumn()   // Chave Primária e Auto Incremental
    id: number;

    @ApiProperty()
    @IsNotEmpty()   // Decorator usado para como Validador de Objetos no corpo da Requisição
    @Column({ length: 100, nullable: false })   // Tamanho Máximo: 100 | Regra do MySQL - NOT NULL
    titulo: string;

    @ApiProperty()
    @IsNotEmpty()   // Validador de Objeto
    @Column({ length: 1000, nullable: false })   // Tamanho Máximo: 1000 | Regra do MySQL - NOT NULL
    texto: string;

    @ApiProperty()
    @UpdateDateColumn() // Indica que o campo será gerenciado pelo BD
    data: Date;

    // Indica o lado MUITO do relacionamento, indicando que esse campo se conecta ao campo Postagem da Model Tema
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    @ApiProperty({ type: () => Tema })
    tema: Tema

    // Indica o lado MUITO do relacionamento, indicando que esse campo se conecta ao campo Postagem da Model Usuario
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
    })
    @ApiProperty({ type: () => Usuario })
    usuario: Usuario

}