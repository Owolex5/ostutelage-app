export default function Head() {
  return (
    <>
      {/* ✅ Page Title */}
      <title>Ostutelage | Learn Design, Tech & Business</title>

      {/* ✅ Responsive Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* ✅ SEO Meta */}
      <meta
        name="description"
        content="Ostutelage is a modern learning platform offering courses in design, tech, and business. Learn from experts and build real-world skills."
      />
      <meta
        name="keywords"
        content="Ostutelage, online learning, tech courses, UI/UX design, data science, coding, business"
      />
      <meta name="author" content="Ostutelage" />

      {/* ✅ Open Graph (for social media preview) */}
      <meta property="og:title" content="Ostutelage | Learn Design, Tech & Business" />
      <meta
        property="og:description"
        content="Join Ostutelage to master design, technology, and business through expert-led courses."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ostutelage.tech" />
      <meta property="og:image" content="/images/og-image.jpg" />

      {/* ✅ Favicon */}
      <link rel="icon" href="/images/favicon.ico" />
    </>
  );
}
