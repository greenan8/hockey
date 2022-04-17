import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa"
import { DataSource } from "data/ormconfig"
import { Flat, uuid } from "./utilities/Types"
import { Division } from "data/entities/Division"

interface DivisionResponse extends Flat<Omit<Division, "conference">> {}

interface DivisionPostBody extends Flat<Omit<DivisionResponse, "id">> {}

interface DivisionPatchBody extends Flat<Omit<DivisionResponse, "id">> {}

@Route("divisions")
@Tags("Division")
export class DivisionController extends Controller {
    private repository = DataSource.getRepository(Division)

    @Get("{id}")
    public async getDivision(@Path() id: uuid): Promise<DivisionResponse> {
        return this.repository.findOneBy({ id: id })
    }

    @Get()
    public async listDivisions(): Promise<DivisionResponse[]> {
        return this.repository.find()
    }

    @Post()
    public async createDivision(@Body() body: DivisionPostBody): Promise<DivisionResponse> {
        return await this.repository.save(body)
    }

    @Patch()
    public async updateDivision(@Body() body: DivisionPatchBody): Promise<DivisionResponse> {
        return await this.repository.save(body)
    }

    @Delete("{id}")
    public async deleteDivision(@Path() id: uuid): Promise<void> {
        await this.repository.delete({ id: id })
    }
}
