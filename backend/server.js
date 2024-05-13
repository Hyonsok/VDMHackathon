require('dotenv').config()
PORT = 4000
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')


app.use(cors())
app.use(express.json())
app.use(cors())


const { MongoClient, ServerApiVersion, Timestamp } = require('mongodb');
const uri = "mongodb+srv://vdm:AMzmEM3mXqbpvxDo@cluster0.xo6zkdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/img/');

  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
})

const upload = multer({ storage: storage })


app.get('/', (req, res) => {
  res.json("Hello");
})

// Get individual user
app.get('/user/:id', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.params.id;

  try {
      await client.connect()
      const database = client.db('vdm')
      const users = database.collection('users')

      const query = {user_id: userId}
      const user = await users.findOne(query)
      res.send(user)

  } finally {
      await client.close()
  }
})

// Upate matches
app.post('/matches/:id', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.params.id;
  const matchUserId = req.body.user_id;
  console.log(userId)
  console.log(matchUserId)

  try {
      await client.connect()
      const database = client.db('vdm')
      const users = database.collection('users')

      const query = {user_id: userId}
      const user = await users.findOne(query)
      if(!user) {
        return res.status(404).json({error: "User not found"})
      }

      await users.updateOne(
        { user_id: userId },
        { $addToSet: { matches: {'user_id': matchUserId }}}
      );

      const matchedQuery = {user_id: matchUserId}
      const matchedUser = await users.findOne(matchedQuery)
      if(!matchedUser) {
        return res.status(404).json({error: "User not found"})
      }
      await users.updateOne(
        { user_id: matchUserId },
        { $addToSet: { matches: {'user_id': userId }}}
      );
      res.status(200).json({ message: 'Match added successfully '})

  } catch(error) {
    console.log('Error updating matches:', error);
    res.status(500).json( { error: 'Internal server error' } );
  } finally {
      await client.close()
  }
})


// Upate likes
app.post('/likes/:id', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.params.id;
  const likeUserId = req.body.user_id;

  try {
      await client.connect()
      const database = client.db('vdm')
      const users = database.collection('users')

      const query = {user_id: userId}
      const user = await users.findOne(query)
      if(!user) {
        return res.status(404).json({error: "Usre not found"})
      }

      await users.updateOne(
        { user_id: userId },
        { $addToSet: { likes: {'user_id': likeUserId }}}
      );
      res.status(200).json({ message: 'Match added successfully '})

  } catch(error) {
    console.log('Error updating matches:', error);
    res.status(500).json( { error: 'Internal server error' } );
  } finally {
      await client.close();
  }
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
app.post('/register', upload.single('file'), async (req, res) => {
  const client = new MongoClient(uri)
  const { email, password, firstName, lastName, birthday, role, description, likes, matches, image, file } = req.body
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
      image: image,
      file: file,
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
  const { email, password } = req.body

  try {
    await client.connect()
    const database = client.db('vdm')
    const users = database.collection('users')

    const user = await users.findOne({ email })

    const correctPassword = await bcrypt.compare(password, user.hashed_password)

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24
      })
      res.status(201).json({ token, userId: user.user_id })
    }

    res.status(400).json('Invalid Credentials')

  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
});

// Create a new message
app.post('/messages', async (req, res) => {
  const client = new MongoClient(uri)
  const { from_userId, to_userId, message } = req.body;
  const timestamp = new Date(); // Current timestamp

  try {
    await client.connect()
    const database = client.db('vdm')
    const messages = database.collection('messages')
    const data = {
      timestamp: timestamp,
      from_userId: from_userId,
      to_userId: to_userId,
      message: message
    }
    const insertedMessage = await messages.insertOne(data)
    res.send(insertedMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get messages for a specific user
app.get('/messages/:id', async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({ $or: [{ from_userId: userId }, { to_userId: userId }] });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log("Server running on Port " + PORT))

