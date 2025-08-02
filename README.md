## Overview

This is a Library Management System built with:

- Node.js + Express
- MySQL 
- Swagger for API docs
- Basic Auth & Rate Limiting
- CSV Reporting
- Docker & docker-compose

---

## All responses.

`/api/books`
 Method  Endpoint                                  Description             
 GET     `/api/books`                              Get all books           
 GET     `/api/books/:id`                          Get book by ID          
 GET     `/api/books/search?title=&author=&isbn=`  Search by title/author/isbn 
 POST    `/api/books`                              Add a new book          
 PUT     `/api/books/:id`                          Update a book           
 DELETE  `/api/books/:id`                          Delete a book           



`/api/borrowers`

 Method  Endpoint               Description             
 GET     `/api/borrowers`       List all borrowers      
 GET     `/api/borrowers/:id`   Get borrower by ID      
 POST    `/api/borrowers`       Create a borrower       
 PUT     `/api/borrowers/:id`   Update a borrower       
 DELETE  `/api/borrowers/:id`   Delete a borrower       

---
`/api/borrowings`

 Method  Endpoint                                       Description                              
 POST    `/api/borrowings/checkout`                     Checkout a book                          
 PATCH   `/api/borrowings/return/:borrowingId`          Return a book                            
 GET     `/api/borrowings/borrower/:borrowerId`         Books currently borrowed by user         
 GET     `/api/borrowings/overdue`                      List overdue books                       
 GET     `/api/borrowings/report/csv?startDate&endDate` Export borrowings to CSV (date range)    
 GET     `/api/borrowings/export/overdue-last-month`    Export overdue borrowings last month     
 GET     `/api/borrowings/export/last-month`            Export all borrowings from last month    

---

## Start using Docker

docker-compose up --build


The app will be available at:  
`http://localhost:3000/api`

---

Basic Authentication
 Username: ``
 Password: ``

---

Docker Notes

MySQL runs on host port `3307`
App runs on `3000`
Data is persisted in Docker volume `mysql_data`

---
Run Locally Without Docker

npm install
cp .env.example .env
node app.js

Make sure MySQL is running on `localhost:3306`.
-------------
## Schema Diagram (ERD)
-------------      ----------------     -----------------
   Borrower           Borrowing               Book       
-------------      ----------------     -----------------
 id (PK)     ◄───── borrowerId (FK)      id (PK)         
 name               bookId (FK)    ────► title           
 email              dueDate              author          
 registered         returned             isbn (unique)   
                    createdAt            quantity        
                                         shelfLocation 
