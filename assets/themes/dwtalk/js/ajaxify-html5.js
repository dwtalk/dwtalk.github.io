!function(t){var e=t.History,r=t.jQuery,a=t.document;return e.enabled?void r(function(){var i="#container",n=r(i).filter(":first"),l=n.get(0),c=r("#menu,#nav,nav:first,.nav:first").filter(":first"),o="active selected current youarehere",s=".active,.selected,.current,.youarehere",d="> li,> ul > li",f="statechangecomplete",u=r(t),h=r(a.body),p=e.getRootUrl(),g={duration:800,easing:"swing"};0===n.length&&(n=h),r.expr[":"].internal=function(t){var e,a=r(t),i=a.attr("href")||"";return e=i.substring(0,p.length)===p||-1===i.indexOf(":")};var v=function(t){var e=String(t).replace(/<\!DOCTYPE[^>]*>/i,"").replace(/<(html|head|body|title|meta|script)([\s\>])/gi,'<div class="document-$1"$2').replace(/<\/(html|head|body|title|meta|script)\>/gi,"</div>");return e};r.fn.ajaxify=function(){var t=r(this);return t.find("a:internal:not(.no-ajaxy)").click(function(t){var a=r(this),i=a.attr("href"),n=a.attr("title")||null;return 2==t.which||t.metaKey?!0:(e.pushState(null,n,i),t.preventDefault(),!1)}),t},h.ajaxify(),u.bind("statechange",function(){var m=e.getState(),y=m.url,x=y.replace(p,"");h.addClass("loading"),n.animate({opacity:0},800),r.ajax({url:y,success:function(e){var p,m,j,b=r(v(e)),w=b.find(".document-body:first"),C=w.find(i).filter(":first");if(j=C.find(".document-script"),j.length&&j.detach(),m=C.html()||b.html(),!m)return a.location.href=y,!1;p=c.find(d),p.filter(s).removeClass(o),p=p.has('a[href^="'+x+'"],a[href^="/'+x+'"],a[href^="'+y+'"]'),1===p.length&&p.addClass(o),n.stop(!0,!0),n.html(m).ajaxify().css("opacity",100).show(),a.title=b.find(".document-title:first").text();try{a.getElementsByTagName("title")[0].innerHTML=a.title.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(_){}j.each(function(){var t=r(this),e=t.text(),i=a.createElement("script");i.appendChild(a.createTextNode(e)),l.appendChild(i)}),h.ScrollTo&&h.ScrollTo(g),h.removeClass("loading"),u.trigger(f),"undefined"!=typeof t._gaq&&t._gaq.push(["_trackPageview",x]),0!=r(".addthis_toolbox").length&&r("#scriptwrite").html('<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=undefined"></script>'),"undefined"!=typeof t.reinvigorate&&"undefined"!=typeof t.reinvigorate.ajax_track&&reinvigorate.ajax_track(y)},error:function(){return a.location.href=y,!1}})})}):!1}(window);