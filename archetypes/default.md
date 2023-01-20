---
title: "" # used as title in respective page and used in HTML's header-title, IF seo_title is undefined
seo_title: "" # alternative title text to be used in HTML's header-title only
draft: true
sidebar: true # if `true`, show sidebar, else hide
sidebarlogo: fresh # From (static/images/logos/)
images: # first one is referenced in Twitter SEO meta of card type "summary_large_image"; first 4 in OpenGraph SEO meta
  - "path/to/image.png"
gallery: # images in a gallery; ignored by meta data
  - f_name: "0.jpg" # must be in assets/images/
    thumb_name: "0_t.jpg" # must be in assets/thumbnails/
    cropped: true # optional
    alt: "" # optional, but you should add an alternative text
video:
  title: 
  videoID: 
  videoURL: "https://www.youtube.com/watch?v="
  thumbnailURL: "t.jpg" # if url does not start with "http", then it searches in assets/thumbnail
# seo-meta
description: "Your description"
# robots: "" # default values by search engines: "index, follow", use e.g. "noindex" to change behaviour
content_type: "type" # og:type
twitter:
  disable: false # NOTE: only really enables, if also enabled in config file
  card_type: "summary" # types: "summary", "summary_large_image", "app", "player"
  author_handle: "@dummy"
---
