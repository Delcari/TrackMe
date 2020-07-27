
//Loads the nav menu and footer into their respective divs on each page.
$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

//API URL
const API_URL = 'https://api.rdellios.vercel.app/api'
const MQTT_URL = 'http://localhost:5001/'

//Currently logged in user
const currentUser = localStorage.getItem('user');

if (currentUser)
{
    //Gets the list of the users devices
    $.get(`${API_URL}/users/${currentUser}/devices`)
    .then(response => {
        response.forEach((device) => {
            //Adds the devices to the table
            $('#devices tbody').append(`
            <tr data-device-id=${device._id}>
                <td>${device.user}</td>
                <td>${device.name}</td>
            </tr>`
            );
        });
        //When a table item is clicked
        $('#devices tbody tr').on('click', (e) => {
            const deviceId = e.currentTarget.getAttribute('data-device-id');
            $.get(`${API_URL}/devices/${deviceId}/device-history`)
            .then(response => {
                //Place the sensor data in the Modal
                response.map(sensorData => {
                    $('#historyContent').append(`
                    <tr>
                    <td>${sensorData.ts}</td>
                    <td>${sensorData.temp}</td>
                    <td>${sensorData.loc.lat}</td>
                    <td>${sensorData.loc.lon}</td>
                    </tr>`);
                    //Show the Modal
                    $('#historyModal').modal('show')
                })
            })

        })

    }).catch(error => {
        console.error(`Error: ${error}`);
    });
}
else
{
    //If there is currently no user logged in
    const path = window.location.pathname;

    //Redirect to the login page
    if (path !== '/login') {
        location.href = '/login';
    }
}

//Adds the device to the DB when the save button is clicked
$("#add-device").on("click", () => {
    const user = $('#user').val();
    const name = $('#name').val();
    const sensorData = [];

    const body = {
        name, 
        user, 
        sensorData
    };

    $.post(`${API_URL}/devices`, body)
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
    const deviceId = $('#deviceid').val();
    $.post(`${MQTT_URL}/send-command`, { deviceId, command })
    .then(response => {
        console.log(response);
    })
    console.log(`command is ${command}`);
}); 

//Checks if the username is unique and registers the 
//user if the password matches the confirmation
$('#register').on("click", () => {
    const username = $('#reg-username').val();
    const password = $('#reg-password').val();
    const confirm = $('#reg-confirm').val();
    
    $('#reg-message').removeClass().text("");

    if (password === confirm) {
        $.post(`${API_URL}/register`, { user, password })
        .then(response =>{
            if (response.success)
                location.href = '/login';
            else
                $('#reg-message').addClass("alert alert-primary").text(response);
        });
    }
    else
        $('#reg-message').addClass("alert alert-primary").text("ERROR: Passwords don't match!");

});

//Login form
$('#login').on("click", () => {
    const user = $('#login-username').val();
    const password = $('#login-password').val();

    $('#login-message').removeClass().text("");

    //checks if the credentials match
    $.post(`${API_URL}/authenticate`, { user, password })
    .then(response => {
        //Adds data to local storage
        if (response.success) {
            localStorage.setItem('user', user);
            localStorage.setItem('isAdmin', response.setAdmin);

            location.href = '/';
        }
        else {
            $('#login-message').addClass("alert alert-primary").text(response);
        }
    });
});

//logs out the user and redirects to the login page
const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    location.href = '/login';
};