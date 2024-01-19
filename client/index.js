
// Wait for the HTML document to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the server at the specified URL
    fetch('http://localhost:5000/getAll')
    .then(response => response.json()) // Convert the response to JSON format
    .then(data => loadHTMLTable(data['data'])); // Load data into HTML table
    
});

// Add an event listener to the table body for 'click' events
document.querySelector('table tbody').addEventListener('click', function(event) {
     // If the clicked element has an ID of 'delete-row-btn', call deleteRowById function
    if (event.target.id === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    // If the clicked element has an ID of 'edit-row-btn', call handleEditRow function
    if (event.target.id === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

// Get the search button and set up a click event listener
const searchBtn = document.querySelector('#search-btn');
searchBtn.onclick = function() {
    // Get the search term from the input field
    const searchTerm = document.querySelector('#search-input').value;

    // Fetch search results from the server and update the HTML table
    fetch('http://localhost:5000/search/' + searchTerm)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}


// Delete a row from the table based on ID
function deleteRowById(id) {
     // Send a DELETE request to the server with the specified ID
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        // If deletion is successful, reload the page
        if (data.success) {
            location.reload();
        }
    });
}


// Handle the editing of a row by fetching data for a specific student
function handleEditRow(id) {
    fetch(`http://localhost:5000/getStudent/${id}`)
    .then(response => response.json())
    .then(data => fillUpdateForm(id, data.student)) // Fill the update form with fetched data
    .catch(error => console.error('Error fetching student data:', error)); // Handle any errors
}

// Fill the update form with student data
function fillUpdateForm(id, student) {
    const updateSection = document.querySelector('#update-student');
    updateSection.hidden = false; // Show the update section

    updateSection.dataset.id = id; // Set the data-id attribute to the student's ID

    // Fill in the form fields with student data
    document.querySelector('#update-first-name-input').value = student.first_name;
    document.querySelector('#update-last-name-input').value = student.last_name;

    // Format the date of birth and set it in the form
    const isoDate = new Date(student.DOB).toISOString().slice(0, 10);
    document.querySelector('#update-dob-input').value = isoDate;

    // Set the module grades in the form
    document.querySelector('#update-module1-grade').value = student.Module1_Grade;
    document.querySelector('#update-module2-grade').value = student.Module2_Grade;
    document.querySelector('#update-module3-grade').value = student.Module3_Grade;
    document.querySelector('#update-module4-grade').value = student.Module4_Grade;
    document.querySelector('#update-module5-grade').value = student.Module5_Grade;
    document.querySelector('#update-module6-grade').value = student.Module6_Grade;
}



// Event listener for the update button click
const updateBtn = document.querySelector('#update-row-btn');

updateBtn.onclick = function() {
    const updateSection = document.querySelector('#update-student');
    const id = updateSection.dataset.id; // Retrieve the student ID

    const firstName = document.querySelector('#update-first-name-input').value;
    const lastName = document.querySelector('#update-last-name-input').value;
    const dob = document.querySelector('#update-dob-input').value;
    const module1Grade = document.querySelector('#update-module1-grade').value;
    const module2Grade = document.querySelector('#update-module2-grade').value;
    const module3Grade = document.querySelector('#update-module3-grade').value;
    const module4Grade = document.querySelector('#update-module4-grade').value;
    const module5Grade = document.querySelector('#update-module5-grade').value;
    const module6Grade = document.querySelector('#update-module6-grade').value;

      
    // Convert the entered date to a Date object
        const enteredDate = new Date(dob);

        // Get the current date
        const currentDate = new Date();
    
        // Check if the entered date is in the future
        if (enteredDate > currentDate) {
            showError("Date of birth cannot be in the future.");
            return;
        }

    if (!firstName.trim() || !lastName.trim() || !dob.trim() 
        || !module1Grade.trim() || !module2Grade.trim() || !module3Grade.trim() 
        || !module4Grade.trim() || !module5Grade.trim() || !module6Grade.trim()) {
        showError("All fields are required for update.");
        return; // Prevents the code from proceeding if validation fails
    }

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: id, // Use the ID from the dataset
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            module1Grade: module1Grade,
            module2Grade: module2Grade,
            module3Grade: module3Grade,
            module4Grade: module4Grade,
            module5Grade: module5Grade,
            module6Grade: module6Grade
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload(); // Reload the page to reflect the updated data
        } else if (data.error) {
            showError(data.error); // Show error if any
        }
    })
    .catch(error => {
        console.error('Error updating the student:', error);
        showError(error.message); // Show error message
    });
}


    


