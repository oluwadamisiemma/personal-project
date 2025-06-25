import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


dotenv.config()
const app = express()
app.use(express.json())

// for the DB Setup
await mongoose.connect(process.env.MONGO)

// for the Models
const User = mongoose.model('User', new mongoose.Schema({
  email: String, password: String,
}))
const Meeting = mongoose.model('Meeting', new mongoose.Schema({
  title: String, date: Date, user: mongoose.Types.ObjectId,
}))

// now let for the Middleware
const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.sendStatus(401)
  try {
    const { id } = jwt.verify(token, process.env.SECRET)
    req.user = await User.findById(id)
    next()
  } catch {
    res.sendStatus(401)
  }
}

// for the Routes
app.post('/register', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10)
  const user = await User.create({ email: req.body.email, password: hash })
  res.send(user)
})

app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  const match = user && await bcrypt.compare(req.body.password, user.password)
  if (!match) return res.sendStatus(400)
  const token = jwt.sign({ id: user._id }, process.env.SECRET)
  res.send({ token })
})

app.post('/meetings', auth, async (req, res) => {
  const meeting = await Meeting.create({ ...req.body, user: req.user._id })
  res.send(meeting)
})

app.get('/meetings', auth, async (req, res) => {
  const meetings = await Meeting.find({ user: req.user._id })
  res.send(meetings)
})

app.listen(process.env.PORT, () => console.log('App Is Running'))
