const express=require('express');
const mysql=require('mysql');
const cors=require('cors');

const app=express();
const port=8080;

app.use(cors({
    origin: '*',  // Replace with the URL where your frontend is running
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"alumni"
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});



app.post('/alumni', (req, res) => {
    const { name, email, mobile, password } = req.body;

    // SQL query to insert data into the 'users' table
    const query = 'INSERT INTO sign_up (name, email, mobile, password) VALUES (?, ?, ?, ?)';

    db.query(query, [name, email, mobile, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Failed to save user' });
        }

        res.status(200).json({ message: 'User successfully registered' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

/*

app.get('/', (re,res)=>{
    return res.json("from backend side");
})

app.get("/sign_up",(req,res)=>{
    const sql="select * from sign_up";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return err.json.data;
    })
})

app.listen (8081,()=>{
    console.log("listening");
})

*/