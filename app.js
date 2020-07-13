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
$("#add-device").on("click", function () {
    const user = $('#user').val();
    const name = $('#name').val();
    
    devices.push({user, name});
    console.log(devices);
});