// eslint-disable-next-line import/no-extraneous-dependencies
import withBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,

      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddada-image.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**', // 모든 경로 허용
      },
    ],
    domains: ['img.danawa.com'],
  },
}
const analyzing = process.env.ANALYZE === 'true'
const configExport = analyzing
  ? withBundleAnalyzer({ enabled: true })(nextConfig)
  : nextConfig

export default configExport
