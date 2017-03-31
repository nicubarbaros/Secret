
var timer = null;

function notification(notificationText) {

  clearTimeout(timer); 
  timer = null;
  $('.notification-container ').empty();
  $('.notification-container').append('<div class=notify-x> <span>x</span></div><div class="notification">'+ notificationText +'</div>');
  timer = setTimeout(function(){
    $('.notification-container ').empty();
  }, 2000);
}

function removeInside(selectedDiv){

   selectedDiv.empty();
}

$(function () {
  setNavigation();
  customSelect();
});

jQuery.fn.center = function(perent){
  if (parent)
    parent = this.parent();
  else {
    parent = window;
  }
  parent = window;
  candidateWidht = $('.candidate-container').width();
  this.css({
    "position": "fixed",
    "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px")
  });
  return this;
}

function setNavigation() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);

    $("#bottom-bar li a").each(function () {
        var href = $(this).attr('href');
        if (path.substring(0, href.length) === href) {
            $(this).addClass('active');
        }
    });

    $(".language-menu li a").each(function () {
        var href = $(this).attr('href');
        if (path.substring(0, href.length) === href) {
            $(this).addClass('active');
        }
    });
}

function scrolling () {
  var startY = 100;
  var currentHeight = 0;
  var wrapperPadding = 0;
  if ($(window).scrollTop() > startY){
    $('.scroll').addClass("isScroll") 
    currentHeight = $('.header-wrapper').height();
    setPosition(currentHeight,'margin-top', '.section-add-item');
    setPosition(currentHeight,'top', '.scoring-container')
   }
  else {
    $('.scroll').removeClass("isScroll")
    currentHeight = $('.header-wrapper').height();
    setPosition(currentHeight,'margin-top', '.section-add-item');
    setPosition(currentHeight,'top', '.scoring-container');

    wrapperPadding = currentHeight + $('.section-add-item').height();
    setPosition(wrapperPadding, 'padding-top', '.main-wrapper');
  }
}

function setPosition(height, style , identifier){
  $(identifier).css(style, height);
}

$(window).on("scroll", function (){
    scrolling();
});


$(document).ready(function (){
  var currentHeight = $('.header-wrapper').height();
  setPosition(currentHeight,'margin-top', '.section-add-item');
  setPosition(currentHeight,'top', '.scoring-container');
  var wrapperPadding = currentHeight + $('.section-add-item').height();
  setPosition(wrapperPadding, 'padding-top', '.main-wrapper');


  timer = setTimeout(function(){
    $('.notification-container ').empty();
   }, 2000);
});


$(document).on('click', '.circle', function(){
  var selectedPoint = $(this).closest('.more-btn');
  selectedPoint.toggleClass('is-open');

  var userMenu = $(this).closest('.user-dropdown');
  userMenu.toggleClass('is-open');

});


$(document).on('click', '#show-form', function(){
  var selectedPoint = $('.new-company');
  selectedPoint.toggleClass('isShown');
});

$(document).on('click', '#close-form', function(){
  var selectedPoint = $('.new-company');
  selectedPoint.toggleClass('isShown');
});


$(document).on('click', '.info-button', function(){
  var selectedPoint = $(this).siblings('.item-info');
  selectedPoint.toggleClass('isShown');
});


//open first child in tabs
$(document).ready (function (){
  var selectedPoint = $('.tabs-content');
  selectedPoint.find('li').each (function (){
    $(this).children('.subcategory-wrapper:first').toggleClass('isOpen').find(".toggle").toggleClass('change-icon');
  });
});


//when toggle is clicked then you open
$(document).on('click', '.toggle', function (){
  $(this).toggleClass('change-icon');
  var selectedPoint = $(this).closest('.subcategory-wrapper')
  selectedPoint.toggleClass('isOpen');
  console.log(selectedPoint.position());

});

//open next category
$(document).on('click', '.next', function (){
  var selectedPoint = $(this).closest('.subcategory-wrapper')
  selectedPoint.toggleClass('isOpen');
  selectedPoint.next().toggleClass('isOpen')

  //check if this has a sibling
  if(selectedPoint.next().is('.subcategory-wrapper')) {

    selectedPoint.find(".toggle").toggleClass('change-icon');
    selectedPoint.next().find(".toggle").toggleClass('change-icon');
    //scroll to him
    var h1 = selectedPoint.next().position();
    $('html, body').animate({scrollTop : h1.top + 200}, 500);
  }

  //open another tab
  else {
    selectedPoint.find(".toggle").toggleClass('change-icon');
    var tabItems = $('ul.tabs-navigation');
    var tabContentWrapper = $('ul.tabs-content')
    var selectedItem = tabItems.find('a.selected');
    selectedItem.removeClass('selected');
    var nextItem = selectedItem.next();
    nextItem.addClass('selected');

    if( nextItem.hasClass('selected') ) {
      var selectedTab = nextItem.data('content'),
        selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
        slectedContentHeight = selectedContent.innerHeight();

      selectedContent.addClass('selected').siblings('li').removeClass('selected');

      //animate tabContentWrapper height when content changes 
      tabContentWrapper.animate({
        'height': slectedContentHeight
      }, 200);
      $('html, body').animate({scrollTop : 0}, 500);
    }
  }
});

