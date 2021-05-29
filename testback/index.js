const express = require("express");
const app = express();

const port = 3000

const admin = (req,res) => {
    res.send('Hello admin to the dashboard!')
};

const isAdmin = (req,res,next) => {
    console.log("isadmin is running");
    next();
};

app.get('/login', (req,res) => res.send('Hello login!'))

app.get('/admin',isAdmin,admin )


app.listen(port, () => console.log(`Example app listening to port ${3000}`))