---
layout: page
title: Blog
tagline: quick reads about the web
group: navigation
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li>
	<span class="ptitle">
		<a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
	</span>&nbsp;&raquo;&nbsp;
	<span class="ptagline">&nbsp;{{ post.tagline }}</span>
	<div class="pdate">{{ post.date | date_to_string }}</div> 
	<p>{{ post.summary }}</p>
	<div class="pagination readmore">
		<a href="{{ BASE_PATH }}{{ post.url }}" class="rmlink">Read More →</a>
		<div style="clear: both;">&nbsp;</div>
	</div>
	</li>
  {% endfor %}
</ul>