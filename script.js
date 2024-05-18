$(document).ready(function(){
  $('.accordion-header').click(function(){
    $(this).toggleClass('active');
    $(this).next('.accordion-content').slideToggle();
  });
});
