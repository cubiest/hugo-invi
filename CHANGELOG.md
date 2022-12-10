# Changelog

All notable changes to this project (since its fork) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).


## [Unreleased]

### Added

* support for copyright notice
* shortcode **link.html** for `<a href>`: adds *noopener* and *nofollow* relation, if external link (i.e. URL begins with "http")
* "_markup/renderer-link" counterpart for shortcode **link.html**

### Changed

* Condense subtitle{number}.html shortcodes
  * Breaking Change: see exampleSite/content/agb.md
* Condense title{number}.html shortcodes
  * Breaking Change: see exampleSite/content/agb.md

### Deprecated


### Removed


### Fixed


### Security


## [1.0] - 2022-12-08

> Basically a cleanup of hugo-fresh while preserving functionality

### Added

* exampleSite: added gohugo privacy settings to config.yml

### Changed

* Upgrade fontawesome to 6.2.1-web
* Upgrade bulma to 0.9.4
* Update jQuery to 3.6.1
* Default page background color is dark (defines footer color), sections overwrite to white/grey
* Replace hard-coded section color with "every nth-child"-logic

### Removed

* jquery.panelslider (unused)
* feather-icons (replaced by fontawesome icons)
* google font "Open Sans" (also removes google api)

### Fixed

* Images in sections not shown in some browsers (previously, it was only working for card icons)
* If javascript was disabled, preloader animation was playing indefinitely
