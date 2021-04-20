var chameleonPolygons, corgyPolygons, pandaPolygons, unicornPolygons, all, container, container_stroke, timer, shapeshifter, animationState, shapeshifterStroke, sidenav, similar, gallery;

$(() => {
  init();
  $('body').on('click', '#container', nextSlide);
  $('body').on('click', '.sidenav-close', closeSidenav);
  $('body').on('click', '.gallery-image .lazy', setLargeImage);
});

init = () => {
  $('.lazy').lazy();
  sidenav = M.Sidenav.init(document.querySelector('.sidenav'));
  if($('#container').length && $('#container-stroke').length){
    loadScript("/js/shapeshifter.js", () => {
      initShapeShifter();
    })
  }

  if($('#similar').length){
    loadScript("/js/swiper-bundle.js", () => {
      similar = new Swiper('#similar', {
        spaceBetween: 20,
        loop: true,
        breakpoints: {
          320: {
            slidesPerView: 1
          },
          600: {
            slidesPerView: 2
          },
          900: {
            slidesPerView: 3
          },
          1200: {
            slidesPerView: 4
          },
          1800: {
            slidesPerView: 5
          },
          2000: {
            slidesPerView: 6
          }
        }
      })[0];

      similar.on("slideChange", () => {
        $('.lazy').lazy();
      });

      gallery = new Swiper('#product-gallery', {
        slidesPerView: 3,
        spaceBetween: 10,
        loop: true
      });
      gallery.on("slideChange", () => {
        $('.lazy').lazy();
      });
    })
  }
  
  if($('.swiper-container#product-gallery').length){

  }
}
  
function setLargeImage(){
  var src = $(this).css('background-image');
  $('.product-image').css("background-image", src);
}

loadScript = (url, callback) => {

  var script = document.createElement("script")
  script.type = "text/javascript";

  if (script.readyState){  //IE
      script.onreadystatechange = function(){
          if (script.readyState == "loaded" ||
                  script.readyState == "complete"){
              script.onreadystatechange = null;
              callback();
          }
      };
  } else {  //Others
      script.onload = function(){
          callback();
      };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

initShapeShifter = () => {
  chameleonPolygons = document.querySelector('#chameleon').querySelectorAll('polygon');
  corgyPolygons = document.querySelector('#corgy').querySelectorAll('polygon');
  pandaPolygons = document.querySelector('#panda').querySelectorAll('polygon');
  unicornPolygons = document.querySelector('#unicorn').querySelectorAll('polygon');
  all = [chameleonPolygons, corgyPolygons, pandaPolygons, unicornPolygons];
  container = document.querySelector('#container');
  container_stroke = document.querySelector('#container-stroke');
  shapeshifter = new Shapeshifter(container, 0, 0, all[0], {
    /*transformSpeed: {x:0.05, y:0.05},
    hideSpeed: {x:0.05, y:0.05},
    opacitySpeed: 0.05,
    colorSpeed: 0.05,*/
    defaultSpeed: 0.03, //any speed properities not defined will resort to defaultSpeed
    scale: 0.4, //1 makes the initial SVG 100% of the container's width
    center: true,
    strokeOnly: false
  });
  animationState = 0;

  shapeshifterStroke = new Shapeshifter(container_stroke, 0, 0, all[0], {
    /*transformSpeed: {x:0.05, y:0.05},
    hideSpeed: {x:0.05, y:0.05},
    opacitySpeed: 0.05,
    colorSpeed: 0.05,*/
    defaultSpeed: 0.01,
    scale: 0.8,
    center: true,
    strokeOnly: true
  });

  loop();
  startTimer();
}

closeSidenav = e => {
  e.preventDefault();
  sidenav.close();
}

nextSlide = () => {
  clearInterval(timer);
  next();
  startTimer();
}

startTimer = () => {
  timer = setInterval(() => {
    next()
  }, 10000);
}

loop = () => {
  shapeshifter.loop();
  shapeshifterStroke.loop();
  window.requestAnimationFrame(loop);
}

next = () => {
  animationState++;
  if(animationState>=all.length)animationState=0;
  shapeshifter.transform( all[animationState] );
  shapeshifterStroke.transform( all[animationState] );
}