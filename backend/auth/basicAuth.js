const { ROLES } = require("../server");

function loginRequirement(req, res, next){
    if(!req.session.user){
        res.status(403);
        return res.send('You need to login');
    }

    next();
}


function authRole(role){
    return (req,res,next)=> {
        if(req.session.user.role !== role){
            res.status(401);
            return res.send('Not allowed');
        }

        next();
    }
}


// allow the admin to CRUD and only the user who creates the item
function allowCRUD(user, item){
    return(
        user.role === ROLES.ADMIN ||
        user.id === item.id 
    )
}


module.exports = {
    loginRequirement,
}