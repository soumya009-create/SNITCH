import app from "./src/app.js"
import { connection } from "./src/config/database.js"

connection()

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

