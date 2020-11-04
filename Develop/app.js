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

// User questions
const questions = [
    {
        type: "input", 
        message: "What is your name?",
        name: "name"  
    },
    {
        type: "list",
        message: "Please select employee role",
        name: "role",
        choices: [
            "Manager",
            "Engineer",
            "Intern"        
        ],   
    },
    {
        type: "input",
        message: "Please enter employee ID",
        name: "id"
    },
    {
        type: "input",
        message: "Please enter employee email",
        name: "email"
    },
    {
        type: "input",
        message: "What is the manager's office number?",
        name: "officeNumber",
        when: (input) => {
            if (input.role === "Manager") {
                return true
            }
        }
    },
    {
        type: "input",
        message: "What is the engineer's Github username?",
        name: "github",
        when: (input) => {
            if (input.role === "Engineer") {
                return true
            }
        }
    },
    {
        type: "input",
        message: "Where did the intern go to school?",
        name: "school",
        when: (input) => {
            if (input.role === "Intern") {
                return true
            }
        }
    },
    {
        type: "list",
        message: "Would you like to add another employees?",
        name: "addEmployee",
        choices: [
            "Yes",
            "No"
        ],
    }  
 
];

//Collects user responses and write to the team.html file
function init() {
    inquirer.prompt(questions).then(response => {
        if (response.role === "Manager") {
            const newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
            team.push(newManager);
            buildTeam();
        }
        else if (response.role === "Engineer") {
            const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
            team.push(newEngineer);
        }
        else if (response.role === "Intern") {
            const newIntern = new Intern(response.name, response.id, response.email, response.school);
            team.push(newIntern);
        }
        else if (response.addEmployee === "Yes") {
            init();
        }
        else {
            console.log("one needs to be selected");
        }
    })  
};

// function startTeam() {
    
// function Manager() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "managerName",
//             message: "What is your Manager's name?"
//         },
//         {
//             type: "input",
//             name: "id",
//             message: "What is your employee ID?"
//         },
//         {
//             type: "input",
//             name: "email",
//             message: "Please enter employee email"
//         },
//         {
//             type: "input",
//             name: "officeNumber",
//             message: "What is the manager's office number?",
//             when: (input) => {
//                 if (input.role === "Engineer") {
//                     return true
//                 }
//             }
//         }
//     ]).then(response => {
//         const newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
//             team.push(newManager);
//             teamID.push(response.id);
//             buildTeam();
//     })
// }

// function Engineer() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "engineerName",
//             message: "What is your name?"
//         },
//         {
//             type: "input",
//             name: "id",
//             message: "What is your employee ID?"
//         },
//         {
//             type: "input",
//             name: "email",
//             message: "Please enter employee email"
//         },
//         {
//             type: "input",
//             name: "github",
//             message: "What is the engineer's github username?"
//         }
//     ]).then(response => {
//         const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
//             team.push(newEngineer);
//             teamID.push(response.id);
//             buildTeam();
//     })
// }

// function Intern() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "internName",
//             message: "What is your name?"
//         },
//         {
//             type: "input",
//             name: "id",
//             message: "What is your employee ID?"
//         },
//         {
//             type: "input",
//             name: "email",
//             message: "Please enter employee email"
//         },
//         {
//             type: "input",
//             name: "school",
//             message: "Where did the intern go to school?"
//         }
//     ]).then(response => {
//         const newIntern = new Intern(response.name, response.id, response.email, response.school);
//             team.push(newIntern); 
//             teamID.push(response.id);
//             buildTeam();
//     })
// }

function buildTeam() {
    inquirer.prompt([
        {type: "list",
        name: "teamChoice",
        message: "Would you like to add another employee to your team?",
        choices: [
            "Engineer",
            "Intern",
            "I don't want to add another employee"
        ]
    }
    ]).then (userChoice => {
        if (userChoice.teamChoice === Engineer) {
            Engineer();

        } else if (userChoice.teamChoice === Intern) {
            Intern();
        } else (generateTeam);
    });
}

function generateTeam() {
    fs.writeFileSync(outputPath, render(team),"utf8");
}




// // Runs the application
init();


