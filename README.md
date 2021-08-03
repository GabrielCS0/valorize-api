<h1 align="center"> Valorize API </h1>

<p align="center">
   <img alt="Repository size" src="https://img.shields.io/github/repo-size/GabrielCordeiroDev/valorize-api?color=4BB543">
  <img alt="Made by Gabriel" src="https://img.shields.io/badge/made%20by-GabrielCordeiro-%20?color=4BB543">
  <img alt="Project top programing language" src="https://img.shields.io/github/languages/top/GabrielCordeiroDev/valorize-api?color=4BB543">
  <img alt="GitHub license" src="https://img.shields.io/github/license/GabrielCordeiroDev/valorize-api?color=4BB543">
</p> 

## 💻 Project

This is an API with the aim of promoting the relationship of team members through compliments

## 🔧 How it Works

You can simply create your account and send a compliment to a co-worker who deserves it.

## 👨‍💻 Main Technologies Used

The main technologies used in the development were as follows:

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [JSONWebToken](https://github.com/auth0/node-jsonwebtoken#readme)
- [Jest](https://jestjs.io/)
- [Typeorm](https://typeorm.io/)
- [Tsyringe](https://github.com/microsoft/tsyringe)

## 🚀 How to execute

First of all, clone the repository and navigate to its folder

```bash
$ git clone https://github.com/GabrielCordeiroDev/valorize-api
$ cd valorize-api
```

Run the following commands below

```bash
# Install all dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables
$ cp .env.example .env

# Put the database online
$ docker-compose up -d

# Create the tables in the database
$ yarn typeorm migration:run
```
*You must have a postgres image

<br />

And now you can run the project:

```bash
$ yarn dev
```

The API will be available at [localhost:5000](http://localhost:5000)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/GabrielCordeiroDev/valorize-api/blob/main/LICENSE) file for details.
