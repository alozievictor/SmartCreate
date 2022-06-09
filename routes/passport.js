const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/User');

module.exports = (passport) =>{
    passport.use(
        new localStrategy({usernameField: 'email'}, (email,password,done) => {
            User.findOne({email:email})
                .then(user => {
                    if(!user){
                        return done(null,false, {message : 'Email not registered'});
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch){
                            return done(null, user);
                        }else{
                            return done(null, false, {message : 'password incorrect'})
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    );
     
    // passport.serializedUser( (user, done) =>{
    //     done(null, user.id);
    // });

    // passport.deserializedUser((id, done)=>{
    //     User.findById(id,(err,user)=>{
    //         done(err, user)
    //     })
    // })
}