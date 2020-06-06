import knex from "../database/connection"
import {Request, Response} from "express"

class PointsCrontoller{

    async create (request: Request, response: Response) {

        const {
            nome,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude,
            items
        } = request.body
    
        const trx = await knex.transaction()

        const point = {
            image: request.file.filename,
            nome,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude
        }
    
        const inserted_ids = await trx("points").returning("id").insert(point)
    
        const point_id = inserted_ids[0]
    
        const point_items = items
                            .split(",")
                            .map((item: string) => Number(item.trim()))
                            .map((item_id: number) => {
                                return {
                                    item_id,
                                    point_id: point_id,
                                }}
                            )
    
        await trx("point_items").insert(point_items)
    
        await trx.commit();
        
        return response.json({
            id: point_id,
            ...point // spread corporator
        })
    }

    async show(request: Request, response: Response){

        const {id} = request.params
        
        const point = await knex("points").where("id", id).first()

        if (!point) {
            return response.status(400).json({message: "Point not found."})
        }

        const serialized_point = {
            ...point,
            image_url: `http://192.168.15.7:3333/uploads/${point.image}`
        }

        const items = await knex("items")
            .join("point_items", "items.id", "=", "point_items.item_id")
            .where("point_items.point_id", id)
            .select("items.title")

        return response.json({point: serialized_point, items})
    }

    async index(request: Request, response: Response){
        
        // filtros de cidade, uf e items (Query Params)
        const {city, uf, items} = request.query 

        const parsed_items = String(items)
                            .split(",")
                            .map(item => Number(item.trim()))

        const points = await knex("points")
                            .join("point_items", "points.id", "=", "point_items.point_id")
                            .whereIn("point_items.item_id", parsed_items)
                            .where("city", String(city))
                            .where("uf", String(uf))
                            .distinct()
                            .select("points.*")

        const serialized_points = points.map(point => {
            return{
                ...point,
                image_url: `http://192.168.15.7:3333/uploads/${point.image}`
            }
        })

        return response.json(serialized_points)
    }
}

export default PointsCrontoller