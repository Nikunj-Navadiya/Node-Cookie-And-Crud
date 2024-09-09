const UserModel = require('../models/UserModel');

//Login page Satart
const loginPage = (req, res) => {
    if (req.cookies['auth']) {
        return res.redirect('/dash');
    }
    return res.render('login');
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });

        if (!user || user.password != password) {
            console.log(`Email and Password not valid`);
            return res.redirect('/');
        }

        res.cookie('auth', user);
        return res.redirect('/dash')

    } catch (err) {
        console.log(err);
        return false;
    }
}
//Login Page End


//Register Page Start
const registerPage = (req, res) => {
    return res.render('register');
}

const registerRecord = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await new UserModel({
            name: name,
            email: email,
            password: password
        }).save();
        console.log("record successfully add");

        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;
    }
}
//Register Page End


//Logout Page Start
const dashboardPage = (req, res) => {
    if (!req.cookies['auth']) {
        return res.redirect('/');
    }
    return res.render('dash');
}
const logout = (req, res) => {
    return res.clearCookie('auth').redirect('/');
}
//Logout Page End



module.exports = {
    loginPage, registerPage, registerRecord, loginUser, dashboardPage, logout
}