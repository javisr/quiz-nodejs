var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;
console.log('DB_name ' + DB_name);
console.log('user ' + user);
console.log('pwd' + pwd);
console.log('protocol ' + protocol);
console.log('dialect ' + dialect);
console.log('port ' + port);
console.log('host ' + host);

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, {
  dialect: protocol,
  protocol: protocol,
  port: port,
  host: host,
  storage: storage, // solo SQLite (.env)
  omitNull: true // solo Postgres
});


// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comment'));

//Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Comment = Comment;
exports.Quiz = Quiz; // exportar definición de tabla Quiz

sequelize.sync().then(
  function() {
    Quiz.count().then(
      function(count) {
        if (count === 0) {
          Quiz.bulkCreate([{
            pregunta: "¿ Cual es el futuro de la web ?",
            respuesta: "nodejs",
            tematica: "tecnologia"
          }, {
            pregunta: "¿ Cual es la capital de Portugal ?",
            respuesta: "Lisboa",
            tematica: "otro"
          }, {
            pregunta: "¿ Cual es la capital de Italia ?",
            respuesta: "Roma",
            tematica: "otro"

          }]).then(function() {
            console.log("Base de datos inicializada");
          });
        }
      },
      function(err) {
        console.log('Error count ' + err);
      }
    );
  },
  function(err) {
    console.log('Error sync ' + err);
  }
);
