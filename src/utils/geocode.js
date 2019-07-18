const request = require('request')

const geocode = (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaXNoYW50Z3VwdGE3NzciLCJhIjoiY2p5NDI5aXFpMTVvaDNnbGVhbTllZ2R3MyJ9.ndww9Z602MqyVtoiexGXqQ`
    request({url:url,json : true},(error,response)=>{
        if(error){
            callback('something wrong with network',undefined)
        }else if(response.body.features.length==0){
            callback('wrong query,,, try again',undefined)
        }else{
            callback(undefined,{
                latitude  : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode