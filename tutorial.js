var Mongoose = require('Mongoose');

var db = Mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('Conectado ao MongoDB.')
  // Vamos adicionar nossos Esquemas, Modelos e consultas aqui
	/*Mongoose também permite você criar funções auxiliares estáticas 
  para buscar seus dados. Para isso você deve atribuir sua função estática ao esquema antes de ser feita compilação para o modelo.*/
  
   movieSchema.statics.findAllWithCreditCookies = function(callback) {
  		return this.find({ hasCreditCookie: true }, callback);
   };

  /*Criando esquema.*/
  var movieSchema = new Mongoose.Schema({
  	title: { type: String },
  	rating: String,
  	releaseYear: Number,
  	hasCreditCookie: Boolean
  });

  /*Criando Modelo*/
  var Movie = Mongoose.model('Movie', movieSchema);

  /*Instânciando um filme.*/
  var thor = new Movie({
  title: 'Thor',
  rating: 'PG-13',
  releaseYear: '2011',  // Note o uso de String ao inves de Number
  hasCreditCookie: true
});

/*Persistindo filme*/
thor.save(function(err, thor) {
  if (err) return console.error(err);
  console.dir(thor);
});

// Buscando um unico filme pelo nome
Movie.findOne({ title: 'Thor' }, function(err, thor) {
  if (err) return console.error(err);
  console.dir(thor);
});

// Buscando todos os filmes
//movies é a coleção criada pelo mongoose ao criar o modelo movie.
Movie.find(function(err, movies) {
  if (err) return console.error(err);
  console.dir(movies);
});

// Buscando todos os filmes que possuem 'credit cookie'.
Movie.find({ hasCreditCookie: true }, function(err, movies) {
  if (err) return console.error(err);
  console.dir(movies);
});

});

Mongoose.connect('mongodb://localhost/teste');
