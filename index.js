const http = require('http')
require('dotenv').config()
const conf = require('./config/config')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const myAPIKey = process.env.myAPIKey
const info_weather = () => {
   const url =`http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${conf.default_city}` 
   http.get(url,(res) => {
    const {statusCode} = res
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`)
        return
    }
    res.setEncoding('utf8')
    let rowData = ''
    res.on('data',(chunk) => rowData += chunk)
    res.on('end', () => {
        let parseData = JSON.parse(rowData)
        console.log(`${parseData.location.name}, ${parseData.current.temperature}, ${parseData.current.weather_descriptions[0]}`)
        weather()
    })
}).on('error', () => {
    console.error(err)
})
}

const weather = () => {
readline.question('Хотите узнать погоду в другом городе? Y/N\n', answer => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        getWether()
        
    }else{
        readline.close()
    }
})
}


const getWether = () => {
    readline.question(' Введите город\n', town => {
    const url =`http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${town}` 
    http.get(url,(res) => {
        const {statusCode} = res
        if (statusCode !== 200){
            console.log(`statusCode: ${statusCode}`)
            return
        }
        res.setEncoding('utf8')
        let rowData = ''
        res.on('data',(chunk) => rowData += chunk)
        res.on('end', () => {
            let parseData = JSON.parse(rowData)
            console.log(`${parseData.location.name}, temp: ${parseData.current.temperature}, ${parseData.current.weather_descriptions[0]}`)
           weather()
        })
    }).on('error', () => {
        console.error(err)
        y
    })
})
}
info_weather()