$(document).on('click', '.add-item', function(){
  $('.section-modal').show();
});

$(document).on('click', '.edit-item', function(){
  $('.section-modal').show();
});

$(document).on('click', '.modal-x', function(){
  removeInside($('.modal-id'));
  $('.section-modal').hide();
});

$(document).on('click', '.notify-x', function(){
  $('.notification-container ').empty();
});

$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
      removeInside($('.modal-id'));
      $('.section-modal').hide();
    }
});

// when you click outside .modal class than you close the modal (.section-modal)
$(document).on('click', function(event) {
  var userMenu = $('.user-dropdown');
  var itemInfo = $('.item-info');
  if (!$(event.target).closest('.modal').length) {
    removeInside($('.modal-id'));
    $('.section-modal').hide();
  }

  if(userMenu.hasClass('is-open'))
  {
    $(document).on('click', function(event) {
      if (!$(event.target).closest('.dropdown-content').length) {
        userMenu.toggleClass('is-open');
      }
    });

    $(document).on('click', '.circle', function(){
      var userMenu = $(this).closest('.user-dropdown');
      userMenu.toggleClass('is-open');
    });
  }

  if(itemInfo.hasClass('isShown'))
  {
    $(document).on('click', function(event) {
      if (!$(event.target).closest('.item-info').length) {
        console.log("if clicked outside");
        itemInfo.toggleClass('isShown');
      }
    });

    $(document).on('click', '.info-button', function(){
      var selectedPoint = $(this).siblings('.item-info');
      selectedPoint.toggleClass('isShown');
    });
  }
});


$(document).ready (function (){
  var selectedPoint = $('.more-btn');
  var userMenu = $('.user-menu');
});

$(document).ready (function (){
   var $nav = $('.tabs-navigation');
});

$(document).ready(function($){
  var tabs = $('.category-tabs');
  $('.tabs-navigation > li').children('a:first').addClass("selected");
  $('.tabs-content').find('li:first').addClass("selected");

  tabs.each(function(){
    var tab = $(this),
      tabItems = tab.find('ul.tabs-navigation'),
      tabContentWrapper = tab.children('ul.tabs-content'),
      tabNavigation = tab.find('nav');

    tabItems.on('click', 'a', function(event){
      event.preventDefault();
      var selectedItem = $(this);
      if( !selectedItem.hasClass('selected') ) {
        var selectedTab = selectedItem.data('content'),
          selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
          slectedContentHeight = selectedContent.innerHeight();
        
        tabItems.find('a.selected').removeClass('selected');
        selectedItem.addClass('selected');
        selectedContent.addClass('selected').siblings('li').removeClass('selected');
        
        //animate tabContentWrapper height when content changes 
        tabContentWrapper.animate({
          'height': slectedContentHeight
        }, 200);
      }
    });

    //hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
    checkScrolling(tabNavigation);
    tabNavigation.on('scroll', function(){ 
      checkScrolling($(this));
    });
  });
  
  $(window).on('resize', function(){
    tabs.each(function(){
      var tab = $(this);
      checkScrolling(tab.find('nav'));
      tab.find('.tabs-content').css('height', 'auto');
    });
  });

  function checkScrolling(tabs){
    var totalTabWidth = parseInt(tabs.children('.tabs-navigation').width()),
      tabsViewport = parseInt(tabs.width());
    if( tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
      tabs.parent('.category-tabs').addClass('is-ended');
    } else {
      tabs.parent('.category-tabs').removeClass('is-ended');
    }
  }
});


// Make homepage image responsive
$(window).load(function() {    

  var thisWindow = $(window),
      $backGround = $("#body-image"), // cache DOM div
      aspectRatio = $backGround.width() / $backGround.height();
                    
  function resizeBackground() {
    if ((thisWindow.width() / thisWindow.height()) < aspectRatio ) {
        $backGround
          .removeClass()
          .addClass('bgheight');
    } else {
        $backGround
          .removeClass()
          .addClass('bgwidth');
    }
  }

  thisWindow.resize(resizeBackground).trigger("resize");
});



