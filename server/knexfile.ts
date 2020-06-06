import path from "path"

module.exports = {
    client: "pg",
    connection:{
        user: "postgres",
        password: 126459,
        filename: path.resolve(__dirname, "src", "database", 'database.pg')
    },
    migrations: {
        directory: path.resolve(__dirname, "src", "database", "migrations")
    },
    seeds: {
        directory: path.resolve(__dirname, "src", "database", "seeds")
    }
}