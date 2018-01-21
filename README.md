# Focus

Full-screen scrolling website

[examples](https://baianat.github.io/focus/)

## Getting started

### Install

First step is to install it using yarn or npm

```bash
npm install @baianat/focus

# or use yarn
yarn add @baianat/focus
```

### Include necessary files

``` html
<head>
  <link rel="stylesheet" href="dist/css/focus.css">
</head>
<body>
    ...
    <script type="text/javascript" src="dist/js/focus.js"></script>
</body>
```

### HTML Layout

You add a wrapper div with class `focus`, then add the section(s) you want with class `section`
If you want to add right & left slides you can add it inside the section dev with class `slide`

```html
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

### Create a new slider
To create a Focus element, you will need to create a new Focus instance.

```javaScript
  const myFoucs = new Focus('.focus');
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 [Baianat](http://baianat.com)
