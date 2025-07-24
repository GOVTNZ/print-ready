# CSS Integration Guide
The CSS rules include explanatory comments and most rules do not need modification. However, you will need to:

1. Replace `BREADCRUMBS` with your site's CSS selector for breadcrumbs. 

2. Optionally specify which images appear in print view. By default, all images are hidden from printed pages, but you can override this behavior by specifying which images should be displayed by replacing `IMAGES_TO_SHOW` in the site CSS file with the appropriate CSS selectors for your website.

3. Specify which elements should be hidden when printing. This requires replacing `INSERT_ELEMENTS_TO_HIDE` in the `site` CSS file with the appropriate CSS selectors for your website.

## Determining what to hide:

1. Review each page type and component in your website
2. Apply this principle: "Only print elements that are essential for understanding the page's content or context"

Common elements to hide include:

- Site navigation
- Headers and footers
- Interactive elements (like toggle buttons on accordions for example)
 
In some cases, you may need to hide entire sections, while in others, you might only need to hide specific interactive elements within a component.

## Implimenting the 'print-only' class
If needed you can also specify HTML elements that *only* show in printed output by adding the `print-only` class to them. 

You would then need to include the following CSS rule in your **screen** stylesheet: 

```CSS
.print-only { display: none; }     
```

## Using your organisations's logo
The NZ Government Web Standards mandate the display of either the agency name or logo. If using a logo, place it at the beginning of the `<body>` section. To ensure the logo is visible only in print view and hidden on screen, you could apply the `.print-only` class to the logo's `<img>` element. 
```html
<img class="print-only" ...>
```
## Printing Web Forms (optional)
While default browser styling for web forms is often good, if your form is embedded within a content management system or utilizes custom markup, its structure might not be clear. In such cases, consider adding styles to ensure it remains readable, well-spaced, and clearly structured when printed. Here are some things to consider:

1. **Legibility** - Make sure labels are clearly associated with their corresponding input fields and are separated from other labels and input fields. Consider using bold text or other styling to make labels stand out from the surrounding content.

2. **Clear Visual Grouping** - If needed add spacing so it is easy to distinguish between different parts of the form. 