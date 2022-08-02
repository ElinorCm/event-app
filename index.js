require("dotenv").config();
const express = require("express");
const session = require('express-session');
const router = require("./app/routers");
const cors = require("cors"); 
const app = express();
const { errorHandler } = require('./app/services/errorHandler');


// Decode body
app.use(express.urlencoded({ extended: true })); // On parse les body de type `x-www-form-url-encoded` et on les ajoute au req.body
app.use(express.json()); // Pour parser les body de type JSON (optionnel car pas demandé par la spécification)

//Session utilisateur
app.use(session({
  saveUninitialized: true, //On créé la session d'initialisation
  resave: true, //on sauvegarde le cookie à chaque requête
  secret: process.env.SESSION_SECRET || 'insert a secret' //Mise en place d'un secret pour générer la clé.
}));


app.use(express.static('dist'));

app.use("/", cors({ origin: "*" }), function(req, res, next) {
  res.send("Route pour swagger")
});

// Service /api routes
app.use("/api", cors({ origin: "*" }), router);

router.use((err, _, response, next) => {
  errorHandler(err, response, next);
});


// Start app
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server up, listening at port : ${port}`);
});