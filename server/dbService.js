// Import required modules
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

// Initialize a singleton instance
let instance = null;

// Create a MySQL database connection using environment variables
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.log(err.message); // Log any connection errors
    }
    // console.log('db ' + connection.state); // Uncomment to see the connection state
});

// Class to handle database operations
class DbService {
    // Method to get the singleton instance of the DbService
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    // Method to get all data from the 'results' table
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM results;";
    
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message)); // Reject the promise if there's an error
                    resolve(results); // Resolve the promise with the query results
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Method to search for students by first name, last name, or ID
    async searchByStudent(searchTerm) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM results WHERE first_Name LIKE ? OR last_Name LIKE ? OR id=?;";

                connection.query(query, [`%${searchTerm}%`, `%${searchTerm}%`, searchTerm], (err, results) => {
                    if (err) reject(new Error(err.message)); // Reject the promise if there's an error
                    resolve(results); // Resolve the promise with the query results
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Method to get a single student's data by ID
    async getStudentById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM results WHERE id = ?;";
                connection.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results[0]); // Assuming ID is unique, return the first result
                });
            });
            return response;
        } catch (error) {
            console.log(error);
            return {};
        }
    }

    // Method to insert a new student into the 'results' table
    async insertNewStudent(id, firstName, lastName, dob, module1, module2, module3, module4, module5, module6) {
        try {
            // Check if the student ID already exists in the database
            const idExists = await new Promise((resolve, reject) => {
                const idCheckQuery = "SELECT id FROM results WHERE id = ?";
                connection.query(idCheckQuery, [id], (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                        return;
                    }
                    resolve(result.length > 0); // Resolve true if ID exists, false otherwise
                });
            });

            if (idExists) {
                throw new Error("Student ID already exists");
            }

            // Insert the new student into the database
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO results (id, first_Name, last_Name, DOB, Module1_Grade, Module2_Grade, Module3_Grade, Module4_Grade, Module5_Grade, Module6_Grade) VALUES (?,?,?,?,?,?,?,?,?,?);";
    
                connection.query(query, [id, firstName, lastName, dob, module1, module2, module3, module4, module5, module6], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result.insertId); // Resolve with the inserted ID
                })
            });
            return {
                id: insertId,
                firstName: firstName,
                lastName: lastName,
                dob: dob,
                module1: module1,
                module2: module2,
                module3: module3,
                module4: module4,
                module5: module5,
                module6: module6,
            };
        } catch (error) {
            console.log(error);
            return { error: error.message };
        }
    }

    // Method to delete a student from the 'results' table by ID
    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); // Convert ID to an integer
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM results WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows); // Resolve with the number of affected rows
                })
            });
    
            return response === 1 ? true : false; // Return true if one row was affected (deleted), false otherwise
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Method to update a student's data in the 'results' table
    async updateStudentById(id, firstName, lastName, dob, module1Grade, module2Grade, module3Grade, module4Grade, module5Grade, module6Grade) {
        try {
            id = parseInt(id, 10); // Convert ID to an integer
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE results SET first_name = ?, last_name = ?, DOB = ?, Module1_Grade = ?, Module2_Grade = ?, Module3_Grade = ?, Module4_Grade = ?, Module5_Grade = ?, Module6_Grade = ? WHERE id = ?";
                connection.query(query, [firstName, lastName, dob, module1Grade, module2Grade, module3Grade, module4Grade, module5Grade, module6Grade, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows); // Resolve with the number of affected rows
                });
            });
            return response === 1 ? true : false; // Return true if one row was affected (updated), false otherwise
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // New method for login
    async loginUser(username, password) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE username = ? AND password = ?;";

                connection.query(query, [username, password], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.length > 0 ? results[0] : null);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

// Export the DbService class for use in other modules
module.exports = DbService;
