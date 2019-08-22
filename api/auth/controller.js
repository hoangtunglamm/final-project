const adminModel = require('../admin/model')
const bcypt = require('bcryptjs');
const session = require('express-session')
const login = ({adminname, password}) =>{
    return new Promise( (resolve, reject) =>{
        adminModel.findOne({adminname})
        .then(adminFound =>{
           
            if(!adminFound || !adminFound.password){
                reject({
                    statusCode: 400, 
                    err: "Wrong name!"
                })
            }
           
                else{
                    bcypt.compare(password, adminFound.password)
                    .then(compareResult =>{
                        if(compareResult){
                            resolve({adminname: adminFound.adminname, adminId: adminFound._id})
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