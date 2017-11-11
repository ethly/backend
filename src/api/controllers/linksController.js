import mongoose from 'mongoose'

const Link = mongoose.model('Links')

exports.listAllLinks = (req, res) => {
  Link.find({}, (err, task) => {
    if (err) { res.send(err) }
    res.json(task)
  })
}

exports.createLink = (req, res) => {
  let newLink = new Link(req.body)
  newLink.save((err, task) => {
    if (err) { res.send(err) }
    res.json(task)
  })
}

exports.readLink = (req, res) => {
  Link.findById(req.params.linkId, (err, task) => {
    if (err) { res.send(err) }
    res.json(task)
  })
}
