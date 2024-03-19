import express from 'express';
import jwt from 'jsonwebtoken';


const app = express();
const secretKey = "bhaanoo123";
const port = 3000;

app.get('/', (req, res) => {
    res.json({
        name: "Bhaanoo",
        age: 30,
        email: 'bhaanoo@lohar'
    });
});

app.post('/login', (req, res) => {
    const user = {
        name: "Bhaanoo",
        age: 30,
        email: 'bhaanoo@lohar'
    };

    jwt.sign(user, secretKey, { expiresIn: '300s' }, (error, token) => {
        res.json({ token });
    });
});

app.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (error, authData) => {
        if (error) {
            res.status(403).json({ error: "Invalid Token" });
        } else {
            res.json({
                message: "Profile Accessed",
                authData
            });
        }
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.status(401).json({ error: "Token is Not Valid" });
    }
}

app.listen(port, () => {
    console.log(`Server is Running on ${port}`);
});
