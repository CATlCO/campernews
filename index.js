function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

var colCount = 0;
var colWidth = 300;
var margin = 15;
var windowWidth = 0;
var blocks = [];

function setupBlocks() {
  windowWidth = $(window).width();
  blocks = [];
  colCount = Math.floor(windowWidth / (colWidth + margin * 2));
  spaceLeft = (windowWidth - ((colWidth * colCount) + (margin * (colCount - 1)))) / 2;
  for (var i = 0; i < colCount; i++) {
    blocks.push(margin);
  }
  positionBlocks();
}

function positionBlocks() {
  $('.article').each(function() {
    var min = Array.min(blocks);
    var index = $.inArray(min, blocks);
    var leftPos = margin + (index * (colWidth + margin));
    $(this).css({
      'left': (leftPos + spaceLeft) + 'px',
      'top': min + 'px'
    }).show();
    blocks[index] = min + $(this).outerHeight() + margin;
  });
}

Array.min = function(array) {
  return Math.min.apply(Math, array);
};

function hover() {
  $('.article').hover(function() {
    $(this).find('.title').addClass('underline');
    $(this).find('.upvotes').toggle("slide", {
      direction: "up"
    }, 300);
    $(this).find('.author').toggle("slide", 300);
  }, function() {
    $(this).find('.title').removeClass('underline');
    $(this).find('.upvotes').toggle("slide", {
      direction: "up"
    }, 300);
    $(this).find('.author').toggle("slide", 300);
  });
}

$(document).ready(function() {
  $.getJSON('http://www.freecodecamp.com/news/hot', function(data) {
    var news = $('.news');
    for (var i = 0; i < data.length; i++) {
      news.append('<a target="_blank" href="' + data[i].link + '" class="article" id="a' + i + '"></a>');
      img = data[i].image || "http://newbornstartups.com/wp-content/uploads/2015/06/fcc-logo.png";
      var article = $('#a' + i);
      article
        .append('<div class="author" id="author' + i + '"><img class="author-pic" src="' + data[i].author.picture + '"><div class="author-name">@' + data[i].author.username + '</div></div>')
        .append('<img class="image" src="' + img + '">')
        .append('<div class="upvotes"><i class="fa fa-thumbs-up"></i>' + data[i].upVotes.length + '</div>')
        .append('<div class="title">' + data[i].headline + '</div>')
        .append('<div class="descr">' + data[i].metaDescription + '</div>')
        .append('<div class="posted">' + timeSince(data[i].timePosted) + ' ago</div>');
    }
    $('img').load(setupBlocks);
    hover();
  });

  $(window).resize(setupBlocks);
});