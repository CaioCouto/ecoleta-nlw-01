import knex from "../database/connection"
import {Request, Response} from "express"

class ItemsController{
    // O nome utilizado, comumente, para métodos
    // de listagem é index
    async index(request: Request, response: Response) {
        
        const items = await knex("items").select("*").orderBy("id") // SELECT * FROM items
    
        const serialized_items = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.15.7:3333/uploads/${item.image}`
                //image_url: `${process.env.HOST || `http://localhost/:${process.env.PORT || 3333}`}/uploads/${item.image}`
            }
        })
    
        return response.json(serialized_items)
    }
}

export default ItemsController