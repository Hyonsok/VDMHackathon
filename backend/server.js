require('dotenv').config()
PORT = 4000
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()
const { v4: uuidv4 } = require('uuid');

app.use(cors())
app.use(express.json())
app.use(cors())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vdm:AMzmEM3mXqbpvxDo@cluster0.xo6zkdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


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

// Register User
app.post('/register', async (req, res) => {
  const client = new MongoClient(uri)
  console.log("hello")
  const { email, password, firstName, lastName, birthday, role, description, likes, matches} = req.body
  console.log(req.body)
  const generatedUserId = uuidv4()
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await client.connect()
    const database = client.db('vdm')
    const users = database.collection('users')

    const existingUser = await users.findOne({ email })

    if (existingUser) {
      return res.status(409).send('User already exists. Please login')
    }
    const sanitizedEmail = email.toLowerCase()

    const data = {
      user_id: generatedUserId,
      hashed_password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      birthday: birthday,
      role: role,
      description: description,
      email: sanitizedEmail,
      likes: likes,
      matches: matches,
    }

    const insertedUser = await users.insertOne(data)

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24
    })
    res.status(200).json({ token, userId: generatedUserId })

  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
})
// Log in to the Database
app.post('/login', async (req, res) => {
  const client = new MongoClient(uri)
  const {email, password} = req.body
  console.log(email)
  console.log(password)

  try {
      await client.connect()
      const database = client.db('vdm')
      const users = database.collection('users')

      const user = await users.findOne({email})

      const correctPassword = await bcrypt.compare(password, user.hashed_password)

      if (user && correctPassword) {
          const token = jwt.sign(user, email, {
              expiresIn: 60 * 24
          })
          res.status(201).json({token, userId: user.user_id})
      }

      res.status(400).json('Invalid Credentials')

  } catch (err) {
      console.log(err)
  } finally {
      await client.close()
  }
})

app.listen(PORT, () => console.log("Server running on Port " + PORT))

