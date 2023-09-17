import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: './Logo_sequence/**/*',
          dest: 'Logo_sequence'
        },
        {
          src: './tv_min.glb',
          dest: '.'
        },
        {
          src: './tv.glb',
          dest: '.'
        },
        {
          src: './Slide canvas.js',
          dest: '.'
        }
      ]
    })
  ]
}
