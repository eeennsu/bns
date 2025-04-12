import type { NextConfig } from 'next'

const isStg = process.env.STAGE === 'github'

const nextConfig: NextConfig = {
    output: 'export',
    ...(isStg && {
        basePath: '/bns',
        assetPrefix: '/bns/',
    }),
}

export default nextConfig
