const userModel = require('../user/model')
const bcypt = require('bcryptjs');
const session = require('express-session')
const login = ({username, password}) =>{
    return new Promise( (resolve, reject) =>{
        userModel.findOne({username})
        .then(userFound =>{
           
            if(!userFound || !userFound.password){
                reject({
                    statusCode: 400, 
                    err: "Wrong name!"
                })
            }
           
                else{
                    bcypt.compare(password, userFound.password)
                    .then(compareResult =>{
                        if(compareResult){
                            resolve({username: userFound.username, userId: userFound._id})
                        }
                        else{
                            reject({
                                statusCode: 401,
                                err: "Wrong password!"
                            })
                        }
                    })
                }
            
        })
        .catch(err => reject({
            statusCode : 500,
            err
        }))
     })
}

// const logout = (req, res) => {
//     if(!req.session){
//         console.log('1234')
//     }

// };

module.exports = {login}