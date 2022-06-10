const express = require('express')
const fs = require('fs')
const app = express()
const puerto = 8080

class Contenedor {
    constructor(documento) {
        this.documento = documento;
    }

    async getAll() {
        try {
            return JSON.parse(
            await fs.promises.readFile(`./desafio3/${this.documento}`, "utf-8")
          );
        } catch (e) {
            console.log(` error desde metodo getAll`, e)
        }
    }
}

app.listen(puerto, () => {
    try {
        console.log(`Servidor iniciado en puertooooooo ${puerto}`)
    }catch(e) {
        console.log('el servidor no inició correctamente',e)
    }
})

app.get('/', (req, res) => {
    res.send(

       ` <h1 style="color: blue" >Don Cafetero</h1> `

    )
})

app.get('/productos', async (req, res) => {
    let productos = await new Contenedor('productos.txt').getAll()

    res.send( `<h1 style="color: blue">Listado de Cafe</h1> <ul style="list-style: none"> ${productos.map(prod => {
        let list = `<li><img src='${prod.thumbnail}' style="width: 30px" /><p>${prod.nombreProducto}, </p><p> Precio:$ ${prod.precio}</p></li>`

        return list
    })}</ul>` )
} )


app.get('/productoRandom', async (req, res) => {

    let productos = await new Contenedor('productos.txt').getAll()
    let random =Math.floor( Math.random() * productos.length);

    res.send(
        `<img src='${productos[random].thumbnail}' style="width: 100px" /><br>${productos[random].nombreProducto}, <br> Precio:$ ${productos[random].precio}`
    )
})
