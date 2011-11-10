$(function(){

  //////////////////////////////////////////////////////////////////////////////////////
  //                              JDIRT RELATED                                       //
  //////////////////////////////////////////////////////////////////////////////////////

  // Register jdirt on the element that you
  // wish to watch.
  $("textarea").jDirt();

  // Register the handlers.
  // These will be called with the the original state 
  $("body").delegate("textarea", "jdirt:dirty", enableSave);
  $("body").delegate("textarea", "jdirt:reset", disableSave);

  //////////////////////////////////////////////////////////////////////////////////////
  //                            NON JDIRT RELATED                                     //
  //////////////////////////////////////////////////////////////////////////////////////


  var NeonGreen = "#83F52C";

  $("body").delegate("button.save:not(.all)", "click", function(e) {
    var owner = $(e.target),
        texta = owner.siblings("textarea");

    texta.jDirtCommitState();
    texta.effect("highlight", {color: NeonGreen}, 500);
    $.proxy(disableSave, owner).call();
    updateStatus();
  });

  function enableSave() {
    $(this).siblings(".save").removeAttr('disabled');
  }

  function disableSave() {
    $(this).parents("article").find(".save").attr('disabled', 'disabled');
  }

  function updateStatus() {
    $.each($("textarea"), function() { 
      var data   = $(this).data("jdirt-original-state"),
          status = $(this).siblings(".status");
      console.log(data);
      status.text("Current Clean State: " + data);
    });
  }
  
  $(".save").attr('disabled', 'disabled');
  updateStatus();

});
