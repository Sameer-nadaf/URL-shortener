Project Description:

Your project is a web application that converts long URLs into short, shareable links.
When a user enters a long URL, the system generates a unique short alias and stores the mapping between the short URL and the original URL in a database.

When someone visits the short link, the application retrieves the original URL and redirects the user automatically.

This project behaves similarly to services like Bitly.

Technologies Used Frontend:

React
Used to build the user interface and manage application state.
React Router
Handles navigation and dynamic routing such as /alias.
Bootstrap
Provides styling and responsive layout.

Backend / Database:

Firebase Realtime Database
Stores mappings between the short URL alias and the original URL.

Supporting Libraries:

nanoid
Generates random unique IDs for short URLs.

valid-url
Checks if the user entered a valid URL

React Bootstrap
Used for UI elements like tooltips and buttons

Application Workflow:
Step 1 — User enters a URL

Example input:

https://google.com
Step 2 — System generates a short URL
Using nanoid:

http://localhost:3000/a1B2
Step 3 — Data stored in Firebase
a1B2
   longURL: https://google.com
   generatedURL: localhost:3000/a1B2
Step 4 — User visits short link
http://localhost:3000/a1B2

Step 5 — Redirect system works

The Redirect component:

Extracts alias (a1B2)
Queries Firebase
Retrieves original URL
Redirects user

Main Components in Your Project
1. Form Component Handles:

URL input
Alias input
URL validation
Short URL generation
Storing data in Firebase

Redirect Component Handles:

Extracting alias from URL
Fetching original URL from Firebase
Redirecting the user
App Component

Handles routing:
/           → Form page
/:alias     → Redirect page

6️. Features Implemented

URL shortening
 Custom alias support
 Firebase cloud database storage
 URL validation
 Copy-to-clipboard feature
 Automatic redirect

 Future Improvements (optional):

Expiry time for URLs
Click analytics
QR code generation
User authentication
Deployment using Firebase Hosting
