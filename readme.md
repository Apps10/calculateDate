# 📦 Test Holidays – AWS CDK + Express + Lambda Layers

Proyecto que implementa arquitectura hexagonal y **API Serverless** en AWS utilizando **AWS CDK**, **Lambda Functions**, **Layers** y **API Gateway**.  
El objetivo principal es calcular **fechas hábiles** en Colombia considerando:
- 🗓️ **Festivos nacionales**
- ⏱️ **Horarios laborales** (lunes a viernes, 8 AM – 5 PM, con almuerzo de 12 PM – 1 PM)
- 🌎 **Zona horaria** (America/Bogota)

---

## 🚀 Arquitectura
```bash
root/
│
├─ cdk/ # Infraestructura como código (AWS CDK)
│ ├─ bin/ # Entry point de CDK (aws.ts)
│ ├─ lib/ # Stacks de CDK (Lambda + Layers)
│ ├─ resources/
│ │ ├─ lambdas/ # Código fuente de Lambdas (TypeScript)
│ │ └─ layers/ # Layers con dependencias compartidas
│ └─ dist/ # Código compilado de resources (output de tsc)
│
├─ src/ # Código principal de la aplicación
│ ├─ application/ # Casos de uso (lógica de negocio)
│ ├─ domain/ # Entidades y modelos de dominio
│ └─ infraestructure/ # Adaptadores, servicios y gateways
│
│─ dist/ # Código compilado de src (output de tsc)
├─ shared/ # Código compartido (config, utils, etc.)
├─ pre-deploy.sh # Scripts para preparar antes de desplegar
└─ README.md
``` 

- **Lambda**: Calcula fechas hábiles a partir de parámetros (fecha, días, horas).
- **Layers**: Contienen dependencias comunes (`node_modules` y código compartido en `code/`).
- **API Gateway**: Expone la función como un endpoint HTTP.
- **Express**: Usado en desarrollo local .

---

## 🛠️ Tecnologías

- [AWS CDK](https://docs.aws.amazon.com/cdk/) (Infraestructura como código)
- [Node.js](https://nodejs.org/) (Runtime de Lambda)
- [TypeScript](https://www.typescriptlang.org/) (Tipado fuerte)
- [Express](https://expressjs.com/) (API local para testing)
- [Layers](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html) para dependencias compartidas

---

## 📂 Estructura de Stacks

- **LambdaStack**  
  Crea la API Gateway, la Lambda , Roles y permisos necesarios.  
  Incluye:
  - **calculateDateLambda**: Lambda principal que calcula la fecha hábil.
 
- **LayersStack**  
  Crea las Layers.  
  Incluye:
  - **codeLayer**: Capa con código compartido (`code/`).
  - **depsLayer**: Dependencias NPM externas.

---

## ⚡ Configuración y despliegue

### 1️⃣ Prerrequisitos
- **Node.js** ≥ 18
- **AWS CLI** configurado con credenciales (`aws configure`) debes tener un perfil por defecto
- **CDK CLI** instalado globalmente  

```bash
  cp .env.example .env #se deben setear las variables de entorno (accountId, port, region )
  npm install -g aws-cdk
```
Cuenta de AWS con permisos para Lambda, S3 y CloudFormation.

2️⃣ Instalación de dependencias
```bash
npm install

cd cdk && npm install && cd ..
```


3️⃣ Despliegue de layers
```bash
npm run cdk deploy:layers
```
⚡ tsc compila a cdk/dist conservando archivos .ts para depuración.


4️⃣ Para desplegar solo las Lambdas (sin volver a subir layers pesadas):
```bash
npm run cdk:deploy:lambdas
```


## 🧩 Endpoints
Una vez desplegado, el API Gateway expone un endpoint similar a:

```bash
https://{api-id}.execute-api.{region}.amazonaws.com/prod/calculate
```

Ejemplo de request:
```bash
curl "https://{api-id}.execute-api.{region}.amazonaws.com/prod/calculate?date=2025-09-22T13:58:55.961Z3&days=3&hours=8"
```

Respuesta:
```bash
{
  "date": "2025-09-29T08:00:00Z"
}
```

### 🗂️ Layers
El proyecto utiliza 2 Layers:

#### codeLayer: Código compartido interno (@code/*).

#### depsLayer: Dependencias NPM de terceros.

#### Esto permite:

Reducir el tamaño del paquete de cada Lambda.

Reutilizar dependencias sin reinstalar en cada función.

💡 Optimización de despliegue
Deploy por stack: Si separas Layers en un stack independiente, puedes desplegarlas solo cuando cambien:

```bash
pm run cdk deploy:layers   # solo cuando cambien dependencias
pm run cdk deploy:lambda      # despliegue de lambdas
Cache de dependencias: Usa npm ci y un package-lock.json limpio para reducir el tiempo de bundling.
```

### 🧪 Desarrollo local
Para probar la lógica de fechas sin desplegar en AWS:

```bash
npm run start:express
Esto levanta un servidor Express en http://localhost:3000 que simula el comportamiento de la Lambda.
```


### 🧪 Test Unitarios
Para probar correr los test:

```bash
npm run test
Esto ejecuta algunos test unitarios del dominio
```