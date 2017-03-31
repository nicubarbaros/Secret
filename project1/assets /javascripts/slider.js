$(document).on('turbolinks:load', function() {
  testimonialAuthor = $("#testimonial--image");
  testimonialBody = $("#testimonial--body");
  
  testimonialBody.on('change.owl.carousel', function(event) {
    if (event.namespace && event.property.name === 'position') {
      var target = event.relatedTarget.relative(event.property.value, true);
      testimonialAuthor.owlCarousel('to', target, 300, true);
    }
  });

  testimonialAuthor.owlCarousel({
    center: true,
    loop: true,
    items: 1,
    margin: 0,
    dots: false,
    autoplayHoverPause: true,
    mouseDrag: false,
    touchDrag: true,
    animateOut: 'fadeOut'
  });

  testimonialBody.owlCarousel({
    center: true,
    loop: true,
    items: 1,
    margin: 10,
    dots: true,
    dotsData: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: false,
    touchDrag: true
  });
});
