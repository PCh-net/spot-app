import React from 'react';
import { Helmet } from 'react-helmet-async';

const SeoMetaTags: React.FC<{ title: string; description: string; imageUrl?: string; keywords?: string }> = ({ title, description, imageUrl, keywords }) => {
  return (
    <Helmet>

      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:type" content="website" />

      <meta name="author" content="PCh" />
      {keywords && <meta name="keywords" content={keywords} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

    </Helmet>
  );
};

export default SeoMetaTags;
