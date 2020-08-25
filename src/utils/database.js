const baseUrl = "http://localhost:3003/api";

class Database {
  // Manage requests to database

  static async fetchData(endpoint, method, query = "") {
    console.log(endpoint + method + query);
    try {
      let response = await fetch(baseUrl + endpoint + query, {
        method: method,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  static async postData(endpoint, body, method, query = "") {
    try {
      let response = await fetch(baseUrl + endpoint + query, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}

export default Database;
