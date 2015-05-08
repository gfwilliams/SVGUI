Simple SVG UI Library
==================

Quick and dirty SVG UI library - currently far from finished.

[See here](http://gfwilliams.github.io/SVGUI/test.html) for an example.

Design your UI as an SVG using Inkscape, and apply classes to each node. When it's loaded with the JS it'll spring into life so that items can be clicked and dragged.

Making SVGs
----------

* Start Inkscape
* Create your guage, with the pivot point over the TOP LEFT corner of the page
* Select any non-text element and click `Path -> Simplify`
* Group everything together
* You can now move it away from the corner of the page
* Open the `Edit -> XML Editor...` 
* For each Guage's group:
 * Add a `class` attribute set to `guage`
 * Add a `class` = `bg` attribute to the background element
 * Add a `class` = `needle` attribute to the needle element
 * Add a `class` = `label` attribute to the text element
 * Add a `class` = `btn` attribute to any button element
* For each Button's group:
 * Add a `class` attribute set to `btn`
