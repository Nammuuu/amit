const axios = require('axios');
const cheerio = require('cheerio');

const shopifyStoreUrl = 'https://your-shopify-store-url.com';
const targetUrl = `${shopifyStoreUrl}/your-product-url`;

axios.get(targetUrl)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Use Cheerio selectors to extract relevant data from the HTML
    const productTitle = $('h1.product-title').text();
    const productPrice = $('span.product-price').text();
    // Add more selectors as needed

    // Construct the iframe content
    const iframeContent = `
      <html>
        <head>
          <!-- Add any necessary styles or scripts for virtual try-on -->
        </head>
        <body>
          <h1>${productTitle}</h1>
          <p>${productPrice}</p>
          <!-- Add other product details as needed -->
        </body>
      </html>
    `;

    // Print or do something with the iframe content
    console.log(iframeContent);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
