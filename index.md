---
layout: default
title: Videosammlung
---

# Videosammlung

{% assign sorted_sources = site.sources | custom_sort: 'fach', 'klasse', 'bereich', 'thema' %}

<div class="accordion">
  {% for source in sorted_sources %}
    <div class="accordion-item">
      {% if source.video_link == nil or source.video_link == "" %}
        <p><a href="{{ site.yt_base }}//embed/{{ source.youtube_id }}?"><strong>{{ source.thema }}</strong></a></p>
      {% else %}
        <p><a href="{{ source.video_link }}"><strong>{{ source.thema }}</strong></a></p>
      {% endif %}
      <p>{{ source.fach }}</p>
      <p>Klassenstufe {{ source.klasse }}</p>
      <p>{{ source.bereich }}</p>
      <p>{{ source.beschreibung }}</p>

    </div>
  {% endfor %}
</div>




