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
      <th>Beschreibung / Hinweis</th>
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
          <i class="fas fa-info-circle info-icon" data-reviewed-from="{{ source.reviewed_from }}" data-reviewed-on="{{ source.reviewed_on }}"></i>
        </td>
        <td>{{ source.fach }}</td>
        <td>Klassenstufe {{ source.klasse }}</td>
        <td>{{ source.bereich }}</td>
        <td>{{ source.beschreibung }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

<div id="disclaimer" class="disclaimer">
  <div class="disclaimer-content">
  <p>Der Betreiber verlinkt von seiner Website auf externe Websites. Durch diese sogenannten „Hyperlinks“ wird der Nutzer direkt auf die externe Website weitergeleitet. Das Setzen von „Hyperlinks“ bedeutet nicht, dass sich der Betreiber die hinter dem Link liegenden Inhalte zu Eigen macht. Der Betreiber hat keinerlei Einfluss auf die Informationen der externen Website. Daher kann keine Gewähr für die fachliche Korrektheit, Aktualität, Richtigkeit und Vollständigkeit der Inhalte der externen Website übernommen werden.</p>

  <p>Für die Inhalte der externen Websites ist ausschließlich der jeweilige Anbieter oder Betreiber verantwortlich.</p>

  <p>Der Betreiber versichert jedoch, dass ihm zum Zeitpunkt des Setzens der Verlinkung keine rechtlichen Verstöße bekannt waren und er die externe Website im Rahmen des Zumutbaren geprüft hat.</p>

  <p>Es wird darauf hingewiesen, dass vor dem Klicken auf die Links die Hinweise zu den Links sorgfältig zur Kenntnis genommen werden sollten.</p>

  <p>Solange keine konkreten Anhaltspunkte einer Rechtsverletzung vorliegen, ist eine permanente inhaltliche Kontrolle der verlinkten Website für den Betreiber nicht zumutbar.</p>

  <p>Sollte der Betreiber Kenntnis von der Rechtswidrigkeit der verlinkten Inhalte erlangen, wird der entsprechende Link unverzüglich entfernt.</p>

  <p>Bei Fragen oder Anliegen können Sie auch über <a href="https://github.com/{{ site.github_repo }}">GitHub</a> Kontakt aufnehmen.</p>

  <button id="acceptDisclaimer">Akzeptieren</button>
  <button id="declineDisclaimer">Ablehnen</button>
  </div>
</div>



