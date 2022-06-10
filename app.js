const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./db')
const User = require('./models/User')
const tableContent = require('./models/course');
const bcrypt = require('bcrypt')
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose')

const app = express();
const PORT = 3000;
connectDB()

require('./routes/passport')(passport);
 
app.set('view engine', 'ejs');

// app.use('/', require('./routes/index'))
app.use('Users', require('./routes/Users'))
app.use(express.json())

app.use(morgan('dev'));
// app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session())

app.use(flash())

app.use((req,res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg')
    next()
})

app.use(express.static('public'));
// app.use('/user', require('./router/user'))
// app.use("/css",express.static(path.join("node_modules/bootstrap/dist/css")))
// app.use("/js",express.static(path.join("node_modules/bootstrap/dist/js")))
// app.use("/js", express.static(path.join("node_modules/jquery/dist")))

// const db = " mongodb+srv://alozievictor:Chinagorom@cluster0.wrl1f.mongodb.net/timetable?retryWrites=true&w=majority"


app.get('/', (req, res) => res.render('index'))

app.get('/create', (req, res)=> res.render('create'))

app.get('/signup', (req, res) => res.render('signup'))

app.get('/login', (req, res) => res.render('login'));

app.post('/signup', (req, res) => {
    const {name, email, password, password1} = req.body;
    let errors =[];

    if(!name || !email || !password || !password1){
        errors.push[{ msg : 'please fill in all fileds',}]
    }

    if(name !== name || email !== email){
        errors.push[{msg : 'Invlid name or email', }]
    }

    if(password !== password1){
        errors.push[{msg : 'Password does not match'}]
    }

    if(password.length < 7){
        errors.push[{msg : 'password should be less the 15 characters'}]
    }

    if(password.length > 15 ){
        errors.push[{msg: 'password should be at list 6 characters'}]
    }

   if(errors.length > 0){
       res.render('signup', {errors, name, email, password, password1 })
       
   }else{

       User.findOne({email: email})
       .then(user => {
           if(user){
              errors.push({msg: 'email is already registered'}) ;
              res.render('signup', {errors, name, email, password, password1 })
           }else{
               const newUser = new User ({
                   name, 
                   email,
                   password,
                   password1
               });
               bcrypt.genSalt(10, (err, salt) => 
               bcrypt.hash(newUser.password, salt, (err, hash)=>{
                   if(err) throw err;
                   newUser.password = hash; 
                   newUser.save()
                   .then(user => {
                       req.flash('success_msg', 'your are now registered')
                       res.redirect('/login')
                   })
                   .catch(err => console.log(err))
               }))
           }
       })
    }
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:  '/create', 
        failureRedirect: '/login',
        failureFlash: true
    }) (req, res, next);
});

app.post('/create', (req, res) => {
    
})


app.post('./create', (req, res) => {
    const {courses, hour, period } = req.body;
    let errors = [];

    if(!courses || !hour || !period){
        errors.push[{msg : 'please fill all field'}]
    }

    if(courses.length >10){
        errors.push[{msg : 'courses more than 10'}]
    }
    tableContent.findAll({courses, hour, period})
    .then(tableContent => {
        if(tableContent){
            errors.push[{msg : 'courses already registered'}]
            res.render('create', {errors, courses, hour, period})
        }else{
            const newCourses = new courses ({ courses, hour, period })
            newCourses.save()
            .then(courses =>{
                res.redirect('/table')
            })
            .catch(err => console.log(err))
        }
    })

})

app.listen(process.env.PORT || PORT,()=>{
   console.log(`Listening at port ${PORT}`)
})