name=$1
dir="src/data/migrations"
./node_modules/.bin/ts-node -r tsconfig-paths/register ./node_modules/.bin/typeorm migration:generate -p true -d src/data/ormconfig.ts "${dir}/${1}"