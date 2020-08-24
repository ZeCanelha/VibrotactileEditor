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

  //TODO: Re-factor saveProjectConfigurations

  static async savePattern(endpoint, body) {
    try {
      let response = await fetch(baseUrl + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  static async saveProjectConfiguration(
    projectConfig,
    method = "POST",
    projectId = null
  ) {
    let endpoint = "/configs";
    if (method === "PUT") {
      endpoint = "/configs/" + projectId;
    }
    try {
      let response = await fetch(baseUrl + endpoint, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectConfig),
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Database;
