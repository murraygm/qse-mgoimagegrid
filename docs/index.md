# qse-mgoimagegrid
Qlik Sense Extension to display images - for use with Qlik Sense

![effects][effects]

[effects]: https://raw.githubusercontent.com/murraygm/qse-mgoimagegrid/master/screenshots/imageeffects.png "effects"

**Download a zip of just the v3.4 extension, ready to add to server [zip of MGOImageGridv3 folder] (https://github.com/murraygm/qse-mgoimagegrid/raw/master/MGOImageGridv3.zip)**

**DOWNLOAD FULL PROJECT VIA GITHUB https://github.com/murraygm/qse-mgoimagegrid/archive/master.zip**
or grab just what you need from the project https://github.com/murraygm/qse-mgoimagegrid
or check out the project page on [Qlik Branch](http://branch.qlik.com/#!/project/56e8f64ee37930b98cf9dea4)

*Grab a couple of fun apps on my [Qlik Sense Apps github page](https://github.com/murraygm/qs-mgoqliksenseapps) to try the extension out with, choose from The New York Public Library (190k images), The British Library (1 million images) or The Internet Archive (65K books - 24 million page scans, 5 million images) - remember to update the existing extension in the app*

{% assign pages_list = site.pages %}
  {% for node in pages_list %}
    {% if node.title != null %}
      {% if node.layout == "page" %}
        <li class="sidebar-nav-item{% if page.url == node.url %} active{% endif %}">
          <a href="{{ site.baseurl }}{{ node.url }}">{{ node.title }}</a>
        </li>
      {% endif %}
    {% endif %}
  {% endfor %}
  <li class="sidebar-nav-item"><a href="{{ site.baseurl }}/about/">About</a></li>
