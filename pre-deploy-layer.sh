echo "✅ Limpiando Todo"
rm -r ./cdk/resources/layers/*

echo "✅ Eliminando todas las carpetas"
mkdir -p ./cdk/resources/layers/dependencies/nodejs
mkdir -p ./cdk/resources/layers/code/nodejs/node_modules

echo "✅ Compilando proyecto CalculateDate"
npm run build

echo "✅ Copiando Layer de dependencias en el CDK"
cp package.json package-lock.json ./cdk/resources/layers/dependencies/nodejs/
npm ci --prefix ./cdk/resources/layers/dependencies/nodejs/

echo "✅ Copiando Layer de codigo en el CDK"
cp -r ./dist/ ./cdk/resources/layers/code/nodejs/node_modules/@code

echo "✅ Copiando CDK"
npm run cdk:compile 

## debe comprimir la layer porque demora mucho en subir