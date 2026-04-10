import express from 'express'
import cors from 'cors'
import { Mongo } from './database/mongo.js'
import { config } from 'dotenv' 
import authRouter from './auth/auth.js'
import usersRouter from './routes/users.js'
import platesRouter from './routes/plates.js'
import ordersRouter from './routes/orders.js'

config()

async function main () {
    const port = process.env.PORT || 3000

    const app = express()

    const mongoConnection = await Mongo.connect({
        mongoConnectionString: process.env.MONGO_CS,
        mongoDbName: process.env.MONGO_DB_NAME
    })

    const allowedOrigins = [
        "http://localhost:5173",
        "https://ratatouille.vercel.app"
    ]

    app.use(cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true)

            if (
                allowedOrigins.includes(origin) ||
                origin.endsWith(".vercel.app")
            ) {
                callback(null, true)
            } else {
                callback(new Error("Not allowed by CORS"))
            }
        },
        credentials: true
    }))

    app.use(express.json())

    app.get('/', (req, res) => {
        res.send({
            success: true,
            statusCode: 200,
            body: 'Welcome to Ratatuille!'
        })
    })

    app.use('/auth', authRouter)
    app.use('/users', usersRouter)
    app.use('/plates', platesRouter)
    app.use('/orders', ordersRouter)
    
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}

main()
