const express = require("express");

const app = express();
app.use(express.json());

const students = [
    { attendence: 80, uid: 108234, total_subject: 14, bonus: 20, name: 'Dax' },
    { attendence: 86, uid: 108235, total_subject: 13, bonus: 2, name: 'Anand' },
    { attendence: 88, uid: 108236, total_subject: 17, bonus: 0, name: 'Harshit' },
    { attendence: 90, uid: 108237, total_subject: 14, bonus: 11, name: 'Ridhab' },
    { attendence: 94, uid: 108238, total_subject: 19, bonus: 20, name: 'Jivan' },
];

app.get("/", (req, res) => {
    res.send("Express server is running");
});

app.get("/users", (req, res) => {
    res.json(students);
});
app.get("/user/:uid", (req, res) => {
    let uid = Number(req.params.uid);
    const user = students.find(student => student.uid == uid);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
});

app.post("/user", (req, res) => {
    console.log("Body: ", req.body)
    const newUser = {
        attendence: req.body.attendence,
        uid: req.body.uid,
        total_subject: req.body.total_subject,
        bonus: req.body.bonus,
        name: req.body.name,
    };
    students.push(newUser);
    res.status(201).json({
        message: "User created",
        user: newUser
    });
});

app.put("/user/:uid", (req, res) => {
    console.log("Body: ", req.body);
    console.log("Body: ", req.params);
    const userId = Number(req.params.uid);
    const index = students.findIndex(u => u.uid === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    const newUser = {
        attendence: req.body.attendence,
        uid: userId,
        total_subject: req.body.total_subject,
        bonus: req.body.bonus,
        name: req.body.name,
    };
    
    students[index] = newUser;
    res.status(201).json({
        message: "User replaced",
        user: newUser
    });
});




app.listen(3000, () => {
    console.log("Server started on port 3000");
});