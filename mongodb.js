// const { MongoClient, ObjectID } = require('mongodb')

// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     if (error) {
//         return console.log('Unable to connecto to database.')
//     }

//     const db = client.db(databaseName)

//     db.collection('tasks').deleteOne({
//         description: 'SBPJor'
//     }).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
// })

//     db.collection('tasks').updateMany({
//         completed: false
//     }, {
//         $set: {
//             completed: true
//         }
//     }).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })

//     // db.collection('users').updateOne({
//     //     _id: new ObjectID('5ebcb39468db1c94d046ce04')
//     // }, {
//     //     $inc: {
//     //         age: 1
//     //     }
//     // }).then((result) => {
//     //     console.log(result)
//     // }).catch((error) => {
//     //     console.log(error)
//     // })

// })







    // db.collection('users').findOne({ name: 'Jehn', age: 1 }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to find user.')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID('5ebcb703c29d5c958a2ab8ef') }, (error, task) => {
    //     if (error) {
    //         return console.log('Unable to find task.')
    //     }

    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     console.log(tasks)
    // })
// })
