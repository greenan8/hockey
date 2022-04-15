import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { User } from "data/entities/User";
import { getRepository } from "typeorm";
import { DataSource } from "data/DataSource";
import { Flat } from "./utilities/Types";

interface UserPostBody extends Flat<Omit<User, "id">> {}

@Route("users")
export class UsersController extends Controller {
  private repository = DataSource.getRepository(User);

  @Get("{id}")
  public async getUser(@Path() id: number): Promise<User> {
    return this.repository.findOneBy({ id: id });
  }

  @Get()
  public async listUsers(): Promise<User[]> {
    return this.repository.find();
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(@Body() body: UserPostBody): Promise<void> {
    this.setStatus(201);
    await this.repository.save(body);
  }
}
