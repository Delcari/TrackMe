const devices = [];

devices.push({ user: "Mary", name: "Mary's Iphone"});
devices.push({ user: "Alex", name: "Alex's Surface Pro"});
devices.push({ user: "Mary", name: "Mary's Macbook" });

devices.forEach(function(device) {
    $('#devices tbody').append(`
    <tr>
        <td>${device.user}</td>
        <td>${device.name}</td>
    </tr>`
    );
});