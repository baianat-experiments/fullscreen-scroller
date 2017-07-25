# focus
fullscreen scrolling website

[examples](https://baianat.github.io/focus/)


## How to use
#### include necessary files
``` html
<head>
  <link rel="stylesheet" href="dist/css/focus.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/js/focus.js"></script>
</body>
```

#### HTML markup
you add wrapper div with class ``focus`` then add section(s) you want with class ``section``
if you want to add right & left slides you can add it inside section dev with class ``slide``

``` html
<div class="focus">
  <div class="section is-active">
    <div class="section-content">
      ...
    </div>
  </div>

  <div class="section">
    <div class="slide"> Slide 1 </div>
    <div class="slide"> Slide 2 </div>
    ...

  </div>

  <div class="section red">
    <div class="slide"> Slide 1 </div>
    <div class="slide"> Slide 2 </div>
  </div>
  ...

</div>
```

#### Create new slider
to create focus element you will need to use js
``` javascript
  const myFoucs = new Focus('.focus');
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017 [Baianat](http://baianat.com)
