const express = require('express');
const mongoose = require('mongoose');


const User = require('./models/user');
const Event = require('./models/event');
const Lqrcode = require('./models/lqrcode');
const Post = require('./models/post');
const Achievement = require('./models/achievement');
const Ulq = require('./models/ulq');
const Lqe = require('./models/lqe');
const Achlqe = require('./models/achlqe');


const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const lqrcodeRoutes = require('./routes/lqrcodeRoutes');
const postRoutes = require('./routes/postRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const ulqRoutes = require('./routes/ulqRoutes');
const lqeRoutes = require('./routes/lqeRoutes');
const achlqeRoutes = require('./routes/achlqeRoutes');

const app = express();

mongoose.connect('mongodb://localhost:27017/myDatabase', {
})
.then(() => {
    console.log('Connected to MongoDB');

    app.use('/users', userRoutes);
    app.use('/events', eventRoutes);
    app.use('/lqrcodes', lqrcodeRoutes);
    app.use('/posts', postRoutes);
    app.use('/achievements', achievementRoutes);
    app.use('/ulqs', ulqRoutes);
    app.use('/lqes', lqeRoutes);
    app.use('/achlqes', achlqeRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
