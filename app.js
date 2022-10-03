
const express= require('express')
const mysql=require('mysql')
var app=express()

var bodyParser=require('body-parser')
var con= mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'prueba'
})

con.connect()

app.use( bodyParser.json() )

app.use(bodyParser.urlencoded({ 
	extended:true
}))

app.use(express.static('public'))

app.post('/agregarUsuario',(req,res) => {
	let nombre=req.body.nombre
	
	con.query('INSERT INTO usuario values("'+nombre+'")',(err,respuesta,fields)=> {
	
	if(err)return console.log('ERROR',err)
	
	return res.send('<h1> Nombre: </h1>'+nombre)
})
})

app.get('/getUsuarios',(req,res)=> {
	
	con.query('SELECT *FROM usuario',(err,respuesta,field)=>{
	if(err)return console.log('ERROR:',err)
		
	var userHTML=``
	var i=0
	console.log(respuesta)
	respuesta.forEach(user =>{
			i++
			userHTML+=`<tr><td>${i}</td><td>${user.nombre}</td></tr>`
	})
	
	return res.send(`<table>
		<tr>
			<th>id </th>
			<th>Nombre:</th>
		</tr>
		${userHTML}
		</table>`)
	})	
})



app.listen(8080,()=>{
	console.log('Servidor escuchando en el puerto 8080')
})










