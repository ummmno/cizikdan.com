/******************************************
    Version: 1.0
/****************************************** */

(function ($) {
  "use strict";


  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', function (e) {
    $(".navbar").addClass("d-none");
  })
  $('.portfolio-modal').on('hidden.bs.modal', function (e) {
    $(".navbar").removeClass("d-none");
  })

  // Scroll to top  		
  if ($('#scroll-to-top').length) {
    var scrollTrigger = 100, // px
      backToTop = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTrigger) {
          $('#scroll-to-top').addClass('show');
        } else {
          $('#scroll-to-top').removeClass('show');
        }
      };
    backToTop();
    $(window).on('scroll', function () {
      backToTop();
    });
    $('#scroll-to-top').on('click', function (e) {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      }, 700);
    });
  }

  // Banner 

  $('.heading').height($(window).height());
  $('.parallaxie').parallaxie();

  // LOADER
  $(window).load(function () {
    $("#preloader").on(500).fadeOut();
    $(".preloader").on(600).fadeOut("slow");
  });

  // Gallery Filter
  var Container = $('.container');
  Container.imagesLoaded(function () {
    var portfolio = $('.gallery-menu');
    portfolio.on('click', 'button', function () {
      $(this).addClass('active').siblings().removeClass('active');
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({
        filter: filterValue
      });
    });
    var $grid = $('.gallery-list').isotope({
      itemSelector: '.gallery-grid'
    });

  });

  // FUN FACTS   

  function count($this) {
    var current = parseInt($this.html(), 10);
    current = current + 50; /* Where 50 is increment */
    $this.html(++current);
    if (current > $this.data('count')) {
      $this.html($this.data('count'));
    } else {
      setTimeout(function () {
        count($this)
      }, 30);
    }
  }
  $(".stat_count, .stat_count_download").each(function () {
    $(this).data('count', parseInt($(this).html(), 10));
    $(this).html('0');
    count($(this));
  });

  // CONTACT
  jQuery(document).ready(function () {
    $('#contactform').submit(function () {
      var action = $(this).attr('action');
      $("#message").slideUp(750, function () {
        $('#message').hide();
        $('#submit')
          .after('<img src="images/ajax-loader.gif" class="loader" />')
          .attr('disabled', 'disabled');
        $.post(action, {
          first_name: $('#first_name').val(),
          last_name: $('#last_name').val(),
          email: $('#email').val(),
          phone: $('#phone').val(),
          select_service: $('#select_service').val(),
          select_price: $('#select_price').val(),
          comments: $('#comments').val(),
          verify: $('#verify').val()
        },
          function (data) {
            document.getElementById('message').innerHTML = data;
            $('#message').slideDown('slow');
            $('#contactform img.loader').fadeOut('slow', function () {
              $(this).remove()
            });
            $('#submit').removeAttr('disabled');
            if (data.match('success') != null) $('#contactform').slideUp('slow');
          }
        );
      });
      return false;
    });
  });

})(jQuery);

const d = document;
var c = document.querySelector("#canvas");
var ctx = c.getContext("2d");

const colors = ["#f5c156", "#e6616b", "#5cd3ad"];
let light = {
  x: 160,
  y: 200
};

// Adding Event Listener to the document to detect mouse movement
// On mouse change updating light object with event.clientX and event.clientY
d.addEventListener("mousemove", () => {
  light.x = event.clientX
  light.y = event.clientY
});

const resize = () => {
  let box = c.getBoundingClientRect();
  c.width = box.width;
  c.height = box.height;
};
resize();

function drawLight() {
  ctx.beginPath();
  ctx.arc(light.x, light.y, 1000, 0, 2 * Math.PI);
  var gradient = ctx.createRadialGradient(
    light.x,
    light.y,
    0,
    light.x,
    light.y,
    1000
  );
  gradient.addColorStop(0, "#3b4654");
  gradient.addColorStop(1, "#2c343f");
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(light.x, light.y, 20, 0, 2 * Math.PI);
  gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 5);
  gradient.addColorStop(0, "#fff");
  gradient.addColorStop(1, "#3b4654");
  ctx.fillStyle = gradient;
  ctx.fill();
}

