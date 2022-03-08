
// npm i jsonwebtoken dotenv-safe

require("dotenv-safe").config();

const jwt = require('jsonwebtoken');

module.exports = {

    valide : async function(req, res, next) {

        //console.log(req.user);
        //if (req.user) return res.render("/");
        //console.log(req);
        
        const token = req.headers['Authorization'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
        jwt.verify(`${token}`.replace("Bearer ", ""), process.env.SECRET, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
            // se tudo estiver ok, salva no request para uso posterior
            req.user = decoded.user;
            next();
        });
    },

    login : async function(req, res) {

        const user = req.body.user;
        const pass = req.body.pass;

        if (user === process.env.USER_ID & pass === process.env.USER_SECRET) {

            const data = {
                user: user,
            };

            const token = jwt.sign(data, process.env.APP_SECRET, {
                expiresIn: 300 // expires in 5min
            });

            return res.json({ auth: true, token: token });
        }

        res.status(500).json({message: 'Login inválido!'});
    },

    logout : async function(req, res) {

        return res.json({ auth: false, token: null });
    }
}