import { uuid } from "controllers/utilities/Types";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: uuid;
}
