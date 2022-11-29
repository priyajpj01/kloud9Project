
const bcrypt = require("bcryptjs");
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
            return user
            
        } catch (e) {
            return(e)

    }
},

findByCredentials : async (email, password) => {
    
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login, please signup')
    }
    console.log(user)
    const isMatch = await bcrypt.compare(password, user.password)
    console.log("matched")
    if (!isMatch) {
        throw new Error('Unable to login,Please enter valid password')
    }

    return user
}
}