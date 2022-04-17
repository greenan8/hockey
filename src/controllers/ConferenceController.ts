import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from "tsoa"
import { DataSource } from "data/ormconfig"
import { Flat, uuid } from "./utilities/Types"
import { Conference } from "data/entities/Conference"

interface ConferenceResponse extends Flat<Omit<Conference, "divisions">> {}

interface ConferencePostBody extends Flat<Omit<ConferenceResponse, "id">> {}

interface ConferencePatchBody extends Flat<Omit<ConferenceResponse, "id">> {}

@Route("conferences")
@Tags("Conference")
export class ConferenceController extends Controller {
    private repository = DataSource.getRepository(Conference)

    @Get("{id}")
    public async getConference(@Path() id: uuid): Promise<ConferenceResponse> {
        return this.repository.findOneBy({ id: id })
    }

    @Get()
    public async listConferences(): Promise<ConferenceResponse[]> {
        return this.repository.find()
    }

    @Post()
    public async createConference(@Body() body: ConferencePostBody): Promise<ConferenceResponse> {
        return await this.repository.save(body)
    }

    @Patch()
    public async updateConference(@Body() body: ConferencePatchBody): Promise<ConferenceResponse> {
        return await this.repository.save(body)
    }

    @Delete("{id}")
    public async deleteConference(@Path() id: uuid): Promise<void> {
        await this.repository.delete({ id: id })
    }
}
