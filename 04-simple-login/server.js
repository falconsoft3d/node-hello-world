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
    if(username === 'admin' && password === 'x1234567890' ){
        console.log("if ok");
        return done(null, {  id:1, name: 'Marlon' });
    }
    else{
        console.log("if no ok");
    }
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
        console.log(req.name);
        return next();
    }
    res.redirect("/login");
}  ,(req,res) =>{
    // Si ya iniciamos seccion, bienvenida.

    // Si no iniciamos, reirigimos al login.
    res.send("Hola Mundo");
});

app.get("/login", (req,res) =>{
   res.render("login");
});

app.get("/close", (req,res) =>{
    res.send("close");
 });

app.post("/login", passport.authenticate('local',{
    successRediret: "/",
    failureRedirect: "/login"
}));

app.listen(8000,() => console.log("Server Started"));