const siteUrl = 'https://cosmoskit.com';
const siteAddress = new URL(siteUrl);
const canonical = siteAddress.href.slice(0, -1);
const title = 'Cosmos Kit';
const description =
  'Cosmos Kit is a wallet adapter for developers to build apps that quickly and easily interact with Cosmos blockchains and wallets.';
const fbAppId = null;
module.exports = {
  title,
  canonical,
  description,
  openGraph: {
    type: 'website',
    url: siteUrl,
    title,
    description,
    site_name: title,
    images: [
      {
        url: canonical + '/og_image.png',
        // width: 942,
        // height: 466,
        alt: title
      }
    ]
  },
  twitter: {
    handle: '@cosmology_tech',
    site: '@cosmology_tech'
  },
  facebook: fbAppId
    ? {
        appId: fbAppId
      }
    : undefined
};
