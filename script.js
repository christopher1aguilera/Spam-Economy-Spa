// async function getApi(){
//     const { data } = await axios.get('https://mindicador.cl/api')
//     return data
//   }

// const axios = require('axios')
// const enviar = require('./mailer')
// const url = require('url')
// const http = require('http')
// const fs = require('fs')
// http
// .createServer(function (req, res) {
// let { correos, asunto, contenido } = url.parse(req.url, true).query
// getApi().then(datos => {
// let dolar = datos.dolar.valor
// let euro = datos.euro.valor
// let uf = datos.uf.valor
// let utm = datos.utm.valor
// let valores = 
// `<p>El valor del dolar el dia de hoy es:${dolar}<p>
// <p>El valor del euro el dia de hoy es:${euro}<p>
// <p>El valor del uf el dia de hoy es:${uf}<p>
// <p>El valor del utm el dia de hoy es:${utm}<p>`
// let mensaje =
// `<p>${contenido}<p>
// <p>${valores}<p>`
// if (req.url.startsWith('')) {
// res.setHeader('content-type', 'text/html')
// fs.readFile('index.html', 'utf8', (err, data) => {
// res.end(data)
// })
// }
// if (req.url.startsWith('/mailing')) {
// enviar(correos, asunto, mensaje)
// }
// })
// })
// .listen(3000)



const { v4: uuidv4 } = require('uuid')
const enviar = require('./mailer')
const url = require('url')
const http = require('http')
// Paso 1
const fs = require('fs')
http
.createServer(function (req, res) {
let { correos, asunto, contenido } = url.parse(req.url, true).query

if (req.url.startsWith('')) {
// Paso 2
res.setHeader('content-type', 'text/html')
// Paso 3
fs.readFile('index.html', 'utf8', (err, data) => {
res.end(data)
})
}
// Paso 4
if (req.url.startsWith('/mailing')) {
// enviar(correos, asunto, contenido)
if (correos !== '' && asunto !== '' && contenido !== ''){
    let myarray = correos.split(',')
    console.log(myarray)
enviar(correos.split(','), asunto, contenido)
res.write('se envio correo correctamente')
myarray.forEach(archivo => {
    fs.writeFile(uuidv4().slice(0, 6), archivo, () => {
        res.end()
        })
});
}
else {
    res.write('ocurrio error, verifique si completo correctamente lso campos')
}
}
})
.listen(3000)