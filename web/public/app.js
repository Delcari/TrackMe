
//Loads the nav menu and footer into their respective divs on each page.
$('#navbar').load('navbar.html');
$('#footer').load('footer.html');


const devices = JSON.parse(localStorage.getItem('devices')) || [];

const users = JSON.parse(localStorage.getItem('users')) || [];
                 
//Adds all the devices from the devices array to the table
devices.forEach(function(device) {
    $('#devices tbody').append(`
    <tr>
    <td>${device.user}</td>
    <td>${device.name}</td>
    </tr>`
    );
});

//Adds the device to the devices array when the save button is clicked
$("#add-device").on("click", function () {
    const user = $('#user').val();
    const name = $('#name').val();
    
    devices.push({user, name});
    localStorage.setItem('devices', JSON.stringify(devices))
    
    location.href = '/';
});

//Send command, prints the user input to console when the send button in pressed
$('#send-command').on("click", function () {
    const command = $('#command').val();
    
    console.log(`command is ${command}`);
}); 

//Checks if the username is unique and registers the 
//user if the password matches the confirmation
$('#register').on("click", () => {
    const username = $('#username').val();
    const password = $('#password').val();
    const confirm = $('#confirm').val();
    
    $('#message').removeClass().text("");

    const exists = users.find(user => user.name === username);
    
    if (!exists && password === confirm) {
        users.push({name : username, password});     
        
        localStorage.setItem('users', JSON.stringify(users));
    }
    else
    {
        $('#message').addClass("alert alert-primary").text("ERROR: Username already taken!");
    }
});

//Checks if the credentials match and updates the isAuthenticated variable.
$('#login').on("click", () => {
    const username = $('#username').val();
    const password = $('#password').val();
    
    $('#message').removeClass().text("");
    
    const exists = users.find(user => user.name == username)

    if (exists && password == exists.password)
    {
        console.log("i exist");
        localStorage.setItem('isAuthenticated', true);
        location.href = '/';
    }
    else
    {
        $('#message').addClass("alert alert-primary").text("ERROR: Username or password does not match!");
    }
});

//logs out the user and redirects to the login page
const logout = () => {
    localStorage.removeItem('isAuthenticated');
    location.href = '/login';
};