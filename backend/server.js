import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
import path from "path";


import productRoutes from "./routes/product.route.js"


dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000
app.use(express.json()) //allows us to accept JSON data in the req.body

app.use("/api/products",productRoutes)

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist"))); // serve the static react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


app.listen(PORT, ()=>{
    connectDb();
    console.log("App started on port 5000 at http://localhost:" + PORT)
})
