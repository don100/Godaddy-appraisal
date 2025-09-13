export async function handler(event, context) {
  const domain = event.queryStringParameters.domain;

  try {
    const response = await fetch(
      `https://www.afternic.com/fosv2/api/v1/domains/${domain}/valuation`
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Failed to fetch from Afternic" }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
