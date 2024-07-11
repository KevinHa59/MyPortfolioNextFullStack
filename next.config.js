/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_AXIOS_TIMEOUT: 5000,
    NEXT_PUBLIC_TOKEN_KEY: "1234@abcd",
    NEXT_PUBLIC_OPENAI_API_KEY:
      "sk-proj-3jnXtx6pMVZaAb2XVJimT3BlbkFJOlD2NCgnSZuSGZtM094f",
    NEXT_PUBLIC_API_LAYER_KEY: "MgnWVJlWYN6cOeavcLJloCSF3UHjCECr",
  },
};

module.exports = nextConfig;
