const functions = require("firebase-functions");
const app = require("express")();

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore().collection("Cardapio");

app.get("/Cardapio", (req, res) => {
  db.get().then(function (docs) {
    // eslint-disable-next-line prefer-const
    let Cardapio = [];
    docs.forEach(function (doc) {
      Cardapio.push({
        id: doc.id,
        nome: doc.data().nome,
        valor: doc.data().valor,
        description: doc.data().description,
      });
    });
    res.json(Cardapio);
  });
});

app.post("/Cardapio", (req, res) => {
  const newCardapio = {
    nome: req.body.nome,
    valor: req.body.valor,
    description: req.body.description,
  };

  db.add(newCardapio).then(function () {
    res.status(200).json(null);
  });
});

exports.api = functions.https.onRequest(app);
