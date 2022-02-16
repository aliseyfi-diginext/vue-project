

// فایل کانفیگ وایت
// وایت در واقع همان پکیجی است که کار بالا آوردن پروژه روی لوکال هاست پورت 3000 را انجام میدهد
// معمولا تغییراتی در این فایل اعمال نمیکنیم

import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
