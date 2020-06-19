const baseUrl = "http://localhost:3003/api";

class Database {
  // Manage requests to database

  static async fetchData(endpoint, method, query = "") {
    try {
      let response = await fetch(baseUrl + endpoint + query, {
        method: method,
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async saveProjectConfiguration(
    hardwareDevice,
    deviceImage,
    projectName,
    actuators,
    actuators_coords
  ) {
    let body = {
      device: hardwareDevice,
      device_image: deviceImage,
      name: projectName,
      n_actuators: actuators,
      actuator_coords: actuators_coords,
    };
    let endpoint = "/configs";
    try {
      let response = await fetch(baseUrl + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      let data = await response.statusText;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Database;
