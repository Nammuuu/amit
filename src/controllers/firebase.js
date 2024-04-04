const {db} = require('../config/firebase')

const getData= async (req, res) => {
    try {
        const snapshot = await db.collection('users').get();
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.send(list);
    } catch (error) {
        console.error("Error getting documents", error);
        res.status(500).send("Internal Server Error");
    }
};

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Create a new user object
        const newUser = {
            email: email,
            password:password
        };

        // Add the user to your Firestore 'users' collection
        const userRef = await db.collection('users').add(newUser);

        res.status(201).send(`User created successfully with ID: ${userRef.id}`);
    } catch (error) {
        console.error("Error creating user", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports={getData,signup}