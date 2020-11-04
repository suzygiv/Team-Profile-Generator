const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];


function teamMembers() {

     // User questions
     //Collects user responses and write to the team.html file
    inquirer.prompt([
        {
            type: "input",
            message: "What is your manager's name?",
            name: "name",
        },
        {
            type: "input",
            message: "Please enter employee ID",
            name: "id",
        },
        {
            type: "input",
            message: "Please enter employee email",
            name: "email",
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "officeNumber",
        }
        ]).then(function (response) {
            let manager = new Manager(response.name, response.id, response.email, response.officeNumber);
            team.push(manager)
            nextEmployee()
        }).catch(function(err) {
            console.log(err);
        });


    async function nextEmployee() {
        try {
            let teamChoice = await inquirer.prompt([
            {
                type: 'list',
                name: 'team',
                message: 'Which type of team member would you like to add',
                choices: [
                    "Engineer", 
                    "Intern", 
                    "My team is complete."
                ]
            }
        ]);
        if (teamChoice.team === 'Engineer') {
            inquirer.prompt([
            {
                type: "input",
                message: "What is your engineer's name?",
                name: "name",
            },
            {
                type: "input",
                message: "Please enter employee ID",
                name: "id",
            },
            {
                type: "input",
                message: "Please enter employee email",
                name: "email",
            },
            {
                type: "input",
                message: "What is your engineer's GitHub username?",
                name: "github",
            }
        ]).then(function (response) {
            let engineer = new Engineer(response.name, response.id, response.email, response.github);
            team.push(engineer);
            nextEmployee();
        }).catch(function(err) {
            console.log(err);
        });

        } else if (teamChoice.team === 'Intern') {
            inquirer.prompt([
            {
                type: "input",
                message: "What is your intern's name?",
                name: "name",
            },
            {
                type: "input",
                message: "Please enter employee ID",
                name: "id",
            },
            {
                type: "input",
                message: "Please enter employee email",
                name: "email",
            },
            {
                type: "input",
                message: "Please enter the intern's school name",
                name: "school",
            }
        ]).then(function (response) {
            let intern = new Intern(response.name, response.id, response.email, response.school);
            team.push(intern);
            nextEmployee();
        }).catch(function(err) {
            console.log(err);
        });

        } else {generateFile()}

            } catch (err) {
                console.log(err);
            }
        }
}

// Runs the application
teamMembers();


function generateFile() {
    fs.writeFileSync(outputPath, render(team),"utf-8")
}