// Event listener for the add student button click
const addBtn = document.querySelector('#add-student-btn');

addBtn.onclick = function () {
    const idInput = document.querySelector('#id-input');
    const firstNameInput = document.querySelector('#fname-input');
    const lastNameInput = document.querySelector('#lname-input');
    const dobInput = document.querySelector('#date-input');
    const module1Input = document.querySelector('#module1-input');
    const module2Input = document.querySelector('#module2-input');
    const module3Input = document.querySelector('#module3-input');
    const module4Input = document.querySelector('#module4-input');
    const module5Input = document.querySelector('#module5-input');
    const module6Input = document.querySelector('#module6-input');
    
    const id = idInput.value;
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const dob = dobInput.value;
    const module1 = module1Input.value;
    const module2 = module2Input.value;
    const module3 = module3Input.value;
    const module4 = module4Input.value;
    const module5 = module5Input.value;
    const module6 = module6Input.value;

    // Check if the student id is of length 7 exactly
    if (id.length !== 7) {
        showError("Student ID must be exactly 7 characters.");
        return;
    }
    const enteredDate = new Date(dob);

    // Get the current date
    const currentDate = new Date();

    // Check if the entered date is in the future
    if (enteredDate > currentDate) {
        showError("Date of birth cannot be in the future.");
        return;
    }



    if (!id.trim() || !firstName.trim() || !lastName.trim() || !dob.trim() 
    || !module1.trim() || !module2.trim() || !module3.trim() 
    || !module4.trim() || !module5.trim() || !module6.trim()) {
    showError("All fields are required.");
    return; // Prevents the code from proceeding if validation fails
}
    
    // Clearing the input fields
    idInput.value = '';
    firstNameInput.value = '';
    lastNameInput.value = '';
    dobInput.value = '';
    module1Input.value = '';
    module2Input.value = '';
    module3Input.value = '';
    module4Input.value = '';
    module5Input.value = '';
    module6Input.value = '';
    

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ 
            id: id, 
            firstName: firstName, 
            lastName: lastName, 
            dob: dob, 
            module1: module1, 
            module2: module2, 
            module3: module3, 
            module4: module4, 
            module5: module5, 
            module6: module6 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showError(data.error);
        } else {
            insertRowIntoTable(data);
           
            location.reload();
        }
    })
    .catch(error => {
        showError(error.message);
    });
}

// Function to show error messages
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block'; 
    errorDiv.style.backgroundColor = 'red'; 
    errorDiv.style.color = 'white'; 
    errorDiv.style.padding = '10px'; 
    errorDiv.style.position = 'fixed'; 
    errorDiv.style.top = '10px'; 
    errorDiv.style.left = '50%'; 
    errorDiv.style.transform = 'translateX(-50%)'; 
    errorDiv.style.borderRadius = '5px'; 
    errorDiv.style.zIndex = '9999'; // Make sure the error message is shown above all the elements

    // Hide the error message after 3 seconds
    setTimeout(function() {
        errorDiv.style.display = 'none'; // Hide it again
    }, 3000);
}





