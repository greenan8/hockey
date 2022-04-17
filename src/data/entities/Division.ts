import { integer, uuid } from "controllers/utilities/Types"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Conference } from "./Conference"

@Entity()
export class Division {
    @PrimaryGeneratedColumn("uuid")
    id: uuid

    @Column("integer")
    sourceId: integer

    @Column()
    name: string

    @Column()
    active: boolean

    @ManyToOne(() => Conference, (conference) => conference.divisions)
    @JoinColumn()
    conference: Conference

    @Column("uuid")
    conferenceId: uuid
}
