import * as fs from "fs"

function main() {
    const nameLower = process.argv[2].replace(/(\W+)/gi, "-").toLowerCase()
    const nameUpper = nameLower.charAt(0).toUpperCase() + nameLower.slice(1)

    const entityTxt = fs
        .readFileSync("./scripts/new-entity/entity.txt", "utf8")
        .replace(/!name!/g, nameLower)
        .replace(/!NAME!/g, nameUpper)
    const controllerTxt = fs
        .readFileSync("./scripts/new-entity/controller.txt", "utf8")
        .replace(/!name!/g, nameLower)
        .replace(/!NAME!/g, nameUpper)

    fs.writeFileSync(`./src/data/entities/${nameUpper}.ts`, entityTxt)
    fs.writeFileSync(`./src/controllers/${nameUpper}Controller.ts`, controllerTxt)
}

main()
