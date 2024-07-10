/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['lh3.googleusercontent.com','firebasestorage.googleapis.com']
    }
    output: "export",  // <=== enables static exports
  reactStrictMode: true,
  basePath: "/nextjs-github-pages",

};

export default nextConfig;
