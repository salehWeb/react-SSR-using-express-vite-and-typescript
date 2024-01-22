import express from "express"

const api = express.Router();

interface IData {
    name: string;
    phone: number;
}

api.get("/", (req, res) => {
    const data: IData = {
        name: "salih",
        phone: 2180924685343,
    }
    return res.json({massage: "hello from test", data}).status(200)
})


export default api;
