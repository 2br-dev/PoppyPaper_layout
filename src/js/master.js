var 
  chameleonPolygons, 
  corgyPolygons, 
  pandaPolygons, 
  unicornPolygons, 
  all, 
  container, 
  container_stroke, 
  timer, 
  shapeshifter, 
  animationState, 
  shapeshifterStroke, 
  sidenav, 
  similar,
  modals, 
  tabs,
  gallery;

const PATH = "";

$(() => {
  init();
  $('body').on('click', '#container', nextSlide);
  $('body').on('click', '.sidenav-close', closeSidenav);
  $('body').on('click', '.gallery-image .lazy', setLargeImage);
  $('body').on('click', '.history>tbody>tr', expandDetails);
  $('body').on('change', '[name="address"]', updateAddressField);
	$('body').on('change', '[name="delivery"]', updateAddressList);
  $('body').on('change', '.toggle-group', toggleGroup);
  $('body').on('click', '.dropdown-container .current', openDropdown);
	$('body').on('click', '.dropdown-container .popup a', setCurrent);
	$('body').on('change', '.filters-block .values input[type=checkbox]', updateFiltersMultiSelect);
  $('body').on('click', '.filters-block .values a', updateFiltersSelect);
  $('body').on('reset', '.filters', resetFilters);
  $('body').on('click', '.reset-filter', resetFilter);
  $('body').on('click', clickOutside);
});

init = () => {
  $('.lazy').lazy();
  tabs = M.Tabs.init(document.querySelectorAll('.tabs'));
  modals = M.Modal.init(document.querySelectorAll('.modal'));
  sidenav = M.Sidenav.init(document.querySelector('.sidenav'));

  if($('#container').length && $('#container-stroke').length){
    loadScript(PATH + "/js/shapeshifter.js", () => {
      initShapeShifter();
    })
  }

  if($('#similar').length){
    loadScript(PATH + "/js/swiper-bundle.js", () => {
      similar = new Swiper('#similar-slider', {
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
      });
      
      similar.on("slideChange", function(){
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


function resetFilter(){
  var filter = $(this).parents('.filters-block');
  var multiselect = filter.hasClass('multiselect');

  if(multiselect){
    filter.find(':checked').prop('checked', false);
    filter.find('.current .value').text('0');
  }else{
    filter.find('.current input[type="hidden"]').val('');
    filter.find('.current .value').text('Все');
    filter.find('.values a').removeClass('active');
    filter.find('.values li:first-of-type a').addClass('active');
  }
}
function resetFilters(){
  $('.filters-block .current .value').text('Все');
  $('.filters-block input[type="hidden"]').val('');
  $('.filters-block.multiselect .current .value').text('0');
  $('.filters-block .values li a').removeClass('active');
  $('.filters-block .values li:first-of-type a').addClass('active');
}
function updateFiltersMultiSelect(){
  var checkedCount = $(this).parents('.values').find(':checked').length;
  $(this).parents('.filters-block').find('.current .value').text(checkedCount);
}
function updateFiltersSelect(){
  $(this).parents('.filters-block').find('.current .value').text($(this).text());
  $(this).parents('.filters-block .values').find('a').removeClass('active');
  $(this).addClass('active');
  if($(this).text() == 'Все'){
    $('.filters-block input[type="hidden"]').val('');
  }else{
    $('.filters-block input[type="hidden"]').val($(this).text());
  }
}
function setCurrent(e){
	e.preventDefault();
	var currentVal = $(this).text();

	var parent = $(this).parents('.dropdown-container');

	parent.find('.current').text(currentVal);
	parent.find('.popup').removeClass('open');
	
}
function clickOutside(e){
	var path = e.originalEvent.path;

	if(!e.originalEvent){
		return;
	}

	// Close all dropdowns
	var dropdowns = path.filter(selector => {
		return $(selector).hasClass('dropdown-container');
	});

	if(dropdowns.length == 0){
		$('.dropdown-container .popup').removeClass('open');
	}
}
function openDropdown(e){
	e.preventDefault();
	$(this).parents('.dropdown-container').find('.popup').toggleClass('open');
}
function toggleGroup(e){
	var group = $(this).data('target');
	$('[data-group="'+group+'"]').toggleClass('visible');
}
function updateAddressList(e){
	if($(this).hasClass('need-address')){
		$('.address-list').removeClass('hidden');
	}else{
		$('.address-list').addClass('hidden');
	}
}
function updateAddressField(e){
	if($(this).val() == 'user-address'){
		$('#user-address').removeClass('hidden');
	}else{
		$('#user-address').addClass('hidden');
	}
}
function setLargeImage(){
  var src = $(this).css('background-image');
  $('.product-image').css("background-image", src);
}
function expandDetails(e){

	var path = e.originalEvent.path;
	var links = $(path).filter((index, el) => {
		return el.tagName == 'A'
	});

	if(!links.length){

		e.preventDefault();
		var already = $(this).next().find('.subtable-wrapper').css('display') == 'block';
		$('.subtable-wrapper').slideUp('fast');
		if(!already){
			$(this).next().find('.subtable-wrapper').slideDown('fast');
		}
	}

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