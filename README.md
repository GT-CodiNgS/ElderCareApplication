# Elder Care Web Application

This project provides a comprehensive solution for elder care, leveraging a blend of technologies including .NET 7, Angular 16, PostgreSQL, and Docker Compose.

## Prerequisites
Before you begin, ensure you have the following installed on your system:



* .NET SDK (For non-Docker setup): Install .NET SDK
* Node.js and npm (For non-Docker setup): Download Node.js and npm
* Angular CLI (For non-Docker setup): npm install -g @angular/cli
* Docker: [Get Docker](https://docs.docker.com/get-docker/)
* Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)https://docs.docker.com/compose/install/


## Quick Start
## 1.  Setup and Run with Docker
1. Clone the Repository

'git clone https://github.com/GT-CodiNgS/ElderCareApplication.git'
cd ElderCareApplication

2. Build and Run using Docker Compose

docker-compose up --build


This command will build and run the web, api, db, and db_migrator services. After completion, the Elder Care application should be accessible in your web browser at http://localhost/4200.

## 2. Setup and Run without Docker

1. Clone the Repository
git clone https://github.com/GT-CodiNgS/ElderCareApplication.git
cd ElderCareApplication

2. Set up the Backend API

Navigate to the API directory:
cd EdlerCareApi

Restore packages and run:
dotnet restore
dotnet run

This will start the backend server, by default on http://localhost:7177.

3. Set up the Frontend Application

Navigate to the frontend directory:
cd ElderCareClient

Install dependencies and start the Angular development server:
npm install
ng serve

The frontend application will be available on http://localhost:4200.

## Database Setup with Migrations
1. To set up the database using Entity Framework migrations, follow these steps:

2. Ensure PostgreSQL is Running: Before proceeding, make sure you have PostgreSQL installed and it's running on your machine.

3. Open Your Solution in Visual Studio: Navigate to the solution file (*.sln) and open it.

4. Open Package Manager Console: In Visual Studio, navigate to Tools > NuGet Package Manager > Package Manager Console.

5. Set the API project as Default Project: In the Package Manager Console, use the "Default Project" dropdown to select the API project (e.g., EdlerCareApi).

6. Run Migrations: In the Package Manager Console, execute the following commands to create and apply migrations:
   
8. Configure Connection String: Ensure the connection string in your API's appsettings.json (or the appropriate configuration file) points to the correct PostgreSQL instance and database.
## Services
Web - The frontend Angular application.
API - The backend API developed using .NET 7.
DB - PostgreSQL database for storing application data.
DB Migrator - Service responsible for applying database migrations.
Contributing
Please refer to CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests to us.

## Security Tips
:warning: Avoid publishing sensitive data such as database usernames and passwords. Always use environment variables or consider secrets management tools in a production setting.
:shield: Ensure you always keep your software and its dependencies up-to-date to prevent vulnerabilities.
## License

This project is licensed under the MIT License - please refer to the LICENSE.md file for more details.
