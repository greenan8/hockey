import { Body, Controller, Delete, Get, Patch, Path, Post, Query, Route, Tags } from "tsoa"
import { DataSource } from "data/ormconfig"
import { Flat, integer, uuid } from "./utilities/Types"
import { Division } from "data/entities/Division"

// TODO: Use `Pick` or `Omit` to control what is publicly exposed
interface DivisionResponse extends Flat<Omit<Division, "conference">> {}

interface DivisionPostBody extends Flat<Omit<DivisionResponse, "id">> {}

interface DivisionPatchBody extends Partial<DivisionPostBody> {}

@Route("divisions")
@Tags("Division")
export class DivisionController extends Controller {
    private repository = DataSource.getRepository(Division)

    /**
     * Returns a `division` matching the provided `id`
     */
    @Get("{id}")
    public async getDivision(@Path() id: uuid): Promise<DivisionResponse> {
        return this.repository.findOneBy({ id })
    }

    /**
     * Returns a list of `divisions` matching the provided query parameters
     */
    @Get()
    public async listDivisions(@Query() skip: integer = 0, @Query() limit: integer = 20): Promise<DivisionResponse[]> {
        return this.repository.find({ skip, take: Math.min(limit, 20) })
    }

    /**
     * Create a new `division` record
     */
    @Post()
    public async createDivision(@Body() body: DivisionPostBody): Promise<DivisionResponse> {
        return await this.repository.save(body)
    }

    /**
     * Updates an existing `division` record
     */
    @Patch("{id}")
    public async updateDivision(@Path() id: uuid, @Body() body: DivisionPatchBody): Promise<DivisionResponse> {
        await this.repository.save({ id, ...body })
        return this.repository.findOneBy({ id })
    }

    /**
     * Deletes a `division` matching the provided `id`
     */
    @Delete("{id}")
    public async deleteDivision(@Path() id: uuid): Promise<void> {
        await this.repository.delete({ id: id })
    }
}
