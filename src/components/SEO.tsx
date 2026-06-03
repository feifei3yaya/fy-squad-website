import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  schema?: Record<string, unknown>;
}

const SITE_NAME = '肥鸭战队社区官网';
const BASE_URL = 'https://www.fy-squad.cn';
const DEFAULT_DESC = '肥鸭战队(FY Squad) — 专注战术小队(Squad)的华人竞技社区。公平竞技、团队协作、战术至上，提供服务器联机、游戏百科、战术攻略、战队招募等服务。';
const DEFAULT_KEYS = '肥鸭战队,FY战队,FY Squad,战术小队,Squad,游戏社区,华人战队,战术射击,FPS,军事模拟';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/logo.png`;

export default function SEO({
  title,
  description = DEFAULT_DESC,
  keywords = DEFAULT_KEYS,
  ogImage = DEFAULT_OG_IMAGE,
  ogUrl = BASE_URL,
  schema,
}: SEOProps) {
  const pageTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="肥鸭战队 FY Squad" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:locale" content="zh_CN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* 结构化数据 */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

export { SITE_NAME, BASE_URL, DEFAULT_DESC, DEFAULT_KEYS, DEFAULT_OG_IMAGE };
