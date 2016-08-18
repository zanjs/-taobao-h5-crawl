/**
 * taobao h5 crawl
 * By Julian
 * @ zanjser@163.com
 * 2016年7月27日17:24:53
 */

import pkg          from './package.json';
import gulp         from 'gulp';
import concat       from 'gulp-concat';
import minifycss    from 'gulp-minify-css';
import uglify       from 'gulp-uglify';
import rename       from 'gulp-rename';
import notify       from 'gulp-notify';
import header       from 'gulp-header';


const banner = [
  '/*! ',
    '<%= pkg.name %> ',
    'v<%= pkg.version %> | ',
    `(c) ${new Date()} <%= pkg.author %> |`,
    ' <%= pkg.homepage %>',
  ' */',
  '\n'
].join('');