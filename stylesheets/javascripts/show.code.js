$(function(){

  $("article.activate-state .btn.code").on("click", function(e) {
    $(".modal#activate-state").modal();
    e.preventDefault();
  });

  $("article.revert-state .btn.code").on("click", function(e) {
    $(".modal#revert-state").modal();
    e.preventDefault();
  });

  $("article.save-state .btn.code").on("click", function(e) {
    $(".modal#save-state").modal();
    e.preventDefault();
  });

});
