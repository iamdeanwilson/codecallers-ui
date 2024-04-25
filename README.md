Frontend Code:
https://github.com/shelvy00/codecallers-ui

Backend Code:
https://github.com/shelvy00/codecallers-api 

This app is designed to be used as a study resource for programmers to test and build their programming knowledge. The app allows users to take quizzes, and upon completion, will reveal their score, all correct answers, and allow them to apply their score to their user profile to build their overall  score. A leaderboard displays all users and their current scores, incentivising users to come back and take more quizzes to improve their score. Quizzes are comprised of 10 questions, fetched from QuizAPI's database of questions. The user can select the topic of their choice and the difficulty of their choice.

The site features full CRUD functionality, allowing users to create a user profile, update their info at any time, and delete their profile. When creating an account, an HTTP request validates that a username and email address is not already in use on the site, and will not allow the same username or email address to be in the system more than once. It also allows users to view other users' profiles, which can be accessed from the leaderboard page. Users can create unique and customizeable avatars to use as a profile picture, which we implemented by utilizing DiceBear API for avatars. 

Full authentication and authorization is implemented through both the frontend and the backend. Upon account creation, passwords are encoded and stored in a MySQL database, and an email is sent to the user asking them to verify their email address. When a user attempts to login, the frontend will sent an HTTP request to the backend to authenticate the credentials. Upon successful authentication, the API response will provide a JWT token in the response, and the token is then stored in the front end localStorage for the duration of the user's session. Certain pages on the site are restricted to only allow access if a user has a valid JWT token. The JWT token also limits access for users to be able to modify their own account, but not the accounts of others, and enables conditional rendering such as a customized welcome message on the Nav Bar. 

We utilized Material UI's components library for a variety of UX features, such as the nav bar, text entry fields, and pop-up alerts. Material UI's components create a more uniform design, helping to tie together different pages on the site, and creating a more visually pleasing and intuitive UX.

Utilizing HeroTofu API's and services, visitors are able to visit the "Contact" page on our website to send a message to the Code Callers team. Upon completing the "Contact Us" form, an email is sent to a pre-defined email address for the developer team. 

Users can use the "Invite" page to invite their friends to use the site. The "Invite" component utilizes EmailJS library and backend services that allow a user to enter the email address of their intended recipient and a brief message. Upon form submission, EmailJS will send the email to the recipient, inviting them to visit our website.

The Nav Bar also features a "Theme" switch, which allows visitors to toggle between "light" and "dark" mode, for a better user experience. 

Additionally there is a platform wide comment board allowing users to send posts in order to communicate with each other, this works by pulling data from a comments SQL table as well as posting data once the user submits their comment. The page then refreshes displaying the new data after submission.
