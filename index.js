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
const https = require("https");

// Result
let finalResult = [];

//Error message
function handleError(err, message) {
  if (typeof err === "object") {
    if (err.message) {
      console.log("\nMessage: " + message);
    }
    if (err.stack) {
      console.log("\nStacktrace:");
      console.log(err.stack);
    }
  } else {
    console.log("Error :: argument is not an object");
  }
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

async function getResult(url, i, length) {
  await https
    .get(url, async (resp) => {
      await resp.on("data", (data) => {
        try {
          const body = JSON.parse(data.toString("utf8"));
          const result = {
            url,
            status: 200,
            body,
          };
          // console.log("Result", result);
          finalResult.push(result);
          //   if (length == i) {
          console.log(i, finalResult);
          //  }
        } catch (e) {
          const result = {
            url,
            status: 200,
            body: "Something wrong",
          };
          // console.log("Result", result);
          // let message = e.concat("\n" + `at async Promise.all index(${i})`);
          finalResult.push(e);
          if (length == i) {
            console.log(finalResult);
          }
        }
      });
      resp.on("end", () => {});
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}
async function getMultipleUrls(urls) {
  //Check url uis valid
  //if valid find the response from url
  // check the response
  //if response is valid make reponse
  //else throw error response
  //else throw error response
  const isValidUrls = checkUrls(urls);
  if (isValidUrls) {
    urls.map(async (url, i) => {
      await getResult(url, i, urls.length);
    });
    return finalResult;
  }
}
const test_urls = [
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json",
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json",
  "https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json",
];

getMultipleUrls(test_urls);
module.exports = getMultipleUrls;
