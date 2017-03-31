$(document).on('turbolinks:load', function() {

  var menu = {
    init: function() {
      this.cacheDom();
      this.bindEvents();
    },

    cacheDom: function() {
      this.$header = $('.header');
      this.$mobile_toggle = this.$header.find('.js-mobile-toggle');
    },

    bindEvents: function() {

      this.$mobile_toggle .on('click', this.toggleMenu.bind(this));
    },

    toggleMenu: function() {
      console.log("hellooo");
      this.$header.toggleClass('opening open');
    },

    hide: function(event) {
      if ($(event.target).is(this.$menuMobile) || $(event.target).is('.menu-x')) {
        this.$header.removeClass('open')
        console.log("hello");
      }
    }
  }

  menu.init();
})