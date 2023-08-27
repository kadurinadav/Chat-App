<p align="center">
  <h1 align="center">Chat App</h1>
<img src="chat-app-preview.gif"/>
  <p align="center">
    A web-based messaging application that delivers messages instantaneously using Socket.io.
    <br /><br />

<h2 style="display: inline-block">Table of Contents</h2>
<ol>
  <li>
    <a href="#about-the-project">About The Project</a>
    <ul>
      <li><a href="#built-with">Built With</a></li>
    </ul>
  </li>
  <li>
    <a href="#getting-started">Getting Started</a>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation">Installation</a></li>
    </ul>
  </li>
  <li><a href="#usage">Usage</a></li>
</ol>

## About The Project

### Built With

- **[React](https://reactjs.org/)**
- **[Node.js](https://nodejs.org/en/)**
- **[Socket.io](https://socket.io)**
- **[MongoDB](https://www.mongodb.com/)**

## Getting Started

To run this app follow these instructions.

### Prerequisites

Install latest version of npm

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the project
   ```sh
   git clone https://github.com/kadurinadav/Chat-App.git
   ```
2. Go to project directory and run the client and the server as instructed below. 

#### server side
1. Navigate to the server folder:
   ```sh
   cd server
   ```
2. Install NPM packages:
   ```sh
   npm install
   ```
3. Create .env file in server directory.
4. Create database at MongoDB and add the uri to .env file
   ```sh
   DATABASE_URI=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/DATABASE_NAME 
   ```
   for example DATABASE_URI = "mongodb://localhost:27017/chat-app"
5. Add your preferred PORT to .env file
   ```sh
   PORT=xxxx
   ```
6. Start the server
   ```sh
   npm start
   ```
#### client side
1. Navigate to the client folder:
   ```sh
   cd client
   ```
2. Install NPM packages:
   ```sh
   npm install
   ```
3. Start the application
    ```sh
    npm start
    ```

