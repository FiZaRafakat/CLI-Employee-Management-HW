import inquirer from "inquirer";
import chalk from "chalk";
import clear from "clear";
let employee = [];
async function firstAnimate(text) {
    for (let char of text) {
        process.stdout.write(char);
        await new Promise((resolve) => {
            setTimeout(resolve, 10);
        });
    }
}
async function TextAnimate(text) {
    for (let char of text) {
        process.stdout.write(char);
        await new Promise((resolve) => {
            setTimeout(resolve, 30);
        });
    }
}
async function enrollEmployee() {
    let ask = await inquirer.prompt([
        {
            name: "employeeName",
            type: "input",
            message: chalk.rgb(0, 255, 255)("Enter Employee name : ")
        },
        {
            name: "employeeId",
            type: "number",
            message: chalk.rgb(0, 255, 255)("Enter your Id number : ")
        },
        {
            name: "salary",
            type: "number",
            message: chalk.rgb(0, 255, 255)("Enter your salary : ")
        }
    ]);
    await TextAnimate(chalk.rgb(188, 143, 143)(`\nEmployee ${ask.employeeName} is Successfully Added.\n`));
    await firstAnimate(chalk.grey("\n---------------------------------------------------------\n\n"));
    employee.push({ name: ask.employeeName, ID: ask.employeeId, Salary: ask.salary });
}
async function editEmployee() {
    const choices = employee.map((employee, index) => ({ name: employee.name, value: index }));
    const { index } = await inquirer.prompt([{
            type: "list",
            name: "index",
            message: chalk.rgb(0, 255, 255)("Select Employee to edit :"),
            choices: choices
        }]);
    const updatedEmployee = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: chalk.rgb(0, 255, 255)(`Enter new name for ${employee[index].name}`)
        }, {
            type: "number",
            name: "Salary",
            message: chalk.rgb(0, 255, 255)(`Enter new Salary for ${employee[index].name}`)
        },
        {
            type: "number",
            name: "ID",
            message: chalk.rgb(0, 255, 255)(`Enter new ID for ${employee[index].name}`)
        }
    ]);
    employee[index] = updatedEmployee;
    await TextAnimate(chalk.rgb(188, 143, 143)(`\nEmployee ${updatedEmployee.name} with ID ${updatedEmployee.ID} is updated with salary ${updatedEmployee.Salary}\n`));
    await firstAnimate(chalk.grey("\n---------------------------------------------------------\n\n"));
}
async function DeleteInfo() {
    const choices = employee.map((employee, index) => ({ name: employee.name, value: index }));
    const { index } = await inquirer.prompt([{
            type: "list",
            name: "index",
            message: chalk.rgb(0, 255, 255)("Select Employee to Remove :"),
            choices: choices
        }]);
    const deletedEmployee = employee.splice(index, 1);
    await TextAnimate(chalk.rgb(188, 143, 143)(`\nEmployee ${deletedEmployee[0].name} Removed.\n`));
    await firstAnimate(chalk.grey("\n---------------------------------------------------------\n\n"));
}
async function shows() {
    const choices = employee.map((employee, index) => ({ name: employee.name, value: index }));
    const { index } = await inquirer.prompt([{
            type: "list",
            name: "index",
            message: "Select Employee :",
            choices: choices
        }]);
    await TextAnimate(chalk.rgb(205, 170, 145)(`\n\tName : ${employee[index].name}\n`, `\tID : ${employee[index].ID}\n`, `\tSalary : ${employee[index].Salary}\n`));
    await firstAnimate(chalk.grey("\n---------------------------------------------------------\n\n"));
}
async function main() {
    let Questions = await inquirer.prompt({
        name: "options",
        type: "list",
        choices: ["AddEmployee", "EditEmployeeInfo", "RemoveEmployee", "ShowStatus-Employees", "Exit"],
        message: chalk.rgb(200, 100, 200)("What's you want to do ?")
    });
    switch (Questions.options) {
        case "AddEmployee":
            await enrollEmployee();
            break;
        case "EditEmployeeInfo":
            await editEmployee();
            break;
        case "RemoveEmployee":
            await DeleteInfo();
            break;
        case "ShowStatus-Employees":
            await shows();
            break;
        case "Exit":
            await firstAnimate(chalk.grey("\n---------------------------------------------------------\n"));
            return;
    }
    main();
}
clear();
main();
