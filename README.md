# Hospital Patient Registration Form

This is a simple web-based Hospital Patient Registration form. The project is built using Node.js and Express.js on the backend, with a clean frontend using HTML and CSS.

## Features
- Separate frontend files for HTML structure and CSS styling.
- Patient Registration form for entering Name, Date of Admission, and Illness.
- Data persistence using the local file system (saves data in 'student_registry.txt').
- A separate view page to display all the registered patients.

## Tech Stack
- Backend: Node.js, Express.js
- Frontend: HTML5, CSS3
- Storage: Text file storage using 'fs' module

## How to Run the Project

1. Install Node.js on your system.
2. Put all three files (app.js, index.html, style.css) in the same folder.
3. Open terminal in that folder and install express by running:
   npm install express
4. Start the server using:
   node app.js
5. Open your browser and go to:
   http://localhost:3000

## Files in this Project
- app.js (Main server file for routing and handling requests)
- index.html (Frontend form structure)
- style.css (Styling for the form and tables)
- student_registry.txt (Generated automatically when you save a patient)
