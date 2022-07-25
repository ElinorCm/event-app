require("dotenv").config();
const express = require("express");
const session = require('express-session');
const router = require("./app/routers");
const cors = require("cors");
const app = express();


// Decode body
app.use(express.urlencoded({ extended: true })); // On parse les body de type `x-www-form-url-encoded` et on les ajoute au req.body
app.use(express.json()); // Pour parser les body de type JSON (optionnel car pas demandé par la spécification)

//Session utilisateur
app.use(session({
  saveUninitialized: true, //On créé la session d'initialisation
  resave: true, //on sauvegarde le cookie à chaque requête
  secret: process.env.SESSION_SECRET || 'insert a secret' //Mise en place d'un secret pour générer la clé.
}));

app.use(cors({
      origin:"http://sonow.herokuapp.com/"
  }));
// app.use(cors('*'));

app.use(express.static('dist'));

// Service /api routes
app.use("/api", router);



// Start app
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server up, listening at port : ${port}`);
});