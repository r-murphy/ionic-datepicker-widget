# Ionic Datepicker Widget
_A nice datepicker widget to be used with Ionic framework._

## [Demo](http://cdn.rawgit.com/homburgs/ionic-datepicker-widget/master/demo/index.html)

## Requirements

 * Ionic framework

## Usage

 * Install the required files using bower:

```sh
bower install https://github.com/homburgs/ionic-datepicker-widget.git --save
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
  _See `demo/index.html` for additional options and localization examples._

## Changelog

 1. v1.2.0
   * add new parameter _leaveCancelButton_ (dont show the X-button)
   * add new parameter _leaveOkButton_ (dont show the ok-button) so you choose the date by tap on the day and the popup closed automaticly 
 1. v1.1.1
   * Forked from [upstream](https://github.com/markomarkovic/ionic-datepicker-widget.git).

## License

[MIT](https://raw.githubusercontent.com/markomarkovic/ionic-datepicker-widget/master/LICENSE)

---

If you find this useful, consider donating BTC to `1fLnPZkMYw1TFNEsJZCciwDAmUhDw2wit`.
