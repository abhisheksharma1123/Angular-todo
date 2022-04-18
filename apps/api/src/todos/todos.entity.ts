import { Todo } from "@abhi/api-interfaces"
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, Generated } from "typeorm"

@Entity()
export class todos extends BaseEntity implements Todo {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column({default: false})
    status: boolean

    @CreateDateColumn()
	created_at: Date;

}