rm -r ./cdk/resources/layers/*
mkdir -p ./cdk/resources/layers/dependencies/nodejs/node_modules/
mkdir -p ./cdk/resources/layers/code/nodejs/node_modules

cp package.json package-lock.json ./cdk/resources/layers/dependencies/nodejs/node_modules/
cp -r ./src ./cdk/resources/layers/code/nodejs/node_modules
#npm install --prefix ./cdk/resources/layers/dependencies