# Pin

## Project Overview

Pin is a Node.js web application built with Express and MongoDB. It enables users to register, log in, and post images with descriptions. The application uses `passport.js` for authentication and `multer` for handling file uploads.

## Table of Contents
- [Features](#Features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)


## Features

- User authentication (register/login/logout)
- Profile management
- Image posting with description
- Feed to view all user posts

## Installation

To install `Pin`, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pin.git

2. Change to the project directory:
   ```bash
   cd pin

3. Install dependencies:
   ```bash
   npm install


4. Set up your MongoDB database:
   - Create a new MongoDB database.
   - Note down your database URI, you will need it for your application configuration.

5. Configure your environment variables:
   - Create a `.env` file in the root directory of your project.
   - Add the following environment variables:
     ```
     DB_URI=your_database_uri
     SESSION_SECRET=your_secret_key
     ```


     6. Start the server:
   - Run the following command in your terminal:
     ```bash
     npm start
     ```
   - This will start your application on `http://localhost:3000`.

6. Start the server:
   - Run the following command in your terminal:
     ```bash
     npm start
     ```
   - This will start your application on `http://localhost:3000`.


## Usage

After launching the application, you can navigate to `http://localhost:3000` in your web browser to access the Pin application. From there, you can register a new account or log in with an existing one to start posting images and viewing your feed.

## Contributing

Contributions to the Pin project are welcome! If you have suggestions for improvements or bug fixes, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


