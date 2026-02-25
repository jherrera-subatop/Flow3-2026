/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirecciones para que URLs habituales no devuelvan 404
  async redirects() {
    return [
      { source: "/", destination: "/overview", permanent: false },
      { source: "/dashboard", destination: "/overview", permanent: false },
      { source: "/inicio", destination: "/overview", permanent: false },
    ];
  },
};

export default nextConfig;
