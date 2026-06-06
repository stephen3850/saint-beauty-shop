import { Helmet } from 'react-helmet-async';
import { APP_NAME } from '../utils/constants';

const SEOHead = ({ title, description, keywords, image, url }) => {
  const fullTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  const defaultDesc = "Discover your natural glow with Saint Beauty shop's premium collection of ethically sourced beauty products.";
  const siteUrl = window.location.origin;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || `${siteUrl}/logo.png`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || window.location.href} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description || defaultDesc} />
      <meta property="twitter:image" content={image || `${siteUrl}/logo.png`} />
    </Helmet>
  );
};

export default SEOHead;
