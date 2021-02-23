const express = require('express');
const passport = require('passport');
const cookiesParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cookiesParser('Mi secreto'));

app.use(session({
    secret:'Mi secreto',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal( function(username, password, done) {
    console.log('Iniciando');
    if(username === 'admin' && password === 'x1234567890' ) return done(null, {  id:1, name: 'Marlon' });
    done(null,false);
}));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    done(null,{  id:1, name: 'Marlon' })
})

app.set('view engine', 'ejs');

app.get("/", (req, res, next) =>{
    if( req.isAuthenticated() ){
        return next();
        console.log("if( req.isAuthenticated() ){:::: SI");
    }
    res.redirect("/login");
}  ,(req,res) =>{
    res.render('index');
});

app.get("/login", (req,res) =>{
   res.render("login");
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login'); //Can fire before session is destroyed?
  });


app.post('/login',
passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('App listening on port ' + port));