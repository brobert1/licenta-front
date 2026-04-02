import { baseurl, description, image, sitename, title } from '@site.config';
import Head from 'next/head';

const OpenGraph = ({
  title: titleProp,
  description: descProp,
  image: imageProp,
  url: urlProp,
} = {}) => {
  // The key property is used to prevent duplicate meta tags
  // https://nextjs.org/docs/api-reference/next/head#multiple-instances

  const resolvedTitle = titleProp || title;
  const resolvedDescription = descProp || description;
  const resolvedImage = imageProp || image;
  const resolvedUrl = urlProp || baseurl;

  return (
    <Head>
      <meta property="og:site_name" key="og:site_name" content={sitename} />
      <meta property="og:title" key="og:title" content={resolvedTitle} />
      <meta property="og:description" key="og:description" content={resolvedDescription} />
      <meta property="og:image" key="og:image" content={resolvedImage} />
      <meta property="og:image:width" key="og:image:width" content="1200" />
      <meta property="og:image:height" key="og:image:height" content="630" />
      <meta property="og:url" key="og:url" content={resolvedUrl} />
      <meta property="og:type" key="og:type" content="website" />

      <meta itemProp="name" key="itemProp:name" content={resolvedTitle} />
      <meta itemProp="description" key="itemProp:description" content={resolvedDescription} />
    </Head>
  );
};

export default OpenGraph;
