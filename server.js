const express = require("express");
const app = express();
const path = require('path');  // For static file path management
const fs = require('fs');
const winston = require('winston');

// Set up Winston logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'abacus-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON bodies
app.use(express.json());

// Add functionality
app.get("/add", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1) || isNaN(n2)) {
            logger.error(`Invalid input for addition: n1 = ${n1}, n2 = ${n2}`);
            return res.status(400).json({ error: 'Invalid input. Please enter valid numbers.' });
        }

        const result = n1 + n2;
        logger.info(`Addition performed: ${n1} + ${n2} = ${result}`);
        res.json({ result });
    } catch (error) {
        logger.error(`Error in addition: ${error.message}`);
        res.status(500).json({ error: 'Server error occurred.' });
    }
});

// Subtract functionality
app.get("/sub", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1) || isNaN(n2)) {
            logger.error(`Invalid input for subtraction: n1 = ${n1}, n2 = ${n2}`);
            return res.status(400).json({ error: 'Invalid input. Please enter valid numbers.' });
        }

        const result = n1 - n2;
        logger.info(`Subtraction performed: ${n1} - ${n2} = ${result}`);
        res.json({ result });
    } catch (error) {
        logger.error(`Error in subtraction: ${error.message}`);
        res.status(500).json({ error: 'Server error occurred.' });
    }
});

// Multiply functionality
app.get("/mul", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1) || isNaN(n2)) {
            logger.error(`Invalid input for multiplication: n1 = ${n1}, n2 = ${n2}`);
            return res.status(400).json({ error: 'Invalid input. Please enter valid numbers.' });
        }

        const result = n1 * n2;
        logger.info(`Multiplication performed: ${n1} * ${n2} = ${result}`);
        res.json({ result });
    } catch (error) {
        logger.error(`Error in multiplication: ${error.message}`);
        res.status(500).json({ error: 'Server error occurred.' });
    }
});

// Divide functionality
app.get("/div", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1) || isNaN(n2)) {
            logger.error(`Invalid input for division: n1 = ${n1}, n2 = ${n2}`);
            return res.status(400).json({ error: 'Invalid input. Please enter valid numbers.' });
        }

        if (n2 === 0) {
            logger.error(`Division by zero: n1 = ${n1}, n2 = ${n2}`);
            return res.status(400).json({ error: 'Cannot divide by zero.' });
        }

        const result = n1 / n2;
        logger.info(`Division performed: ${n1} / ${n2} = ${result}`);
        res.json({ result });
    } catch (error) {
        logger.error(`Error in division: ${error.message}`);
        res.status(500).json({ error: 'Server error occurred.' });
    }
});


// Start the server
const port = 3051;
app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}`);
});
