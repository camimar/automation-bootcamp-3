# Automation Challenge with Cypress

## Introduction
Welcome to the repository! This project is an automation challenge using Cypress, conducted as part of the third automation bootcamp at Apply Digital. The goal is to enhance learning experiences by tackling real-world scenarios and implementing best practices in test automation. Scenarios tested and TestCases can be found within the next link:

[Casaideas.mx Bootcamp automation challenge: TestCase repository](https://docs.google.com/spreadsheets/d/1A-iPVQRSYVnf0x6DexiQrjSCpNTn-rJx/edit?gid=1160423172#gid=1160423172)

## Project Coverage

In this project, the main user flows of the website [Casa Ideas México](https://www.casaideas-mexico.mx/) have been automated. The aim was to cover essential functionalities that a typical user would interact with, providing a comprehensive test suite that ensures the website's reliability and performance.

### Why POM?
The Page Object Model (POM) design pattern has been utilized for the test scripts. POM helps in making the code more readable, maintainable, and reusable by separating the page structure from the test scripts. This approach allows for easy updates to tests in case of changes in the website's UI without rewriting the tests.

### Accessibility Testing
A section dedicated to accessibility testing is currently under construction. It is being developed with Axe Core, a powerful tool for accessibility testing, ensuring that the website is accessible to all users.

## Getting Started

To execute the tests in this repository, some dependencies need to be installed. Here's how to get started:

### Install Node.js and npm
Ensure Node.js and npm are installed on the machine. npm (Node Package Manager) comes with Node.js and is essential for managing the packages in this project.

### Install Cypress
Cypress is the test automation framework of choice. To install Cypress, run the following command:

- npm install cypress --save-dev

Cypress provides a robust platform for running end-to-end tests on the application, simulating real user interactions.

### Install cypress-axe and axe-core
For accessibility testing, cypress-axe alongside axe-core are used. These tools help in identifying accessibility issues in the web application. To install these, run:

- npm install --save-dev cypress-axe axe-core

### Install Faker
Faker is a library used for generating fake data for tests. This is particularly useful when testing with various inputs. To install Faker, run:

- npm install faker --save-dev

### Project Status
Please note that this repository is still under construction. Work is continuously being done on adding more tests and improving the existing ones to cover more scenarios and ensure the highest quality standards.

### Useful Links
For more information about the tools and libraries used in this project, check out the following documentation:

[Cypress Documentation](https://docs.cypress.io/guides/overview/why-cypress)
[cypress-axe GitHub](https://github.com/component-driven/cypress-axe)
[axe-core GitHub](https://github.com/dequelabs/axe-core)
[Faker.js Documentation](https://fakerjs.dev/)

Thank you for visiting this project, and it is hoped that the information and tests provided here are useful!