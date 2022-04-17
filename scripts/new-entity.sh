name=$1

entity="./src/data/entities/${nameUpper}.ts"
controller="./src/controllers/${nameUpper}Controller.ts"

echo -n ${name^} ""

# cp "./scripts/new-entity/entity.txt" $entity
# cp "./scripts/new-entity/controller.txt" $controller

# sed -i "s/!name!/${name@L}/g" $entity
# sed -i "s/!NAME!/${name}/g" $entity
# sed -i "s/!name!/${nameLower}/g" $controller
# sed -i "s/!NAME!/${name}/g" $controller

