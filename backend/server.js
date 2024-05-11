require('dotenv').config()
PORT = 4000
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express()

app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbUser1:rWK5HJcCxZcdMnXS@cluster0.xo6zkdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.get('/', (req, res) => {
  res.json("Hello");
})

// Get all Users by userIds in the Database
app.get('/users', async (req, res) => {
  const client = new MongoClient(uri)

  try {
      await client.connect()
      const database = client.db('vdm')
      const users = database.collection('users')

      const returnedUsers = await users.find().toArray()
      res.send(returnedUsers)

  } finally {
      await client.close()
  }
})



app.listen(PORT, ()=>console.log("Server running on Port " + PORT))

