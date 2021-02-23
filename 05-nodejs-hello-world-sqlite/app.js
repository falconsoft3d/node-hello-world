var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('demo1.db3');

/*
db.serialize(function() {
    db.run("CREATE TABLE post (id INT, title TEXT)");
    var stmt = db.prepare("INSERT INTO post VALUES (?,?)");
    for (var i = 0; i < 10; i++) {
        var d = new Date();
        var n = d.toLocaleTimeString();
    }
    stmt.finalize();
    
});

db.each("SELECT id, title from post;", function(err, row) {
    console.log(row.id + ": " + row.title);
});

*/

// CASE 01
db.serialize(function() {
  db.run("CREATE TABLE lorem2 (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close();