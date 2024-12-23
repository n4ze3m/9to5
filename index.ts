import express from "express"
import { DateTime } from "luxon"
import { engine } from 'express-handlebars'

const app = express()
const HOST = "0.0.0.0"
const PORT = process.env.PORT || "3000"


const START_HOUR = 9
const END_HOUR = 17
const RICK_ROLL_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

app.use((req, res, next) => {
    const now = DateTime.now()
    const hour = now.hour
    const weekday = now.weekday

    if (weekday >= 1 && weekday <= 5 && hour >= START_HOUR && hour < END_HOUR) {
        next()
    } else {
        res.status(418).send("")
    }
})
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')


app.get("/", (req, res) => {
    const now = DateTime.now()
    const closing = now.set({ hour: END_HOUR, minute: 0, second: 0 })
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    res.render('home', {
        serverTime: now.toISO(),
        closingTime: closing.toISO(),
        timezone: timezone
    })
})

app.get("*", (req, res) => {
    res.redirect(RICK_ROLL_URL)
})

app.post("*", (req, res)=> {
    res.redirect(RICK_ROLL_URL)
})

app.patch("*", (req, res)=> {
    res.redirect(RICK_ROLL_URL)
})

app.put("*", (req, res)=> {
    res.redirect(RICK_ROLL_URL)
})

app.delete("*", (req, res)=> {
    res.redirect(RICK_ROLL_URL)
})


app.listen(+PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`)
})
