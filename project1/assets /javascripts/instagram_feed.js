//This function will get called only on home page
document.addEventListener("DOMContentLoaded", function(event) { 
   if (!($(".home-page").length > 0)) {
    return;
  }

  $.ajax({
    url: "/instagram-feed",
  });
});

