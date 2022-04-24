import * as fs from "fs"
import * as handlebars from "handlebars"
import * as commandLineArgs from "command-line-args"

enum Operation {
    GET = "GET",
    LIST = "LIST",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

const optionsDefinition = [
    { name: "name", type: String, optional: false, alias: "n", description: "name of this new entity" },
    {
        name: "columns",
        type: String,
        alias: "c",
        multiple: true,
        description: "a list properties that will exist on this new entity",
    },
    {
        name: "operations",
        type: String,
        alias: "o",
        multiple: true,
        description: "a list of https operations for this new entity",
    },
]

const lower = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)
const upper = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)
const includes = <T>(value: T, list: T[]) => list.includes(value)

const formatOperations = (inputs: unknown[]): Operation[] => {
    const operations = Object.values(Operation) as string[]
    const outputs: Operation[] = []

    for (const input of inputs) {
        if (typeof input === "string" && operations.includes(input.toUpperCase())) {
            outputs.push(input.toUpperCase() as Operation)
        }
    }

    return outputs
}

function main() {
    const options = commandLineArgs(optionsDefinition)

    if (!options.name) {
        console.error("ERROR: A `name` argument (`--name` or `-n`) must be provided.")
        return
    }

    const context = {
        name: options.name,
        columns: options.columns?.length ? options.columns : [],
        operations: options.operations?.length ? formatOperations(options.operations) : Object.values(Operation),
    }

    handlebars.registerHelper("lower", lower)
    handlebars.registerHelper("upper", upper)
    handlebars.registerHelper("includes", includes)

    // save entity file
    fs.writeFileSync(
        `./src/data/entities/${upper(context.name)}.ts`,
        handlebars.compile(fs.readFileSync("./scripts/new-entity/entity.hbs", "utf8"))(context)
    )

    // save controller file
    fs.writeFileSync(
        `./src/controllers/${upper(context.name)}.ts`,
        handlebars.compile(fs.readFileSync("./scripts/new-entity/controller.hbs", "utf8"))(context)
    )

    // save controller test file
    fs.writeFileSync(
        `./src/controllers/${upper(context.name)}.test.ts`,
        handlebars.compile(fs.readFileSync("./scripts/new-entity/controller.test.hbs", "utf8"))(context)
    )

    console.log(`New ${context.name} entity created.`)
}

main()
