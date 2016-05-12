Getting Started
===============

1. `git clone https://github.com/t1p1/huddlespace-site.git`
2. `npm install`
3. `grunt`
4. In a new terminal window type 'grunt serve'
5. Navigate to [localhost:9000/index.html](localhost:9000/index.html)

HTML
----
+ `index.html`
+ No php or other server-side language required.

[SASS](http://sass-lang.com/)
----
Utilize [The Sass Way](http://thesassway.com/).

+ located in `_/sass`
+ uses [bourbon](http://bourbon.io/) & [neat](http://neat.bourbon.io/)
+ automatically compiled (with grunt) on save to `_/css/huddle.css`

JS
---

+ Javascript is found at the bottom of `index.html`
+ vendor scripts are located in /_/js/vendor
+ update modernizr with `grunt modernizr`

[LiveReload](http://livereload.com/)
----------

Livereload can be easily turned on using a [chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en). Livereload can be enabled on remote devices by uncommenting the last script src and changing the ip address. Or some fancy javascript could be used to look for the reload script at the same URL as wherever the file is located (would be problemaic for file-based url).

[Grunt](http://gruntjs.com/)
-----
Read the [Gruntfile](Gruntfile.js) to see what's going on.

+ `grunt`
+ `grunt modernizr`
+ `grunt build`