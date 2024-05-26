---
layout: default
title: Materialsammlung
---

# Materialsammlung

<table id="materialTable">
  <thead>
    <tr>
      <th onclick="sortTable(0)">Thema</th>
      <th onclick="sortTable(1)">Fach</th>
      <th onclick="sortTable(2)">Klasse</th>
      <th onclick="sortTable(3)">Bereich</th>
      <th>Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    {% assign sorted_sources = site.sources | custom_sort: 'fach', 'klasse', 'bereich', 'thema' %}
    {% for source in sorted_sources %}
      <tr>
        <td>
          {% if source.source_link == nil or source.source_link == "" %}
            <a href="{{ site.yt_base }}/embed/{{ source.youtube_id }}{%- if source.youtube_time_start or source.youtube_time_end -%}?
                {%- if source.youtube_time_start -%}t={{ source.youtube_time_start }}{%- endif -%}
                {%- if source.youtube_time_start and source.youtube_time_end -%}&{%- endif -%}
                {%- if source.youtube_time_end -%}end={{ source.youtube_time_end }}{%- endif -%}
            {% endif %}" target="_blank">
                <strong>{{ source.thema }}</strong>
            </a>
          {% else %}
            <a href="{{ source.source_link }}" target="_blank"><strong>{{ source.thema }}</strong></a>
          {% endif %}
        </td>
        <td>{{ source.fach }}</td>
        <td>Klassenstufe {{ source.klasse }}</td>
        <td>{{ source.bereich }}</td>
        <td>{{ source.beschreibung }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>




