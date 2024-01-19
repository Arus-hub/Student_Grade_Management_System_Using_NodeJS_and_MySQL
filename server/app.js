// Import required modules
const express = require('express');
const app = express();
const cors = require('cors'); // To enable Cross-Origin Resource Sharing
const dotenv = require('dotenv'); // To manage environment variables
dotenv.config(); // Load environment variables from .env file

const dbService = require('./dbService'); // Import custom database service module

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended : false })); // Parse URL-encoded bodies

// Endpoint to read all data from the database
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance(); // Get an instance of the database service

    const result = db.getAllData(); // Call the method to get all data
    
    // Send the result back to the client as JSON
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err)); // Log any errors
});

// Endpoint to search students by first name, last name, or ID
app.get('/search/:searchTerm', (request, response) => {
    const { searchTerm } = request.params; // Get the search term from URL params
    const db = dbService.getDbServiceInstance();

    const result = db.searchByStudent(searchTerm); // Search the database
    
    // Send the search results back as JSON
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

// Endpoint for inserting new student data into the database
app.post('/insert', async(request, response) => {
    const { id, firstName, lastName, dob, module1, module2, module3, module4, module5, module6 } = request.body; // Extract data from request body
    const db = dbService.getDbServiceInstance();
    
    try {
        const result = await db.insertNewStudent(id, firstName, lastName, dob, module1, module2, module3, module4, module5, module6); // Insert data
        response.json(result); // Send back the result
    } catch (error) {
        response.status(400).json({ error: error.message }); // Send an error response if something goes wrong
    }
});

// Endpoint to delete a student entry from the table by ID
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params; // Get the ID from URL params
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id); // Delete the row
    
    // Send the result of the deletion
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// Endpoint to update a student's data
app.patch('/update', (request, response) => {
    const {id, firstName, lastName, dob, module1Grade, module2Grade, module3Grade, module4Grade, module5Grade, module6Grade } = request.body; // Extract data from request body
    const db = dbService.getDbServiceInstance();

    const result = db.updateStudentById(id, firstName, lastName, dob, module1Grade, module2Grade, module3Grade, module4Grade, module5Grade, module6Grade); // Update student data
    
    // Send the result of the update
    result
    .then(data => response.json({ success: data }))
    .catch(err => console.log(err));
});

// Endpoint to fetch a single student's data
app.get('/getStudent/:id', (request, response) => {
    const { id } = request.params; // Get the student ID from URL params
    const db = dbService.getDbServiceInstance();

    const result = db.getStudentById(id); // Fetch the student data
    
    // Send the student data back as JSON
    result
    .then(data => response.json({ student: data }))
    .catch(err => console.log(err));
});

// Endpoint to fetch Login ID and Password
app.post('/login', (request, response) => {
    const { username, password } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.loginUser(username, password);
    
    result
    .then(data => response.json({ user: data }))
    .catch(err => {
        console.log(err);
        response.status(500).json({ message: "Internal server error" });
    });
});

// Start the server and listen on the port specified in the environment variables
app.listen(process.env.PORT, () => console.log(`App is running on port ${process.env.PORT}`));
