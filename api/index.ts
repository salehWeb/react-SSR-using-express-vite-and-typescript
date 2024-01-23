import express from "express"

const api = express.Router();

export interface IData {
    name: string;
    phone: number;
}

export const data: IData = {
    name: "salih",
    phone: 2180924685343,
}

api.get("/", (req, res) => {
    return res.json({massage: "hello from test", data}).status(200)
})


export default api;
