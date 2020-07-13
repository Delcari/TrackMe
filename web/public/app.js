
$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const devices = JSON.parse(localStorage.getItem('devices')) || [];

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

