require('../src/db/mongoose')
const User = require('../src/models/user')

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5ebe06d4c1bcbba54eb60d52', 4).then((count) => {
    console.log(count)
}).catch((error)=>{
    console.log(error)

})

// User.findByIdAndUpdate('5ebe06d4c1bcbba54eb60d52', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