function Box() {
  this.half_size = Math.floor(Math.random() * 50 + 1);
  this.x = Math.floor(Math.random() * c.width + 1);
  this.y = Math.floor(Math.random() * c.height + 1);
  this.r = Math.random() * Math.PI;
  this.shadow_length = 2000;
  this.color = colors[Math.floor(Math.random() * colors.length)];

  this.getDots = function () {
    var full = (Math.PI * 2) / 4;

    var p1 = {
      x: this.x + this.half_size * Math.sin(this.r),
      y: this.y + this.half_size * Math.cos(this.r)
    };
    var p2 = {
      x: this.x + this.half_size * Math.sin(this.r + full),
      y: this.y + this.half_size * Math.cos(this.r + full)
    };
    var p3 = {
      x: this.x + this.half_size * Math.sin(this.r + full * 2),
      y: this.y + this.half_size * Math.cos(this.r + full * 2)
    };
    var p4 = {
      x: this.x + this.half_size * Math.sin(this.r + full * 3),
      y: this.y + this.half_size * Math.cos(this.r + full * 3)
    };

    return {
      p1: p1,
      p2: p2,
      p3: p3,
      p4: p4
    };
  };
  this.rotate = function () {
    var speed = (60 - this.half_size) / 20;
    this.r += speed * 0.002;
    this.x += speed;
    this.y += speed;
  };
  this.draw = function () {
    var dots = this.getDots();
    ctx.beginPath();
    ctx.moveTo(dots.p1.x, dots.p1.y);
    ctx.lineTo(dots.p2.x, dots.p2.y);
    ctx.lineTo(dots.p3.x, dots.p3.y);
    ctx.lineTo(dots.p4.x, dots.p4.y);
    ctx.fillStyle = this.color;
    ctx.fill();

    if (this.y - this.half_size > c.height) {
      this.y -= c.height + 100;
    }
    if (this.x - this.half_size > c.width) {
      this.x -= c.width + 100;
    }
  };
  this.drawShadow = function () {
    var dots = this.getDots();
    var angles = [];
    var points = [];

    for (dot in dots) {
      var angle = Math.atan2(light.y - dots[dot].y, light.x - dots[dot].x);
      var endX =
        dots[dot].x + this.shadow_length * Math.sin(-angle - Math.PI / 2);
      var endY =
        dots[dot].y + this.shadow_length * Math.cos(-angle - Math.PI / 2);
      angles.push(angle);
      points.push({
        endX: endX,
        endY: endY,
        startX: dots[dot].x,
        startY: dots[dot].y
      });
    }

    for (var i = points.length - 1; i >= 0; i--) {
      var n = i == 3 ? 0 : i + 1;
      ctx.beginPath();
      ctx.moveTo(points[i].startX, points[i].startY);
      ctx.lineTo(points[n].startX, points[n].startY);
      ctx.lineTo(points[n].endX, points[n].endY);
      ctx.lineTo(points[i].endX, points[i].endY);
      ctx.fillStyle = "#2c343f";
      ctx.fill();
    }
  };
}

var boxes = [];

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);
  drawLight();

  for (var i = 0; i < boxes.length; i++) {
    boxes[i].rotate();
    boxes[i].drawShadow();
  }
  for (var i = 0; i < boxes.length; i++) {
    collisionDetection(i);
    boxes[i].draw();
  }
  requestAnimationFrame(draw);
}


draw();

while (boxes.length < 14) {
  boxes.push(new Box());
}

window.onresize = resize;

function collisionDetection(b) {
  for (var i = boxes.length - 1; i >= 0; i--) {
    if (i != b) {
      var dx =
        boxes[b].x + boxes[b].half_size - (boxes[i].x + boxes[i].half_size);
      var dy =
        boxes[b].y + boxes[b].half_size - (boxes[i].y + boxes[i].half_size);
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < boxes[b].half_size + boxes[i].half_size) {
        boxes[b].half_size =
          boxes[b].half_size > 1 ? (boxes[b].half_size -= 1) : 1;
        boxes[i].half_size =
          boxes[i].half_size > 1 ? (boxes[i].half_size -= 1) : 1;
      }
    }
  }
}
