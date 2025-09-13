const fetch = require("node-fetch");

exports.handler = async function (event) {
  const domain = event.queryStringParameters.domain;
  if (!domain) {
    return { statusCode: 400, body: "Missing domain" };
  }

  const url = `https://www.afternic.com/fosv2/api/v1/domains/${encodeURIComponent(domain)}/valuation`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: `Error fetching from Afternic: ${res.statusText}`
      };
    }

    const text = await res.text();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Server error: ${err.message}`
    };
  }
};
