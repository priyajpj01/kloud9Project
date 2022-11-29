

const User = require("../models/user");

module.exports = {
    /* Function for create order */
    createUsers: async (userData) => {
const existing=await User.findOne({email:userData.email})
if(existing)
throw new Error(` A user with email ${userData.email} already exists`)
        try {
            
            const user=new User(userData)
            await user.save()

            console.log("User saved")
            const token = await user.generateAuthToken()
            console.log(user)
            return {user,token}
            
        } catch (e) {
            return(e)

    }
},

findByCredentials : async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}
}