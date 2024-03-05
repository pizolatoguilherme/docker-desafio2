const express = require('express');
const {
   Repository
} = require('./repository');
const app = express();

app.get('/', async (_, res) => {
   const selectSql = `SELECT * FROM people`;
   const people = await Repository.query(selectSql);

   const title = '<h1>Full Cycle Rocks!</h1>';
   const list = `
    <ul>
      ${people.map(p => `<li>${p.name}</li>`).join('')}
    </ul>
  `;

   res.send(title + list);
});


var sql = "CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id))";
Repository.query(sql, function (err, result) {
   if (err) throw err;
   console.log("Tabela criada");
});


app.listen(3000, () => {
   console.log('Running on port 3000');

   var sql = "INSERT INTO people (name) values ('Guilherme'), ('Pizolato'), ('FullCycle'), ('Desafio'), ('Go'), ('MySQL')";
   Repository.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Registro inserido");
   });

});