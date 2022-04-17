import { integer, uuid } from "controllers/utilities/Types"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}
