// Write a JavaScript package that is able to:
// ● fetch an array of URLs which contain JSON data
// ● return their contents in a promise
// When writing this package, you should consider:
// ● Error states
// ● Testing
// ● Documentation
// ● Choice of dependencies

//all type requires
const URL = require("url").URL;
const axios = require("axios");

//Error handle
function handleError(err, message) {
  // if (typeof err === "object") {
  if (message) {
    console.log("\nMessage: " + message);
  }
  if (err.stack) {
    console.log("\nStacktrace:");
    console.log(err.stack);
  }
  setTimeout(function () {
    process.exit(1);
  }, 30);
}

//Check url is valid
const checkUrls = (urls) => {
  for (let i = 0; i < urls.length; i++) {
    try {
      new URL(urls[i]);
      result = true;
    } catch (err) {
      handleError(err, "Input URL is not in expected standard URI format");
      return false;
    }
  }
  return result;
};

const getResult = async (url, i) => {
  try {
    return await axios.get(url).then((res) => {
      if (res.headers["content-type"] == "application/json") {
        const result = {
          url,
          status: 200,
          data: res.data,
        };
        return result;
      } else {
        return {
          url,
          ErrorMessage: "Doesn't return a valid.",
        };
      }
    });
  } catch (err) {}
};

async function getMultipleUrls(urls) {
  if (urls.length === 0) {
    return "Input URLs array must not be empty";
  }
  const isValidUrls = checkUrls(urls);
  if (isValidUrls) {
    const promiseUrls = urls.map(async (url) => {
      return await getResult(url);
    });

    return await Promise.all(promiseUrls);
  }
}
module.exports = getMultipleUrls;
