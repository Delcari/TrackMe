
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

$('#register').on("click", () => {
    const username = $('#username').val();
    const password = $('#password').val();
    const confirm = $('#confirm').val();

    const exists = users.find(user => user.name === username);
    
    if (!exists && password === confirm) {
        users.push({name : username, password});     

        localStorage.setItem('users', JSON.stringify(users));
        $('#message').removeClass().text("");

        //localStorage.setItem('isAuthenticated', true);
    }
    else
    {
        $('#message').addClass("alert alert-primary").text("ERROR: Username already taken!");
    }
});