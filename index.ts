import express from "express"
import { DateTime } from "luxon"
import { engine } from 'express-handlebars'
import momentTimezone from "moment-timezone"

const app = express()
const HOST = "0.0.0.0"
const PORT = process.env.PORT || "3000"
const DEFAULT_TIMEZONE = "America/New_York"
const DEFAULT_COUNTRY = "US"
const START_HOUR = 9
const END_HOUR = 17
const RICK_ROLL_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

const getTimezoneFromCountry = (countryCode: string) => {
    const timezones = momentTimezone.tz.zonesForCountry(countryCode)
    return timezones && timezones.length > 0 ? timezones[0] : DEFAULT_TIMEZONE
}
app.use((req, res, next) => {
    const countryCode = (req.headers['cf-ipcountry'] as string)?.toUpperCase() || DEFAULT_COUNTRY
    let userTimezone = getTimezoneFromCountry(countryCode)
    if (userTimezone === 'America/Adak') {
        userTimezone = DEFAULT_TIMEZONE
    }
    const now = DateTime.now().setZone(userTimezone)
    const hour = now.hour
    const weekday = now.weekday

    if (weekday >= 1 && weekday <= 5 && hour >= START_HOUR && hour < END_HOUR) {
        res.locals.timezone = userTimezone
        next()
    } else {
        res.status(418).send("")
    }
})
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')


app.get("/", (req, res) => {
    const now = DateTime.now().setZone(res.locals.timezone)
    const closing = now.set({ hour: END_HOUR, minute: 0, second: 0 })

    res.render('home', {
        serverTime: now.toISO(),
        closingTime: closing.toISO(),
        timezone: res.locals.timezone
    })
})

app.get("*", (req, res) => {
    res.redirect(RICK_ROLL_URL)
})

app.post("*", (req, res) => {
    res.redirect(RICK_ROLL_URL)
})

app.patch("*", (req, res) => {
    res.redirect(RICK_ROLL_URL)
})

app.put("*", (req, res) => {
    res.redirect(RICK_ROLL_URL)
})

app.delete("*", (req, res) => {
    res.redirect(RICK_ROLL_URL)
})


app.listen(+PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`)
})
