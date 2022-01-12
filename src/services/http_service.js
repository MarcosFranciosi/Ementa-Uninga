const apiURL = `http://localhost:3000`;

const execute = async function({ endpoint, id, method, body }) {
  let url = `${apiURL}/${endpoint}`;
  if (id) {
    url += `/${id}`;
  }
  const request = await fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: (method === "POST" || method === "PUT") ? JSON.stringify(body) : null
  });

  const response = request.json();
  return await response;
}

export class HttpService {
  static async get(endpoint) {
    return await execute({ endpoint, method: "GET" });
  }

  static async getById(endpoint, id) {
    return await execute({ endpoint, method: "GET", id });
  }

  static async post(endpoint, body) {
    return await execute({ endpoint, method: "POST", body });
  }

  static async put(endpoint, id, body) {
    return await execute({ endpoint, method: "PUT", id, body });
  }

  static async delete(endpoint, id) {
    return await execute({ endpoint, method: "DELETE", id });
  }  
}