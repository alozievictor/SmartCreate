const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'))

router.get('/create', (req, res)=> res.render('create'))

router.get('/login', (req, res) => res.render('login'));

router.get('/signup', (req, res) => res.render('signup'))

router.post('/login', (req, res) => {
    const {name, email, password, password1} = req.body;
    let errors =[];

    if(!name || !email || !password || !password1){
        errors.push[{ msg : 'please fill in all fileds'}]
    }

    if(name !==name || email !==email){
        errors.push[{msg : 'Invlid name or email'}]
    }

    if(password !== password1){
        errors.push[{msg : 'Password does not match'}]
    }

    if(password.length < 7){
        if(password.length > 15 ){
            errors.push[{msg: 'password to long'}]
        }
        errors.push[{msg : 'password to short'}]
    }
})

module.exports = router;