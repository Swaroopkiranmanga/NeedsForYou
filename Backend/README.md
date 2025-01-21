# E-Commerce Backend - Spring Boot Project

This project is a Spring Boot-based backend service for an e-commerce platform. It uses MySQL for data storage, Amazon S3 for file storage, and Razorpay for payment processing.

## Features

- **Spring Boot Framework:** Simplified development with preconfigured components.
- **MySQL Integration:** Relational database management with Hibernate ORM.
- **Amazon S3 Integration:** Storage of media files and other assets.
- **Razorpay Payment Gateway:** Secure payment handling.
- **Maven Build System:** Dependency management and project configuration.

## Prerequisites

Ensure you have the following installed:

- [Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html) (version 8 or higher)
- [Apache Maven](https://maven.apache.org/) (version 3.6 or higher)
- [MySQL](https://www.mysql.com/) (version 5.7 or higher)
- AWS account for S3 configuration
- Razorpay account for payment integration

## Configuration

Update the following properties in the `application.properties` file:

### Replace placeholders with:
- `{YourDatabaseName}`: Name of your MySQL database
- `{databaseUsername}`: Your database username
- `{databasePassword}`: Your database password
- `{bucketName}`: Your S3 bucket name
- `{S3BucketRegion}`: AWS region of your S3 bucket
- `{accessKey}`: Your AWS access key
- `{secretKey}`: Your AWS secret access key
- `{razorpayTestKey}`: Your Razorpay test key
- `{razorpayTestSecret}`: Your Razorpay test secret

## Running the Application

### 1. Clone the repository
```bash
git clone <repository_url>
cd <project_directory>
```

### 2. Build the project
Use Maven to build the project:
```bash
mvn clean install
```

### 3. Run the application
Start the application using:
```bash
mvn spring-boot:run
```

The application will run on `http://localhost:8081`.

## Build and Deploy

### Package the Application
Create a JAR file for deployment:
```bash
mvn package
```
The JAR file will be located in the `target` directory.

### Deploy the JAR
Run the JAR file:
```bash
java -jar target/<your-application-name>.jar
```

## Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Hibernate Documentation](https://hibernate.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [AWS S3 Documentation](https://aws.amazon.com/s3/)
- [Razorpay Documentation](https://razorpay.com/docs/)
