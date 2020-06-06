import knex from "knex"
import path from "path"

const connection = knex({
    client: "pg",
    connection:{
        user: "postgres",
        password: "126459",
        filename: path.resolve(__dirname, 'database.pg')
    }
})

export default connection