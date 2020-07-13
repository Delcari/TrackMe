const devices = [];

devices.push({ user: "Mary", name: "Mary's Iphone"});
devices.push({ user: "Alex", name: "Alex's Surface Pro"});
devices.push({ user: "Mary", name: "Mary's Macbook" });

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
document.querySelector("#add-device").addEventListener('click', function() {
    const user = document.querySelector('#user').value;
    const name = document.querySelector('#name').value;

    devices.push({user:user, name:name});
    console.log(devices);
});