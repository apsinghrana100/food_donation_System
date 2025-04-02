import { Sequelize } from 'sequelize';
import dotenv from "dotenv";
dotenv.config();


// Connect with your local mysql databaseuse this
// const ConnectionSequelize = new Sequelize('dontationSystemDatabase','root','root',{

//     host:'localhost',
//     dialect:'mysql'
// });


// # Connect to Supabase via connection pooling with Supavisor.
const DATABASE_URL=process.env.DATABASE_URL

// # Direct connection to the database. Used for migrations.
// DIRECT_URL="postgresql://postgres.tdhpihekumbiclndhbzg:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

const ConnectionSequelize = new Sequelize(DATABASE_URL);
export default ConnectionSequelize;