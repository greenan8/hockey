import { integer, uuid } from "controllers/utilities/Types"
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Division } from "./Division"

@Entity()
export class Conference {
    @PrimaryGeneratedColumn("uuid")
    id: uuid

    @Column("integer")
    sourceId: integer

    @Column()
    name: string

    @Column()
    active: boolean

    @OneToMany(() => Division, (division) => division.conference)
    @JoinColumn()
    divisions: Division
}
