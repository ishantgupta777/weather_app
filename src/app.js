const express = require('express')
const path = require('path')
const hbs  = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const indexPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(indexPath))

app.get('',(req,res)=>{
    res.render('index',{
        name:'Home page'
    })
})

app.get('/help',(req,res)=>{
    res.render('help')
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send('error : enter the address')
    }
    geocode(req.query.address,(error,data)=>{
        // console.log(data)
        if(error){
            return res.send(error)
        }
        forecast(data,(error,response)=>{
            if(error){
               return res.send(error)
            }
            res.send({
                forecast : `${data.location} : There is currently ${response.currently.temperature} degree out. There is ${response.currently.precipProbability}%chance of rain`,
                location : data.location,
                temperature : response.currently.temperature
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error : 'help page not found'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        error:'page not found'
    })
})

app.listen(port)