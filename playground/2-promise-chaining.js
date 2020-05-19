require('../src/db/mongoose')
const Task = require('../src/models/task')

deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5ebe2334c7957dad01ecad23').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})

// Task.findByIdAndDelete('5ebe2211b239c5acc6687e62').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })
