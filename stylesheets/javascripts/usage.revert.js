
$(function(){

  // Register jdirt on the element that you
  // wish to watch.
  var form = $("article.revert-state form");
  form.jDirtCommitState();
  form.jDirt();


  // Register the handlers.
  // These will be called with the the original state 
  $("article.revert-state").delegate("form",  "jdirt:dirty", activateButton);
  $("article.revert-state").delegate("form",  "jdirt:reset", deactivateButton);
  $("article.revert-state").delegate(".btn-revert", "click",       revertState);


  function activateButton() {
    form.find(".btn-revert").removeClass("disabled");
  }

  function deactivateButton() {
    form.find(".btn-revert").addClass("disabled"); 
  }

  function revertState(e) {
    e.preventDefault();
    form.jDirtRestore();
  }

  deactivateButton();
});
