# Javascript

## Task 1: Implement Virtualization for Large Data Sets (No Third-Party Libraries)
# Description: 
Implement virtualization to handle the display of large datasets efficiently, ensuring optimal performance. When dealing with<br />
tens of thousands of records, only the visible items should be rendered to avoid performance degradation.<br />
Requirements:
Use vanilla JavaScript to implement virtualization.<br />
The solution should be performant and capable of handling datasets with 100,000+ items without freezing or slowing down.<br />
You are not allowed to use any third-party libraries for virtualization.<br />
# Bonus:
Provide performance metrics such as memory usage.<br />
Implement both vertical and horizontal scrolling.<br />
# Solution:
* clientData.json in mockdata folder contains user mock data which used in implementation of virtual scrolling<br />
* Open virtualization.html file in browser.<br />
* when user scrolls the table the data gets loaded and virtual scroll is enabled.<br />



## Task 2: Implement Typeahead with Infinite Scroll (No Third-Party Libraries)
# Description:
Develop a typeahead (autocomplete) feature that fetches suggestions dynamically from a large dataset. As the user types,<br />
suggestions should be loaded and displayed, with infinite scroll enabled to allow seamless browsing through large amounts of data.<br />
# Requirements:
Use vanilla JavaScript to implement the typeahead feature.<br />
Fetch suggestions dynamically based on user input.<br />
Implement lazy loading for the results, fetching additional suggestions as the user scrolls through the list.<br />
Ensure smooth and seamless scrolling when dealing with large datasets.<br />
Suggestions should load incrementally (infinite scroll).<br />
You are not allowed to use any third-party libraries for typeahead or infinite scroll.<br />
# Solution:
* clientData.json in mockdata folder contains user mock data which used in implementation of type ahead search<br />
* Open typeAheadSearch.html file in browser.<br />
* Search in textbox with any name from clientData.json<br />
* when user starts typing in textbox, filter is applied on the data and it is displayed as list below.<br />
* It is a free text search and implemented debounce functionality<br />
* Once user stops typing for 3 secs then search functionality executes and results are shown which avoids repetitive calls<br />
* Added Infinity scroll for filtered list of items<br />

## Note
Disable CORS in browser for above two tasks if it is not working.
Run ```open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security``` cmd in case of mac. It opens chrome browser with disabled web security

## Task 3: Perform Insertion, Update, and Fetch Operations on a Custom Local Database (No External Tools)
# Description: 
You will create a custom local database solution that does not rely on any external database tools or libraries.
Records should be stored in text or any file format and should be retrievable based on specific criteria.<br />
# Requirements:
Simulate database functionality by directly interacting with the filesystem.<br />
Implement insertion of records as text or files.<br />
Implement an update mechanism that allows modification of existing records.<br />
Implement a fetch function that retrieves records based on search criteria.<br />
# Bonus:
Implement a simple indexing system to speed up searches and retrieval.<br />
Ensure scalability to handle thousands of records while maintaining good performance.<br />
Provide logs of operations to track the time taken for each database action.<br />
# Solution:
* Open Terminal in the Project folder and switch to server folder<br />
* Execute command ```npm i```<br />
* Run ```node localDatabase.js``` <br />
* It will read the records from dbData.json from mockdata folder and insert the each record to json file .<br />
* The name of file would be the timestamp and it is stored under myLocalDB/records folder<br />
* update and fetch is called directly in the code with filename value hardcoded. It will update the value and fetch records. outputs are printed in console<br />
* Solution also creates index on reach record and stores it in myLocalDB/index.json<br />
* It fetchs the record based on index and prints in console<br />



## Task 4: Implement Rate Limiting in a Scalable System (No Third-Party Libraries)
# Description: 
Implement a rate-limiting solution to control the number of requests a user or IP address can make within a certain time frame.<br />
The solution should be scalable and able to handle high traffic.<br />
# Requirements:
Implement rate limiting for both users and IP addresses using an express server, without third-party libraries.<br />
Return an appropriate HTTP response (e.g., 429 Too Many Requests) when limits are exceeded.<br />
Ensure that the solution can scale to handle thousands or millions of requests per minute.<br />
# Solution:
* Open Terminal in the Project folder and switch to server folder<br />
* Execute command ```npm i```<br />
* Run ```node rateLimit.js``` <br />
* open your browser and navigate to https://localhost:3000<br />
* Hit the page for 10 times in timespan of 1 minute<br />
* It displays too many requests.<br />
* Request is again acceptable after a minute<br />