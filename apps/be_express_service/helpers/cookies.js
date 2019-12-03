const secondsPerDay = 60 * 60 * 24;
const defaultExpiration = 31;

// Get Cookie From Server or Browser
const getCookie = ({ req, name }) => {
  if (req && req.cookies) {
    return req.cookies[name];
  }
  return "";
};

// Create/Renew Cookies
const setCookie = params => {
  const { req, res, name, value, expiration } = params;
  const expires = (expiration || defaultExpiration) * secondsPerDay;
  const cookieValue = typeof value === "function" ? value() : value || "";
  if (req && res) {
    res.cookie(name, cookieValue, {
      expire: expires,
      domain: `.saatchiart.com`
    });
  }
  return cookieValue;
};

module.exports = {
  getCookie,
  setCookie
};
