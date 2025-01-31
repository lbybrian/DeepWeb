﻿webCpu.regComponent("ListGroup", {
  css: "style.css"
}, function (container, data, task) {
  if (data && data.length > 0) {
    $(container).html('<ul class="list-group"></ul>');
    task.option = task.option || {};
    if (!data || !data[0]) {
      return false;
    }
    var pSelector = $(container).children(".list-group");
    for (var i = 0; i < data.length; i++) {
      var temp = task.option.template || data[i].template || "";
      var iSelector = $('<li index=' + i + ' class="list-group-item"></li>');
      if (!temp && data[i].title && data[i].description) {
        temp = '<h4 class="list-group-item-heading">{{title}}</h4>\
					<p class="list-group-item-text">{{description}}</p>';
        if (data[i].image) {
          temp = '<div class="media" style="margin-top: 0px;">\
							<div class="media-left">\
								<a href="#">\
									<img class="media-object" data-src="holder.js/64x64" alt="64x64" src="{{image}}" data-holder-rendered="true" style="width: 64px; height: 64px;">\
								</a>\
							</div>\
							<div class="media-body">\
								<h4 class="media-heading">{{title}}</h4>{{description}}\
							</div>\
						</div>';
        }
      } else if (!temp && data[i].title && data[i].badge !== undefined) {
        temp = '<span class="badge">{{badge}}</span>{{title}}'
      } else {}
      var str = temp.bindData(data[i]);
      if (!str) {
        str = data[i].title || data[i];
      }

      if (data[i].href) {
        str = "<a target='_blank' href='" + data[i].href + "'>" + str + "</a>";
      }

      iSelector.html(str);
      iSelector.appendTo(pSelector);
    }
    if (task.option.style) {
      pSelector.children(".list-group-item").css(task.option.style);
    }
  } else {
    $(container).html("<div style='position: relative; text-align: center; height: 100%; color: #fff; font-size: 16px;'><span style='border-radius: 100px; display: inline-block; padding: 10px 20px; margin-top: 50px; background-color: #ddd; color: #888;'>当前数据为空</span></div>")
  }

});