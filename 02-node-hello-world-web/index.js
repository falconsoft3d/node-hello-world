const http = require('http');
const webPort = 8080

http.createServer( (req, res) => {
    res.write('Hola Mundo');
    res.end();
})
.listen( webPort )

console.log(`Escuchando el puerto, ${webPort}`)