module.exports = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "TrackMe - MQTT",
        description: "TrackMe MQTT API",
        contact: {
          name: "Riley"
        },
        servers: ["http://localhost:5001/"]
      }
    },
    apis: ["mqtt.js"]
  };