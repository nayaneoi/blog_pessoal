import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_temas" })
export class Tema {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    descricao: string

    // Indica o lado UM do relacionamento, indicando que esse campo se conecta ao campo Usuario da Model Postagem
    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    @ApiProperty()
    postagem: Postagem[]

}
