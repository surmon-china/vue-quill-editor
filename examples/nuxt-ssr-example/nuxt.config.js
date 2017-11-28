module.exports = {
  // some nuxt config...
  plugins: [
    { src: '~plugins/nuxt-quill-plugin.js', ssr: false }
  ],
  // some nuxt config...
  css: [
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  // some nuxt config...
}
