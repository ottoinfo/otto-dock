// API Helpers
const successPayload = { payload: {}, success: true }

const errorPayload = { payload: {}, success: false }

const jsonOptions = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
}

const getOptions = { method: 'GET', credentials: 'include' }

const postOptions = { ...jsonOptions, method: 'POST' }

const putOptions = { ...jsonOptions, method: 'PUT' }

const deleteOptions = { ...jsonOptions, method: 'DELETE' }

module.exports = {
  deleteOptions,
  errorPayload,
  getOptions,
  jsonOptions,
  postOptions,
  putOptions,
  successPayload,
}
