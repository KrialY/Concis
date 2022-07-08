import typescript from 'rollup-plugin-typescript2';
import less from 'rollup-plugin-less';
import clear from 'rollup-plugin-clear';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: ['./src/index.ts'],
  output: [
    {
      file: 'web-react/cjs.js',
      format: 'cjs',
      name: 'cjs.js',
    },
    {
      file: 'web-react/umd.js',
      format: 'umd',
      name: 'umd.js',
    },
    {
      file: 'web-react/index.js',
      format: 'es',
      name: 'index.js',
    },
  ],
  plugins: [
    typescript(), // 会自动读取 文件tsconfig.json配置
    less({ output: './web-react/style/index.css' }),
    clear({
      targets: ['web-react'],
    }),
    resolve(), // 这样 Rollup 能找到 `ms`
    commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
    babel({
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true, // 使plugin-transform-runtime生效
    }),
    terser(),
    uglify(),
  ],
  external: ['react', 'react-dom'],
};
