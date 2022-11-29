const { ROLE } = require('../src/data')


// returns registeration options on the basis of roles
// admin can create procurement manager,inspection manager and client
// procurement manager can create inspection manager and client
// inspection manager can't create user
var arrOptions=[]
function registerOptions(role) {
    if (role === ROLE.ADMIN) 
    {
        arrOptions.push(ROLE.PM)
        arrOptions.push(ROLE.IM)
        arrOptions.push(ROLE.Client)
        return arrOptions
    }
    if(role===ROLE.PM)
    {
        arrOptions.push(ROLE.IM)
        arrOptions.push(ROLE.Client)
        return arrOptions
    }
    if(role===ROLE.IM)
    {
        return "Don't have registeration accesss"
    }
   
}

// middleware to give access to admin and procurement manager to create user
function canRegisterUser(role) {
    return (
        role === ROLE.PM || role===ROLE.ADMIN
      )
}

// middleware to give access to procurement manager to create order

function canCreateOrder(role) {
    return (
      role === ROLE.PM
    )
  }
  
// middleware to give access to admin/procurement/inspection manager to update order status
function canUpdateOrder(role)
{
    return (
        role === ROLE.PM || role===ROLE.ADMIN || role===ROLE.IM
      )

}  

// middleware to give access to admin/cleint/procurement/inspection manager to view order status

function viewStatus(role)
{
    return (
        role === ROLE.PM || role===ROLE.ADMIN || role===ROLE.IM || role===ROLE.Client      )

}  

// middleware to give access to admin/cleint/procurement/inspection manager to view other users basis on roles

function scopedUser(role) {
    var filter={}
    if (role === ROLE.ADMIN) 
        return filter
    else
    {
        filter.owner=role 
        return filter
    }
        
}

module.exports = {
  canRegisterUser,
  registerOptions,
  scopedUser,
  canCreateOrder,
  canUpdateOrder,
  viewStatus
  
}