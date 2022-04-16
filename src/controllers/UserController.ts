import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { User } from "data/entities/User";
import { DataSource } from "data/DataSource";
import { Flat, uuid } from "./utilities/Types";

interface UserResponse extends User {}

interface UserPostBody extends Flat<Omit<User, "id">> {}

@Route("users")
@Tags("User")
export class UsersController extends Controller {
  private repository = DataSource.getRepository(User);

  @Get("{id}")
  public async getUser(@Path() id: uuid): Promise<UserResponse> {
    return this.repository.findOneBy({ id: id });
  }

  @Get()
  public async listUsers(): Promise<UserResponse[]> {
    return this.repository.find();
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(@Body() body: UserPostBody): Promise<void> {
    this.setStatus(201);
    await this.repository.save(body);
  }
}
