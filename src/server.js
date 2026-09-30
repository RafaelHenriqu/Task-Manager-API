require("dotenv").config()

const app = require("./app")
const PORT = process.env.PORT || 5000



app.listen(PORT, (err) => {
    if (!err) {
        console.log("Starting Server!")
    } else {
        console.error(`Something failed when trying to start the Server ERROR -> ${err}`)
    }
})