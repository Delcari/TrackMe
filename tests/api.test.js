const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const { API_URL } = process.env;


test('Device array GET /devices', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/devices`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[0].user).toEqual('mary123');
    });
});

test('Device history GET /devices/:deviceId/device-history', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/devices/5f156205a417664b736008c9/device-history`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[0].temp).toEqual(14);
    })
});

test('Test page GET /test', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/test`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp).toBe("The API is working!");
    })
});

test('Device, create new POST /devices', () => {
    expect.assertions(1);
    return axios.post(`${API_URL}/devices`, { name: "Fred's Phone", user: "Fred" })
    .then(resp => resp.data)
    .then(resp => {
        expect(resp).toBe("Successfully added device and data");
    })
});

test('Authenticate user POST /authenticate', () => {
    expect.assertions(1);
    return axios.post(`${API_URL}/authenticate`, { user: "Riley", password: "wow" })
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.success).toBe(true);
    })
})

test('Register user POST /registration', () => {
    expect.assertions(1);
    return axios.post(`${API_URL}/registration`, { user: "Joe", password: "magic" })
    .then(resp => resp.data)
    .then(resp => {
        expect(resp.success).toBe(true);
    })
})

test('List user devices GET /users/:user/devices', () => {
    expect.assertions(1);
    return axios.get(`${API_URL}/users/bob/devices`)
    .then(resp => resp.data)
    .then(resp => {
        expect(resp[1].name).toBe("Bob's RuneLite Client");
    })
})

