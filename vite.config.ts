import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
  plugins: [
    ...VitePluginNode({
      // the node framework yout are using,
      // currently this plugin support 'express', 'nest', 'koa' and 'fastify',
      // you can also pass a function if you are using other frameworks, see Custom Handler section
      handler: 'fastify',

      // tell the plugin where is your project entry
      appPath: './src/server.ts',

      // Optional, the name of named export of you app from the appPath file
      exportName: 'viteNodeApp',

      // Optional, options pass to server.listen function
      server: { port: 3000, host: 'localhost' },

      // Optional, the TypeScript compiler you want to use
      // by default this plugin is using vite default ts compiler which is esbuild
      // 'swc' compiler is supported to use as well for frameworks
      // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
      tsCompiler: 'esbuild'
    })
  ]
})