// Function to insert a new row into the table
function insertRowIntoTable(data) {
    // Clear any existing content in the error message display
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = '';

    // Check if the data contains an error property
    if (data && data.error) {
        errorDiv.textContent = data.error;
        return; // Do not proceed further if there is an error
    }

    // Assuming data is a valid student object at this point
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            let value = data[key];
            // Format date
            if (key === 'DOB') {
                value = new Date(value).toLocaleDateString('en-US', { timeZone: 'UTC' });
            }
            
            // Protect against undefined values
            value = value ? value : 'N/A';
            tableHtml += `<td>${value}</td>`;
        }
    }
    let grades = [
        data.Module1_Grade, 
        data.Module2_Grade, 
        data.Module3_Grade, 
        data.Module4_Grade, 
        data.Module5_Grade, 
        data.Module6_Grade
    ];
    let { average, category } = calculateGradeAndCategory(grades);
    tableHtml += `<td>${average.toFixed(2)}</td>`;
    tableHtml += `<td>${category}</td>`;

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</button></td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
        }
}

// Function to update the average grade display
function updateAverageGrade() {
    const grades = Array.from(document.querySelectorAll('table tbody tr')).map(row => {
        const grade = parseFloat(row.cells[10].textContent); 
        return !isNaN(grade) ? grade : 0;
    });

    const average = grades.length > 0 ? (grades.reduce((acc, grade) => acc + grade, 0) / grades.length).toFixed(2) : 'N/A';
    document.getElementById('average-value').textContent = average;
}

// Function to calculate the grade and category based on given grades
function calculateGradeAndCategory(grades) {
    let sum = grades.reduce((acc, grade) => acc + parseInt(grade, 10), 0);
    let average = sum / grades.length;

    let category;
    if (average >= 70) category = 'Distinction';
    else if (average >= 60) category = 'Merit';
    else if (average >= 40) category = 'Pass';
    else category = 'Fail';

    return { average, category };
}


// Function to load data into the HTML table
function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='14'>No Data</td></tr>";
        return;
    }
    let tableHtml = "";

    
    data.forEach(function ({ id, first_name, last_name, DOB, Module1_Grade, Module2_Grade, Module3_Grade, Module4_Grade, Module5_Grade, Module6_Grade}) {

        let grades = [Module1_Grade, Module2_Grade, Module3_Grade, Module4_Grade, Module5_Grade, Module6_Grade];
        let { average, category } = calculateGradeAndCategory(grades);

        let textColorClass = "";
        switch (category) {
            case "Fail":
                textColorClass = "text-danger"; // Red for Fail
                break;
            case "Pass":
                textColorClass = "text-success"; // Green for Pass
                break;
            case "Distinction":
                textColorClass = "text-primary"; // Blue for Distinction
                break;
            case "Merit":
                textColorClass = "text-warning"; // Yellow for Merit
                break;
            default:
                textColorClass = ""; // Default color if none of the above
        }

        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${first_name}</td>`;
        tableHtml += `<td>${last_name}</td>`;
        const formattedDate = new Date(DOB).toLocaleDateString('en-US', { timeZone: 'UTC' });
        tableHtml += `<td>${formattedDate}</td>`;
        tableHtml += `<td>${Module1_Grade}</td>`;
        tableHtml += `<td>${Module2_Grade}</td>`;
        tableHtml += `<td>${Module3_Grade}</td>`;
        tableHtml += `<td>${Module4_Grade}</td>`;
        tableHtml += `<td>${Module5_Grade}</td>`;
        tableHtml += `<td>${Module6_Grade}</td>`;
        tableHtml += `<td>${average.toFixed(2)}</td>`; // Append average grade
        tableHtml += `<td class="${textColorClass} font-weight-bold">${category}</td>`; // Append category
        tableHtml += `<td><button class="btn btn-danger btn-sm" id ="delete-row-btn" data-id=${id}>Delete</td>`;
        tableHtml += `<td><button class="btn btn-info btn-sm" id ="edit-row-btn" data-id=${id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
    updateAverageGrade(); // Call the average grade function
    
}

