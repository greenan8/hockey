import { uuid } from "controllers/utilities/Types";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conference {
  @PrimaryGeneratedColumn("uuid")
  id: uuid;
}
