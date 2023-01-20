# Hugo Invi - The Fresh theme for Hugo

**Hugo Invi** is a multi-page website theme for the [Hugo](https://gohugo.io) static site generator, based on [hugo-fresh](https://github.com/StefMa/hugo-fresh) but heavily modified. hugo-fresh itself is adapted from [CSS Ninja](https://cssninja.io/product/fresh)'s `Fresh`, a bulma-based landing page.

## Functionality

Hugo Invi supports the following features…

Technical
* Internationalization
  * incl. an option in the Navigation Bar to change the site language
* Meta Data for SEO; supports
  * OpenGraph
  * Twitter
  * Schema
    * Organization
* Color Palette
* various Shortcodes and Markdown Render Hooks

Visual
* Navigation Bar
* Sidebar
* Image Gallery
* Embedding YouTube videos
  * incl. thumbnail with warning as video replacement: user has to accept YouTube cookies first (decision is saved as a cookie)
* Feature / Product cards
  * varying height or aligned height
* Short list of main features (large font size)
* Quote Cards
* Cookie Notification

## Usage

### Content Shortcodes

[Hugo Docs](https://gohugo.io/content-management/shortcodes/)

Title and Subtitle
```css
// id is optional
{{< title id="delicious" lvl="3" text="Bacon" >}}

// id is optional
{{< subtitle id="delicious" lvl="3" text="Bacon" >}}
```

### Markdown Render Hooks

[Hugo Docs](https://gohugo.io/templates/render-hooks/)

supported
* render link
  * if the URL has the "http" prefix, it gains `target="_blank" rel="noopener, nofollow"`