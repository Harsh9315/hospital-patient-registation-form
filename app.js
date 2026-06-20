const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));

const commonStyles = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #059669;
            --primary-gradient: linear-gradient(135deg, #059669 0%, #064e3b 100%);
            --bg-gradient: radial-gradient(circle at 0% 0%, #f0fdf4 0%, #dcfce7 50%, #f0fdfa 100%);
            --card-bg: rgba(255, 255, 255, 0.95);
            --text-main: #064e3b;
            --text-muted: #14532d;
            --border: #bbf7d0;
        }
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: var(--bg-gradient);
            color: var(--text-main);
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            box-sizing: border-box;
            position: relative;
            overflow-x: hidden;
        }
        body::before {
            content: "";
            position: absolute;
            width: 350px;
            height: 350px;
            background: #a7f3d0;
            filter: blur(130px);
            top: 5%;
            left: 10%;
            z-index: -1;
            border-radius: 50%;
        }
        body::after {
            content: "";
            position: absolute;
            width: 300px;
            height: 300px;
            background: #fef08a;
            filter: blur(120px);
            bottom: 5%;
            right: 10%;
            z-index: -1;
            border-radius: 50%;
        }
        .main-wrapper {
            display: flex;
            background-color: var(--card-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.7);
            box-shadow: 0 25px 50px -12px rgba(6, 78, 59, 0.08);
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
        }
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.9rem 1.8rem;
            background: var(--primary-gradient);
            color: white;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 700;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 10px 25px -6px rgba(6, 78, 59, 0.3);
            gap: 8px;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 28px -6px rgba(6, 78, 59, 0.4);
        }
    </style>
`;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/register", (req, res) => {
    const patientData = `Name: ${req.body.studentName}, Date: ${req.body.dateOfAdmission}, Illness: ${req.body.rollno}\n`;
    fs.appendFileSync("student_registry.txt", patientData);
    
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Success | Registry</title>
            ${commonStyles}
        </head>
        <body>
            <div class="main-wrapper" style="max-width: 460px; flex-direction: column; padding: 3rem 2.5rem; text-align: center; align-items: center;">
                <div style="font-size: 3.5rem; margin-bottom: 0.5rem; filter: drop-shadow(0 6px 8px rgba(5, 150, 105, 0.2));">💖</div>
                <h2 style="font-size: 1.7rem; font-weight: 800; margin: 0 0 0.5rem 0; letter-spacing: -0.02em;">Successfully Registered!</h2>
                <p style="color: var(--text-muted); font-weight: 500; margin-bottom: 2rem; font-size: 1rem;">
                    Patient <strong style="color: #064e3b; font-weight: 700;">${req.body.studentName}</strong> data has been securely saved by the Nurse Desk.
                </p>
                <a href="/" class="btn" style="width: 100%;">🔙 Go Back to Dashboard</a>
            </div>
        </body>
        </html>
    `);
});

app.get("/students", (req, res) => {
    if (fs.existsSync("student_registry.txt")) {
        const rawData = fs.readFileSync("student_registry.txt", "utf8");
        const lines = rawData.split("\n").filter(line => line.trim() !== "");
        
        let tableRows = "";
        lines.forEach(line => {
            if (line.includes("undefined")) return;

            let name = "-", date = "-", illness = "-";
            
            const nameMatch = line.match(/Name:\s*([^,]+)/);
            const dateMatch = line.match(/Date:\s*([^,]+)/);
            const illnessMatch = line.match(/Illness:\s*(.+)/) || line.match(/Roll No:\s*(.+)/);

            if (nameMatch) name = nameMatch[1].trim();
            if (dateMatch) date = dateMatch[1].trim();
            if (illnessMatch) illness = illnessMatch[1].trim();

            tableRows += `
                <tr style="border-bottom: 1px solid rgba(187, 247, 208, 0.5); transition: all 0.2s ease;">
                    <td style="padding: 1.1rem 1.3rem; font-weight: 600; color: #064e3b;">👤 ${name}</td>
                    <td style="padding: 1.1rem 1.3rem; color: #14532d; font-weight: 500;">📅 ${date}</td>
                    <td style="padding: 1.1rem 1.3rem;">
                        <span style="background-color: #dcfce7; color: #15803d; padding: 6px 14px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; border: 1px solid #bbf7d0;">
                            🩺 ${illness}
                        </span>
                    </td>
                </tr>
            `;
        });

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Patients Database</title>
                ${commonStyles}
            </head>
            <body>
                <div class="main-wrapper" style="max-width: 820px; flex-direction: column; padding: 2.5rem 2rem;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 15px;">
                        <h2 style="font-size: 1.7rem; font-weight: 800; margin: 0; letter-spacing: -0.02em; color: #064e3b;">🧑‍⚕️ Doctor's Patient Directory</h2>
                        <a href="/" style="color: var(--primary); text-decoration: none; font-weight: 700; font-size: 0.95rem; display: inline-flex; align-items: center; gap: 5px;">
                            <span>←</span> Dashboard
                        </a>
                    </div>
                    
                    <div style="overflow-x: auto; border: 1px solid var(--border); border-radius: 16px; background: rgba(255,255,255,0.6);">
                        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">
                            <thead>
                                <tr style="background-color: rgba(220, 252, 231, 0.5); border-bottom: 1px solid var(--border);">
                                    <th style="padding: 1.1rem 1.3rem; color: #064e3b; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em;">Patient Details</th>
                                    <th style="padding: 1.1rem 1.3rem; color: #064e3b; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em;">Admit Date</th>
                                    <th style="padding: 1.1rem 1.3rem; color: #064e3b; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.06em;">Assigned Diagnosis</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${tableRows ? tableRows : '<tr><td colspan="3" style="text-align:center; padding:3rem; color:#14532d; font-weight:500;">No medical records found.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </body>
            </html>
        `);
    } else {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                ${commonStyles}
            </head>
            <body>
                <div class="main-wrapper" style="max-width: 460px; flex-direction: column; padding: 3rem 2.5rem; text-align: center; align-items: center;">
                    <div style="font-size: 3.5rem; margin-bottom: 1rem;">📭</div>
                    <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 2rem; color: var(--text-muted);">No records registered yet.</h2>
                    <a href="/" class="btn" style="width: 100%;">Go Back to Dashboard</a>
                </div>
            </body>
            </html>
        `);
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});