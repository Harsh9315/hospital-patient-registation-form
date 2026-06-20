# Hospital Patient Registry System

This is a web-based Hospital Patient Registry application. The backend is built using Node.js and Express.js, while the frontend is handled via an HTML file with embedded CSS styling.

## Features
- Clean 2-file architecture (index.html for frontend and app.js for backend).
- Patient Registration form for entering Name, Date of Admission, and Illness.
- Form data is saved permanently in a local text file (student_registry.txt).
- View page to check all registered patients in a properly formatted layout.

## Tech Stack
- Backend: Node.js, Express.js
- Frontend: HTML, CSS (Embedded inside HTML)
- Storage: Text file storage using the 'fs' module

## How to Run the Project

1. Make sure Node.js is installed on your computer.
2. Put both files (app.js and index.html) in the same folder.
3. Open the terminal inside that folder and install express using:
   npm install express
4. Run the server by typing:
   node app.js
5. Open your web browser and go to:
   http://localhost:3000

## Files in this Project
- app.js (Handles routing, server setup, and text file operations)
- index.html (Contains the registration form and the CSS styles for the UI)
- student_registry.txt (This file is automatically created when you submit data)
