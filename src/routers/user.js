const express = require('express')
const multer = require('multer')
// const sharp = require('sharp') // Aula 129. Auto-cropping and image formatting // npm i sharp@0.21.1
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelAccountEmail } = require('../emails/account')
const router = new express.Router()

router.post('/users', async (request, response) => {
    const user = new User(request.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        response.status(201).send({ user, token })
    } catch (error) {
        response.status(400).send(error)
    }
})

router.post('/users/login', async (request, response) => {
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password)
        const token = await user.generateAuthToken()
        response.send({ user, token })
    } catch (error) {
        response.status(400).send(error)
    }
})

router.post('/users/logout', auth, async (request, response) => {
    try {
        request.user.tokens = request.user.tokens.filter((token) => {
            return token.token !== request.token
        })

        await request.user.save()

        request.send()
    } catch (error) {
        response.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (request, response) => {
    try {
        request.user.tokens = []

        await request.user.save()

        request.send()
    } catch (error) {
        response.status(500).send()
    }
})

router.get('/users/me', auth, async (request, response) => {
    response.send(request.user)
})

router.patch('/users/me', auth, async (request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return response.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => request.user[update] = request.body[update])
        await request.user.save()

        response.send(request.user)
    } catch (error) {
        response.status(400).send()
    }
})

router.delete('/users/me', auth, async (request, response) => {
    try {
        await request.user.remove()
        sendCancelAccountEmail(request.user.email, request.user.name)
        response.send(request.user)
    } catch (error) {
        response.status(500).send(error)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000 // in bytes
    },
    fileFilter(request, file, callback) {

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please upload a jpg, jpeg or png file.'))
        }

        callback(undefined, true)
    }
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (request, response) => {
    // const buffer = await sharp(request.file.buffer).resize({width: 250, height: 250}).png().toBuffer
    // request.user.avatar = buffer

    request.user.avatar = request.file.buffer
    await request.user.save()
    response.send()
}, (error, request, response, next) => {
    response.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (request, response) => {
    try {
        request.user.avatar = undefined
        await request.user.save()
        response.send({ msg: "Avatar removed." })
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get('/users/:id/avatar', async (request, response) => {
    try {
        const user = await User.findById(request.params.id)

        if (!user || !user.avatar) {
            throw new Error({ error: 'Image not found' })
        }

        // response.set('Content-Type', 'image/png')
        response.set('Content-Type', 'image/jpg')
        response.send(user.avatar)
    } catch (error) {
        response.status(404).send()
    }
})

module.exports = router