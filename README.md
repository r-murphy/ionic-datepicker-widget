# Ionic Datepicker Widget
_A nice datepicker widget to be used with Ionic framework._

## Requirements

* ionic framework

## Usage

 * Install the required files using bower:

```sh
bower install ionic-datepicker-widget --save
```

 * Include the files from the `lib/ionic-datepicker-widget/dist` in your `index.html` file:

```html
<link href="lib/ionic-datepicker-widget/dist/ionic-datepicker.css" rel="stylesheet">
<script src="lib/ionic-datepicker-widget/dist/ionic-datepicker.min.js"></script>
```

 * Inject the dependency `ionic-datepicker` into your application module:

```javascript
angular.module('yourApp', ['ionic', 'ionic-datepicker'])
```

 * Initialize the date model in your controller:

```javascript
$scope.item = {
    date: new Date()
};
```

 * Use `ionic-datepicker` directive in your template:

```html
<ionic-datepicker value="item.date">
    <button class="button button-block button-positive icon-left ion-calendar">
        {{ item.date | date:'yyyy-MM-dd' }}
    </button>
</ionic-datepicker>
```

## Changelog

 1. v1.0.0
   * Refactored most of the code
   * Added week-begins-on-monday option
   * Added optional min and max dates
   * Released as `ionic-datepicker-widget`
 1. v0.1.3
   * Forked from upstream.

## License

[MIT](https://raw.githubusercontent.com/markomarkovic/ionic-datepicker-widget/master/LICENSE)

---

If you find this useful, consider donating BTC to `1fLnPZkMYw1TFNEsJZCciwDAmUhDw2wit`.
