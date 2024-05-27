---
layout: default
title: Materialsammlung
---

# Materialsammlung

<table id="materialTable">
  <thead>
    <tr>
      <th class="sortable" data-column="thema">Quelle</th>
      <th class="sortable" data-column="fach">Fach</th>
      <th class="sortable" data-column="klasse">Klasse</th>
      <th class="sortable" data-column="bereich">Bereich</th>
      <th>Beschreibung</th>
    </tr>
  </thead>
  <tbody id="tableBody">
    {% for source in site.sources %}
      <tr data-id="{{ source.sid }}">
        <td>
          {% if source.source_link == nil or source.source_link == "" %}
            <a href="{{ site.yt_base }}/embed/{{ source.youtube_id }}{%- if source.youtube_time_start or source.youtube_time_end -%}?
                {%- if source.youtube_time_start -%}t={{ source.youtube_time_start }}{%- endif -%}
                {%- if source.youtube_time_start and source.youtube_time_end -%}&{%- endif -%}
                {%- if source.youtube_time_end -%}end={{ source.youtube_time_end }}{%- endif -%}
            {% endif %}">
                <strong>{{ source.thema }}</strong>
            </a>
          {% else %}
            <a href="{{ source.source_link }}"><strong>{{ source.thema }}</strong></a>
          {% endif %}
          <a href="/?id={{ source.sid }}" title="share">
            <i class="fas fa-share-nodes"></i>
          </a>
        </td>
        <td>{{ source.fach }}</td>
        <td>Klassenstufe {{ source.klasse }}</td>
        <td>{{ source.bereich }}</td>
        <td>{{ source.beschreibung }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>


