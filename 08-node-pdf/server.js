var pdf = require('html-pdf');
var codigo = `<h1>Probando html-pdf</h1>
<p>Creamos nuestro PDF a partir de código HTML</p>`;

pdf.create(codigo).toFile('./salida.pdf', function(err, res) {
  if (err){
      console.log(err);
  } else {
  console.log(res);
  }
});