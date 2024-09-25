/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    NEXT_PUBLIC_AXIOS_TIMEOUT: 5000,
    NEXT_PUBLIC_TOKEN_KEY: "1234@abcd",
    NEXT_PUBLIC_OPENAI_API_KEY:
      "sk-proj-3jnXtx6pMVZaAb2XVJimT3BlbkFJOlD2NCgnSZuSGZtM094f",
    NEXT_PUBLIC_API_LAYER_KEY: "MgnWVJlWYN6cOeavcLJloCSF3UHjCECr",
    NEXT_PUBLIC_SALT_ROUND: 5,
    NEXT_PUBLIC_ACCESS_TOKEN_EXPIRE_TIME: 3600,
    NEXT_PUBLIC_DEVELOPMENT_URL: "http://localhost:3000",
    NEXT_PUBLIC_PRODUCTION_URL: "",
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
