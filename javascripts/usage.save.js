
$(function(){

  // Register jdirt on the element that you
  // wish to watch.
  var form = $("article.save-state form");
  form.jDirt();


  // Register the handlers.
  // These will be called with the the original state 
  $("article.save-state").delegate("form",        "jdirt:dirty", activateButton);
  $("article.save-state").delegate("form",        "jdirt:reset", deactivateButton);
  $("article.save-state").delegate(".btn-save",   "click",       saveState);
  $("article.save-state").delegate(".btn-revert", "click",       revertState);


  function activateButton() {
    form.find(".btn-revert, .btn-save").removeClass("disabled");
  }

  function deactivateButton() {
    form.find(".btn-revert, .btn-save").addClass("disabled"); 
  }

  function revertState(e) {
    e.preventDefault();
    form.jDirtRestore();
  }

  function saveState(e) {
    e.preventDefault();
    form.jDirtCommitState();
  }

  deactivateButton();
});
