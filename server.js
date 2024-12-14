const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Session middleware
app.use(session({
    secret: 'your_secret_key', // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true in production with HTTPS
}));

// Serve static files from the "src/main/webapp" directory
app.use(express.static(path.join(__dirname, 'app/src/main/webapp')));

// Serve index.html on root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/src/main/webapp', 'index.html'));
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: 'Signup successful.' });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({ success: false, message: 'An error occurred during signup.' });
    }
});

// Sign-In Endpoint
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }

        // Store user info in session
        req.session.user = user;

        res.json({ success: true, message: 'Sign-in successful.' });
    } catch (err) {
        console.error('Sign-In Error:', err);
        res.status(500).json({ success: false, message: 'An error occurred during sign-in.' });
    }
});

// Logout Endpoint
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Logout failed.' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.json({ success: true, message: 'Logged out successfully.' });
    });
});

// Food Schema
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true }
});

const Food = mongoose.model('Food', foodSchema);

const seedFoodData = async () => {
    console.log('Seeding process started...'); // Add this log

    const foodItems = [
        { name: 'Paneer Butter Masala', price: 100, imageUrl: 'PB.jpg', category: 'mainCourses' },
        { name: 'Dal Makhani', price: 80, imageUrl: 'DM.jpg', category: 'mainCourses' },
        { name: 'Palak Paneer', price: 260, imageUrl: 'PP.jpg', category: 'mainCourses' },
        { name: 'Aloo Gobi', price: 90, imageUrl: 'AG.jpg', category: 'mainCourses' },
        { name: 'Chole', price: 150, imageUrl: 'CHOLE.jpg', category: 'mainCourses' },
        { name: 'Veg Biryani', price: 60, imageUrl: 'VB.jpg', category: 'mainCourses' },
        { name: 'Kadai Paneer', price: 160, imageUrl: 'KP.jpg', category: 'mainCourses' },
        { name: 'Veg Korma', price: 50, imageUrl: 'VK.jpg', category: 'mainCourses' },
        { name: 'Rajma', price: 110, imageUrl: 'RAJMA.jpg', category: 'mainCourses' },
        
    ];

    try {
        const existingFoodItems = await Food.find();

        if (existingFoodItems.length === 0) {
            await Food.insertMany(foodItems);
            console.log('Food items seeded');
        } else {
            console.log('Food items already exist, skipping seeding');
        }
    } catch (error) {
        console.error('Error seeding food items:', error);
    }
};

// Uncomment to run the seeding function
seedFoodData();


// Endpoint to get food data
app.get('/api/foods/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const foods = await Food.find({ category });
        console.log(foods); // Log the fetched foods
        res.json(foods);
    } catch (error) {
        console.error('Error fetching food data:', error);
        res.status(500).json({ success: false, message: 'Error fetching food data' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
