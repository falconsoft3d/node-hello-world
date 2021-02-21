const express = require('express')
const hbs = require('hbs');

const app = express()
const port = 8080;
app.set('view engine', 'hbs' );
app.use( express.static('public'));

app.get('/',  (req, res) => {
    res.render('home',{
      nombre: 'Marlon',
      titulo: 'Curso de Node'
    });
  });


app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, ()=>{
    console.clear();
    console.log(('Esta corriendo en el puerto: %s'), port);
})