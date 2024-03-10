const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
  
app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

//Configuration (MONGODB)
var curl = "mongodb://localhost:27017";
var client = new MongoClient(curl); 


//STUDENT LOGIN MODULE
app.post('/login/student', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        users = db.collection('users');
        const { regNo, pass } = req.body;
        const user = await users.findOne({ regNo, pass });
        if (user) {
            // Successful login
            res.json({ success: true, message: 'Login successful' });
        } else {
            // Failed login
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        conn.close();
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

//COUNSELLOR LOGIN MODULE
app.post('/login/counsellor', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        users = db.collection('counsellor');
        const { counselorId, cpass } = req.body;
        const counsellor = await users.findOne({ counselorId, cpass });
        if (counsellor) {
            // Successful login
            res.json({ success: true, message: 'Login successful' });
        } else {
            // Failed login
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        conn.close();
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

//STUDENTHOME MODULE
app.post('/studenthome/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        users = db.collection('users');
        data = await users.find(req.body,{projection:{regNo : true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});


//COUNSELLORHOME MODULE
app.post('/counsellorhome/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        users = db.collection('counsellor');
        data = await users.find(req.body,{projection:{firstName: true,lastName: true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//ADMIN HOME MENU
app.post('/adminhome/adminmenu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        adminmenu = db.collection('adminmenu');
        data = await adminmenu.find({}).sort({mid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//ADMIN HOME SUB MENUS
app.post('/adminhome/adminmenus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        adminmenus = db.collection('adminmenus');
        data = await adminmenus.find(req.body).sort({smid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/registration/signup', async function(req, res) {
    try {
        const userData = req.body; // Assuming data is sent in the request body
        const conn = await client.connect();
        const db = conn.db('SDP41');
        const users = db.collection('users');

        const insertedData = await users.insertOne(userData);
        conn.close();

        // Send the inserted data as the response
        res.json(insertedData.ops[0]);
    } catch(err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Failed to insert data into the database." });
    }
});

app.get('/counselors', async function(req, res) {
    try {
        const conn = await client.connect();
        const db = conn.db('SDP41');
        const counselors = db.collection('counsellor');
        
        // Retrieve counselor data with counselorId projection
        const data = await counselors.find({}, { projection: { counselorId: 1 } }).toArray();
        conn.close();
        
        res.json(data);
    } catch(err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Failed to retrieve counselor data." });
    }
});







//View Student MODULE
app.get('/viewstudent/details', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        users = db.collection('users');
        data = await users.find().sort({ regNo: 1 }).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});



//ADMINHOME ADD Counsellor
app.post('/registration/addcounsellor', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        users = db.collection('counsellor');
        data = await users.insertOne(req.body);
        conn.close();
        res.json("Registered successfully...");
    }catch(err)
    {
        res.json(err).status(404);
    }
});


//View Counsellor MODULE
app.get('/viewcounsellor/details', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        users = db.collection('counsellor');
        data = await users.find().sort({ counselorId : 1 }).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});




//STUDENT HOME MENU
app.post('/studenthome/studentmenu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        studentmenu = db.collection('studentmenu');
        data = await studentmenu.find({}).sort({mid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//STUDENT HOME SUB MENUS
app.post('/studenthome/studentmenus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        studentmenus = db.collection('studentmenus');
        data = await studentmenus.find(req.body).sort({smid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});



//CHANGE PASSWORD
app.post('/cp/supdatepwd', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        users = db.collection('users');
        data = await users.updateOne({regNo : req.body.regNo}, {$set : {pass: req.body.pass}});
        conn.close();
        res.json("Password has been updated")
    }catch(err)
    {
        res.json(err).status(404);
    }
});


//MY PROFILE
app.post('/myprofile/sinfo', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('SDP41');
        users = db.collection('users');
        data = await users.find(req.body).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});