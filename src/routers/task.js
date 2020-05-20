const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (request, response) => {

    const task = new Task({
        ...request.body,
        owner: request.user._id
    })

    try {
        await task.save()
        response.status(201).send(task)
    } catch (error) {
        response.status(400).send(error)
    }
})

router.get('/tasks', auth, async (request, response) => {

    try {
        // const tasks = await Task.find({owner:request.user._id})
        // response.send(tasks)
        // OR
        await request.user.populate('tasks').execPopulate()
        response.send(request.user.tasks)
    } catch (error) {
        response.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (request, response) => {
    const _id = request.params.id

    try {
        if (!_id.match(/[0-9a-fA-F]{24}$/)) {
            return response.status(404).send({ error: 'Task not found!' })
        }

        const task = await Task.findOne({ _id, owner: request.user._id })

        if (!task) {
            return response.status(404).send({ error: 'Task not found!' })
        }

        response.send(task)
    } catch (error) {
        response.status(500).send(error)
    }
})

router.patch('/tasks/:id', auth, async (request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return response.status(400).send({ error: 'Invalid updates!' })
    }

    try {

        // const task = await Task.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
        // const task = await Task.findById(request.params.id)
        const task = await Task.findOne({ _id: request.params.id, owner: request.user._id })

        if (!task) {
            return response.status(404).send()
        }

        updates.forEach((update) => task[update] = request.body[update])
        await task.save()
        response.send(task)
    } catch (error) {
        response.status(400).send(error)
    }
})

router.delete('/tasks/:id', auth, async (request, response) => {
    try {
        const task = await Task.findOneAndDelete({ _id: request.params.id, owner: request.user._id })

        if (!task) {
            return response.status(404).send()
        }

        response.send(task)
    } catch (error) {
        response.status(500).send(error)
    }
})

module.exports = router