const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());

const admin = require('firebase-admin');

const serviceAccount = require('./victtory1-eef5c-firebase-adminsdk-kwm2j-b383d8be79.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

app.get('/api/users', (req, res) => {
    admin.auth().listUsers()
      .then((userRecords) => {
        const users = userRecords.users.map(userRecord => userRecord.toJSON());
        res.json(users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
      });
  });

app.listen(3000, () => {
  console.log('Servidor Node.js en funcionamiento en el puerto 3000');
});