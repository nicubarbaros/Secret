// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require owl.carousel.min.js
//= require slider
//= require turbolinks
//= require ckeditor/init
//= require menu
//= require notify.min.js
//= require attachments_notify

$(document).on('turbolinks:load', function() {

  var navigation = {
    init: function() {
      path = window.location.pathname;
      path = path.replace(/\/$/, "");
      path = decodeURIComponent(path);
      this.cacheDom();
      this.bindEvents();
      this.render();
    },

    cacheDom: function() {
      this.$el = $('.header');

      /*_TODO refactoring
       *
       *
       */

      // desktop layout
      this.$header = this.$el.find('.header-navigation-desktop');
      this.$nav = this.$header.find('.menu-nav');
      this.$nav_link = this.$nav.find('li a');
      this.$lang = this.$el.find(".switch-lang li a");
      this.$first_drdw_parent = this.$nav.find('.dropdown').first();
      this.$second_drdw_parent = this.$nav.find('.dropdown').last();
      this.$first_drdw = this.$first_drdw_parent.find('ul');
      this.$second_drdw = this.$second_drdw_parent.find('ul');

      // mobile layout
      this.$mobile = this.$el.find('.header-navigation-wrapper');
      this.$mobile_nav = this.$mobile.find('.menu-nav');
      this.$mobile_nav_link = this.$mobile_nav.find('li a');
      this.$mobile_lang = this.$el.find(".switch-lang li a");
      this.$mobile_first_drdw_parent = this.$mobile_nav.find('.dropdown').first();
      this.$mobile_second_drdw_parent = this.$mobile_nav.find('.dropdown').last();
      this.$mobile_first_drdw = this.$mobile_first_drdw_parent.find('ul');
      this.$mobile_second_drdw = this.$mobile_second_drdw_parent.find('ul');


      //blog-bav
      this.$blogNav = $('.blog--navigation');
      this.$menuNav = this.$blogNav.find('.menu-nav');
      this.$blogNavLink = this.$menuNav.find('li a');

    },

    bindEvents: function() {
      //desktop
      this.$first_drdw_parent.on('click', {show: this.$first_drdw ,hide: this.$second_drdw}, this.toggleElm.bind(this));
      this.$second_drdw_parent.on('click', {show: this.$second_drdw ,hide: this.$first_drdw}, this.toggleElm.bind(this));

      // mobile
      this.$mobile_first_drdw_parent.on('click', {show: this.$mobile_first_drdw ,hide: this.$mobile_second_drdw}, this.toggleElm.bind(this));
      this.$mobile_second_drdw_parent.on('click', {show: this.$mobile_second_drdw ,hide: this.$mobile_first_drdw}, this.toggleElm.bind(this));
    },

    render: function() {
      //desktop
      this.setActive(this.$nav_link);
      this.setActive(this.$lang);

      //mobile
      this.setActive(this.$mobile_nav_link);
      this.setActive(this.$mobile_lang);

      //set blog active link
      this.setSelected(this.$blogNavLink);
    },

    setActive: function(elm) {
      elm.each(function () {
        var href = $(this).attr('href');
        if (path.substring(0, href.length) === href) {
            $(this).addClass('active');
        }
      });
    },

    setSelected: function(elm) {
      elm.each(function () {
        var href = $(this).attr('href');
        if((location.pathname+location.search) === href) {
          $(this).addClass('selected');
        }
      });
    },

    getPathWithParam: function() {
      return (location.pathname+location.search);
    },

    toggleElm: function(event) {
      event.data.show.toggle();
      this.hideElm(event.data.hide);
    },

    hideElm: function(elm) {
      elm.hide();
    }
  };

  navigation.init();

});

$(document).ready(function(){

  setNavbarBackground();

  $(window).scroll(function(){
    setNavbarBackground();
  });
});

function setNavbarBackground() {
  if ($(window).scrollTop() > 60){
    $('.header').addClass('sticky');
  }

  else {
    $('.header').removeClass('sticky');
  }
}

var timer = null;

function flashNotification() {
  clearTimeout(timer); 
  timer = null;
  $('.flash--notification').fadeIn('slow');
  
  timer = setTimeout(function(){
    $('.flash--notification').fadeOut( "slow" );
  }, 3000);
}

function notification(notificationText) {
  console.log("here");
  console.log(notificationText);
  console.log($('#subscription--result'));

  clearTimeout(timer); 
  timer = null;
  $('#subscription--result').empty();
  $('#subscription--result').append('<span>'+notificationText+'</span>');

  $('.flash--notification').fadeIn('slow');

  timer = setTimeout(function(){
    $('.flash--notification').fadeOut( "slow" );
  }, 3000);
  

}

function removeInside(selectedDiv){
  selectedDiv.empty();
}

$(document).on('click', '.modal--x', function(){
  removeInside($('.modal--id'));
  $('.section--modal').hide();
});


$(document).keyup(function(e) {
   if (e.keyCode == 27) { 
    removeInside($('.modal--id'));
    $('.section--modal').hide();
  }
});
