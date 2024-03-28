To start use node version 18
-> npm i
-> npm run seed
-> npm run dev


create a .env
POSTGRES_URL="postgres://default:tNRUS83BjTpr@ep-red-mountain-a4bidj5z-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_PRISMA_URL="postgres://default:tNRUS83BjTpr@ep-red-mountain-a4bidj5z-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NO_SSL="postgres://default:tNRUS83BjTpr@ep-red-mountain-a4bidj5z-pooler.us-east-1.aws.neon.tech:5432/verceldb"
POSTGRES_URL_NON_POOLING="postgres://default:tNRUS83BjTpr@ep-red-mountain-a4bidj5z.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_USER="default"
POSTGRES_HOST="ep-red-mountain-a4bidj5z-pooler.us-east-1.aws.neon.tech"
POSTGRES_PASSWORD="tNRUS83BjTpr"
POSTGRES_DATABASE="verceldb"

AUTH_SECRET=
AUTH_URL=http://localhost:3000/api/auth
