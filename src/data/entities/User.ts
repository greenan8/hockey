import { integer, uuid } from "controllers/utilities/Types";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: uuid;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}
