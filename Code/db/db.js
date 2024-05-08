// Import or initialize your MongoDB connection here

// Define User Collection
db.createUserCollection.insertOne({
    user_name: "John Doe",
    user_phone: 1234567890,
    user_bdate: ISODate("1990-01-01"),
    user_password: "hashed_password",
    user_email: "john@example.com"
});

// Define Events Collection
db.createEventsCollection.insertOne({
    events_name: "Event Name",
    events_latitude: 0.0,
    events_longitude: 0.0,
    events_idate: ISODate("2024-05-08"),
    events_fdate: ISODate("2024-05-10")
});

// Define LQrcode Collection
db.createLqrcodeCollection.insertOne({
    lqrcode_latitude: 0.0,
    lqrcode_longitude: 0.0,
    lqrcode_altitude: 0.0
});

// Define Post Collection
db.createPostCollection.insertOne({
    post_foto: "url_to_image",
    post_text: "Post text"
});

// Define Achievements Collection
db.createAchievementsCollection.insertOne({
    achievements_name: "Achievement Name"
});

// Define ULQ Collection
db.createUlqCollection.insertOne({
    ulq_user_id: 1,
    ulq_post_id: 1,
    ulq_lqrcode_id: 1
});

// Define LQE Collection
db.createLqeCollection.insertOne({
    lqe_lqrcode_id: 1,
    lqe_events_id: 1
});

// Define Achlqe Collection
db.createAchlqeCollection.insertOne({
    achlqe_lqe_id: 1,
    achlqe_achivements_id: 1
});
