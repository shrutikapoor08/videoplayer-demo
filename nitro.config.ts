import { defineNitroConfig } from 'nitropack/config'
export default defineNitroConfig({
    routeRules: {
        '/assets/*': {
            headers: {
                'Cache-Control': 'public, max-age=31536000',
            },
        },
    },
    compressPublicAssets: true,
})