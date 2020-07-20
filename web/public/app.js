
//Loads the nav menu and footer into their respective divs on each page.
$('#navbar').load('navbar.html');
$('#footer').load('footer.html');


//const devices = JSON.parse(localStorage.getItem('devices')) || [];
const response = $.get('http://localhost:3001/devices')
.then(response => {
    response.forEach(device =>
    {
        $('#devices tbody').append(`
        <tr>
        <td>${device.user}</td>
        <td>${device.name}</td>
        </tr>`);
    });
})
.catch(error => {
    console.log(`Error: ${error}`)
});


const users = JSON.parse(localStorage.getItem('users')) || [];

//Adds the device to the devices array when the save button is clicked
$("#add-device").on("click", () => {
    const user = $('#user').val();
    const name = $('#name').val();
    const sensorData = [];

    const body = {
        name, 
        user, 
        sensorData
    };

    $.post('http://localhost.com:3001/devices', body)
    .then(response => {
        location.href = '/';
    })
    .catch(error => {
            console.error(`Error: ${error}`);
        });
    });

//Send command, prints the user input to console when the send button in pressed
$('#send-command').on("click", function () {
    const command = $('#command').val();
    
    console.log(`command is ${command}`);
}); 

//Checks if the username is unique and registers the 
//user if the password matches the confirmation
$('#register').on("click", () => {
    const username = $('#reg-username').val();
    const password = $('#reg-password').val();
    const confirm = $('#reg-confirm').val();
    
    $('#reg-message').removeClass().text("");

    const exists = users.find(user => user.name === username);
    
    if (!exists && password === confirm) {
        users.push({name : username, password});     
        
        localStorage.setItem('users', JSON.stringify(users));
        location.href = '/login';
    }
    else if (exists)
        $('#reg-message').addClass("alert alert-primary").text("ERROR: Username already taken!");
    else
        $('#reg-message').addClass("alert alert-primary").text("ERROR: Passwords don't match!");

});

//Checks if the credentials match and updates the isAuthenticated variable.
$('#login').on("click", () => {
    const username = $('#login-username').val();
    const password = $('#login-password').val();
    
    $('#login-message').removeClass().text("");
    
    const exists = users.find(user => user.name == username)

    if (exists && password == exists.password)
    {
        console.log("i exist");
        localStorage.setItem('isAuthenticated', true);
        location.href = '/';
    }
    else
    {
        $('#login-message').addClass("alert alert-primary").text("ERROR: Username or password does not match!");
    }
});

//logs out the user and redirects to the login page
const logout = () => {
    localStorage.removeItem('isAuthenticated');
    location.href = '/login';
};