const request = require('request')

const forecast = (data,callback)=>{
    const url = `https://api.darksky.net/forecast/4043e58f44f0db1538e9f562cbede554/${data.latitude},${data.longitude}?units=si`
    request({url : url , json : true},(error,response)=>{
        if(error){
            callback('something wrong with network connection',undefined)
        }else if(response.body.error){
            callback('wrong query,, try another one',undefined)
        }else{
            callback(undefined,response.body)
        }
    })
}

module.exports = forecast