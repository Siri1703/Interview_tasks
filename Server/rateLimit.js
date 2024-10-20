const express = require('express');
const app = express();

const PORT = 3000;

// Configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; 
const MAX_REQUESTS_PER_WINDOW = 10; 

const requestCounts = {};

function rateLimit(req, res, next) {
    const ip = req.ip; 

    const currentTime = Date.now();

    if (!requestCounts[ip]) {
        requestCounts[ip] = {
            count: 1,
            startTime: currentTime
        };
    } else {
        const requestData = requestCounts[ip];

        const elapsedTime = currentTime - requestData.startTime;

        if (elapsedTime < RATE_LIMIT_WINDOW_MS) {
            if (requestData.count < MAX_REQUESTS_PER_WINDOW) {
                requestData.count++;
            } else {
                // Rate limit exceeded
                return res.status(429).json({
                    error: 'Too many requests, please try again later.'
                });
            }
        } else {
            requestCounts[ip] = {
                count: 1,
                startTime: currentTime
            };
        }
    }

    next();
}

app.use(rateLimit);

app.get('/', (req, res) => {
    res.send('Welcome to the rate-limited API!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
