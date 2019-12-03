// API Helper for making sure all Fetch calls handles JSON the same way
const successPayload = { payload: {}, success: true };

const errorPayload = { payload: {}, success: false };

const invalidSessionResponse = {
  message: "Please Login",
  payload: {},
  sucess: false
};

const jsonOptions = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json"
  }
};

const getOptions = { method: "GET", credentials: "include" };

const postOptions = { ...jsonOptions, method: "POST" };

const putOptions = { ...jsonOptions, method: "PUT" };

const deleteOptions = { ...jsonOptions, method: "DELETE" };

async function parseJSON(response, api, defaultResponse) {
  try {
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(
      `ParseJSON ( via Middleware ) Error ${api || "API:Unknown"}:`,
      err
    );
    // TODO - Remove later - trying to find reason for 504 responses
    console.error(
      "\nPalette Response:",
      { status: response.status, text: response.statusText },
      "\n"
    );
    return defaultResponse || { success: false };
  }
}

// APIs don't always pass back Objects Ordered, so Helpers
// Ex -> countries: {us: 'United States', cv: 'Cape Veder', uk: 'United Kindom', ca: 'Canada' }
// Result -> countries: { ca: 'Canada', cv: 'Cape Veder', uk: 'United Kindom', us: 'United States' }
function sortObjectByKeys(obj) {
  const orderedObject = {};
  Object.keys(obj)
    .sort()
    .forEach(key => (orderedObject[key] = obj[key]));
  return orderedObject;
}

// Ex -> categories: { 0: 'Paintings', 1: 'Sculpture', 2: 'Drawings' }
// Result -> categories: { 2: 'Drawings', 0: 'Paintings', 1: 'Sculpture' }
function sortObjectByValues(obj) {
  const orderedObject = {};
  Object.keys(obj)
    .sort((a, b) => (obj[a] > obj[b] ? 1 : -1))
    .forEach(key => (orderedObject[key] = obj[key]));
  return orderedObject;
}

module.exports = {
  deleteOptions,
  errorPayload,
  getOptions,
  invalidSessionResponse,
  jsonOptions,
  parseJSON,
  postOptions,
  putOptions,
  sortObjectByKeys,
  sortObjectByValues,
  successPayload
};
