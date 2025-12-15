import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  sassOptions: {
    additionalData: `$sm: 428px; $md: 768px; $lg: 992px; $xl: 1280px;`,
  },
};

export default nextConfig;
