---
layout: default
title: Materialsammlung
---

# Materialsammlung

{% assign sorted_sources = site.sources | custom_sort: 'fach', 'klasse', 'bereich', 'thema' %}

<div class="source">
  {% for source in sorted_sources %}
    <div class="source-item">
      {% if source.source_link == nil or source.source_link == "" %}
      <p class="thema">
          <a href="{{ site.yt_base }}/embed/{{ source.youtube_id }}{%- if source.youtube_time_start or source.youtube_time_end -%}?
              {%- if source.youtube_time_start -%}t={{ source.youtube_time_start }}{%- endif -%}
              {%- if source.youtube_time_start and source.youtube_time_end -%}&{%- endif -%}
              {%- if source.youtube_time_end -%}end={{ source.youtube_time_end }}{%- endif -%}
          {% endif %}" target="_blank">
              <strong>{{ source.thema }}</strong>
          </a>
      </p>
      {% else %}
      <p class="thema"><a href="{{ source.source_link }}" target="_blank"><strong>{{ source.thema }}</strong></a></p>
      {% endif %}
      <p class="fach">{{ source.fach }}</p>
      <p class="klasse">Klassenstufe {{ source.klasse }}</p>
      <p class="bereich">{{ source.bereich }}</p>
      <p class="beschreibung">{{ source.beschreibung }}</p>
    </div>
  {% endfor %}
</div>




