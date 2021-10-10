"use strict";
const response = {};
response.send = (res, status, success, data, errors) => {
  const response = {};
  if (success) response.success = success;
  if (data) response.data = data;
  if (errors) response.errors = errors;
  res.status(status).json(response);
};
module.exports = response;
