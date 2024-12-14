// index.js
const express = require('express');
const path = require('path');
const app = express();

// Serve static images from the "animal" and "food" folders
app.use('/animal', express.static(path.join(__dirname, 'animal')));
app.use('/food', express.static(path.join(__dirname, 'food')));

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the animal and food display page
app.get('/display', (req, res) => {
    const animalName = req.query.animal; // Get the animal name from the query string
    if (!animalName) {
        res.send('Animal name is required!');
        return;
    }

    const animalImage = `/animal/${animalName}.jpg`;
    const foodImage = `/food/${animalName}.jpg`;

    // Serve an HTML page to display images
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Display Images</title>
            <style>
                /* General Reset */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f9;
                    color: #333;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    padding: 20px;
                }
                .container {
                    display: flex;
                    flex-direction: row;
                    gap: 20px;
                    max-width: 1200px;
                    width: 100%;
                    justify-content: space-between;
                    align-items: flex-start;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                }
                .column {
                    flex: 1;
                    text-align: center;
                }
                h2 {
                    margin-bottom: 15px;
                    font-size: 1.8rem;
                    color: #444;
                }
                img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="column">
                    <h2>Animal</h2>
                    <img src="${animalImage}" alt="Animal Image">
                </div>
                <div class="column">
                    <h2>Food</h2>
                    <img src="${foodImage}" alt="Food Image">
                </div>
            </div>
        </body>
        </html>
    `);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
