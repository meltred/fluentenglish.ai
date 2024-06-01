/** @type {import('next').NextConfig} */
import { withLogtail } from "@logtail/next";

const nextConfig = {
  fetchCache: false,
};

export default withLogtail(nextConfig);
