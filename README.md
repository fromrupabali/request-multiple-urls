# request-multiple-urls

A module used to fetch an array of URLs which contain JSON data and returns the response as a Promise Object.

# Installation steps

npm install request-multiple-urls

# Example usage

const getMultipleUrls = require("request-multiple-urls");

const test_urls = [
"https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json",
"https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json",
"https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json",
];
getMultipleUrls(test_urls).then((urlContent) => {
console.log( urlContent);
});
