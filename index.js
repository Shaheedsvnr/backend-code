const express = require('express');
const connectToMongo=require('./db');
const Student = require('./modal/student.js');
connectToMongo();

const Staff = require('./modal/staff.js');
connectToMongo();

const Admin = require('./modal/admin.js');
connectToMongo();

// const student = require('./modal/student');

const app = express();
app.use(express.json());
const port = 5005;
const time=new Date().toLocaleTimeString();
const date=new Date().toLocaleDateString();

const cors = require('cors');
app.use(cors());
// app.use(cors({
//     origin: "https://localhost:3000"
// }
// ))

app.get('/test', (req, res) =>{
    console.log('Hello Shaheed...');
    res.send('good morning...\n Time : '+time+", Date : "+date);
})

app.get('/shaheed', (req, res) =>{
    console.log('Its second attempt!!');
    res.send('This is your second API');
})

app.use('/api/route', require('./routes/test.js'))

app.use("/api/student", require('./routes/student_route.js')
// async (req, res)=>{
//     try {
//         const { name , phone , email , address } = req.body
        //checking the mail
//         let checkMail = await Student.findOne({ email });
//         if(checkMail){
//             console.log("----------------------------------------------------------------")
//             console.log(" Email is Already exist, Please provide another email ID !")
//             console.log("----------------------------------------------------------------")
//             return res.status(400).json({errors : " Email already exist !"})
//         }
        
//         const student = new Student({name, phone, email, address})
//         const savedStudents = await student.save();
//         let success = true;
//         res.json({ success , savedStudents })
//     }
//     catch (error) {
//         console.error(" Some error occurred : " + error)
//         res.status(500).json(' Some internal error ');
//     }
// }these codes are divided and pasted in the controller.
)

// api route for admin
app.use("/api/admin", require('./routes/admin_route.js'));


app.post("/api/staff/insert", async (req, res)=>{
    try {
        //destructuring----req.body-front end
        const { staff_name,  staff_phone, staff_email, staff_address } = req.body
        //checking the staff's contact number
        let checkStaff_Phone = await Staff.findOne({ staff_phone });
        if(checkStaff_Phone){
            console.log("----------------------------------------------------------------")
            console.log(" Phone number is Already exist, Please provide another Phone number !")
            console.log("----------------------------------------------------------------")
            return res.status(400).json({errors : " Phone number already exist !"})
        }
        const staff = new Staff({ staff_name, staff_phone, staff_email, staff_address })
        const savedStaffs = await staff.save();
        let staff_success = true;
        res.json({ staff_success , savedStaffs })
    }
    catch(error){
        console.error(" Some error occurred : " + error)
        res.status(500).json(' Some internal error ');
    }
})

app.use('/api/teacher',require('./routes/teacher_route'));

app.listen(port,()=>{
    console.log("\n--------------------------------------------")
    console.log(`App listening on port - ${port}`);
})