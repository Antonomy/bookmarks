require('dotenv').config()
const Bookmark = require('../../models/bookmark')
const User = require('../../models/user')

// delete bookmark
// create bookmark
// update bookmark

const destroyBookmark = async (req, res, next) => {
  try {
    const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id)
    res.locals.data.bookmark = deletedBookmark
    next()
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

const updateBookmark = async (req, res, next) => {
  try {
    const updatedBookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.locals.data.bookmark = updatedBookmark
    next()
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

const createBookmark = async (req, res, next) => {
  try {
    const createdBookmark = await Bookmark.create(req.body)
    const user = await User.findOne({ email: res.locals.data.email })
    user.bookmarks.addToSet(createdBookmark)
    await user.save()
    res.locals.data.bookmark = createdBookmark
    next()
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

const respondWithBookmark = (req, res) => {
  res.json(res.locals.data.bookmark)
}

module.exports = {
  destroyBookmark,
  updateBookmark,
  createBookmark,
  respondWithBookmark
}