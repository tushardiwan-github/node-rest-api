module.exports = (app) => {
    const employee = require('../controller/employee.controller.js');

    // Create a new Employee
    app.post('/api/employee', employee.createEmployee);

    // Retrieve all Employee
    app.get('/api/employee', employee.findAllEmployee);

    // Retrieve a single Employee with EmployeeId
    app.get('/api/employee/:employeeId', employee.findOneEmployee);

    // Update a Employee with EmployeeId
    app.put('/api/employee/:employeeId', employee.updateEmployee);

    // Delete a Employee with EmployeeId
    app.delete('/api/employee/:employeeId', employee.deleteEmployee);

    //Authenticate User
    app.post('/api/login', employee.loginUser);
}