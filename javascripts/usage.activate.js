
$(function(){

  // Register jdirt on the element that you
  // wish to watch.
  var form = $("article.activate-state form");
  form.find("input").jDirtCommitState();
  form.find("input").jDirt();


  // Register the handlers.
  // These will be called with the the original state 
  $("article.activate-state").delegate("form input", "jdirt:dirty", changed);
  $("article.activate-state").delegate("form input", "jdirt:reset", original);

  var NoChange      = "Nothing has changed",
      Change        = "Something has changed, maybe you should change it back..";


  function changed() {
    updateStatus(Change);
  }

  function original() {
    updateStatus(NoChange);
  }

  function updateStatus(StatusText) {
    var status = form.find(".status");
    status.text(StatusText);
  }
  
  updateStatus(NoChange);
});
