const fs = require('fs');
const path = require('path');

// Define the database directory and record directory
const DB_DIR = './myLocalDB';
const RECORDS_DIR = path.join(DB_DIR, 'records');
const INDEX_FILE = path.join(DB_DIR, 'index.json');

// Ensure directories exist
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR);
if (!fs.existsSync(RECORDS_DIR)) fs.mkdirSync(RECORDS_DIR);

// Helper function to log the time taken for each operation
function logOperation(operation, startTime) {
    const endTime = new Date();
    console.log(`${operation} took ${(endTime - startTime)}ms`);
}

// Function to insert a record
function insertRecord(record) {
    const startTime = new Date();
    const recordId = Date.now();
    const recordFilePath = path.join(RECORDS_DIR, `${recordId}.json`);

    fs.writeFileSync(recordFilePath, JSON.stringify(record));

    // Update index for faster search (optional)
    updateIndex(recordId, record);

    logOperation('Insert', startTime);
    return recordId;
}

// Function to update a record
function updateRecord(recordId, updatedData) {
    console.log("******* Updating Records *******")
    const startTime = new Date();
    const recordFilePath = path.join(RECORDS_DIR, `${recordId}.json`);

    if (!fs.existsSync(recordFilePath)) {
        console.log(`Record with ID ${recordId} not found.`);
        return;
    }

    // Merge the existing data with the updated data
    const existingData = JSON.parse(fs.readFileSync(recordFilePath));
    const newData = { ...existingData, ...updatedData };

    fs.writeFileSync(recordFilePath, JSON.stringify(newData));

    // Update index (optional)
    updateIndex(recordId, newData);

    logOperation('Update', startTime);
    console.log(`Record ${recordId} updated successfully.`);
}

// Function to fetch records based on search criteria
function fetchRecords(criteria) {
    console.log("******* Fetching Records *******")
    const startTime = new Date();
    const files = fs.readdirSync(RECORDS_DIR);
    const results = [];
   
    files.forEach(file => {
        const recordData = JSON.parse(fs.readFileSync(path.join(RECORDS_DIR, file)));
        
        const isMatch = Object.keys(criteria).every(key => recordData[key] === criteria[key]);

        if (isMatch) {
            results.push(recordData);
        }
    });

    logOperation('Fetch', startTime);
    return results;
}

function updateIndex(recordId, recordData) {
    let indexData = {};
    if (fs.existsSync(INDEX_FILE)) {
        indexData = JSON.parse(fs.readFileSync(INDEX_FILE));
    }
    indexData[recordId] = recordData;
    fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2));
}

// Function to fetch using the index (for speed)
function fetchByIndex(criteria) {
    const startTime = new Date();
    if (!fs.existsSync(INDEX_FILE)) {
        console.log('Index not found.');
        return [];
    }

    const indexData = JSON.parse(fs.readFileSync(INDEX_FILE));
    const results = Object.keys(indexData)
        .filter(recordId => Object.keys(criteria).every(key => indexData[recordId][key] === criteria[key]))
        .map(recordId => indexData[recordId]);

    logOperation('Fetch with Index', startTime);
    return results;
}

function loadJsonFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
        return null;
    }
}

// Load the JSON file containing the records
const dataArray = loadJsonFile('../mockdata/dbData.json');

// Insert each record from the loaded JSON file into the database
if (dataArray && Array.isArray(dataArray)) {
    dataArray.forEach(record => {
        const recordId = insertRecord(record);
        console.log(`Record inserted with ID: ${recordId}`);
    });
} else {
    console.log('No valid data to insert.');
}

updateRecord("1729337783938", { language: "Sindhi" });

const fetchedRecords = fetchRecords({ language: "Sindhi" });
console.log('Fetched Records:', fetchedRecords);

const fetchedByIndex = fetchByIndex({ language: "Sindhi" });
console.log('Fetched by Index:', fetchedByIndex);
