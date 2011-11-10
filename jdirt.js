(function( $ ) {
	
  $.fn.jDirtCommitState = function() {
  	return this.each(function(){
  	  var $this = $(this);
  	  $this.data("jdirt-original-state", $this.val());
      	  $this.trigger("jdirt:reset");
  	});
  };

  $.fn.jDirt = function(options) {	
  	$.extend($.fn.jDirt, {
  		checkChange: function (eventObject) {
  			var target = $(eventObject.target),
  			    newVal = target.val(),
  			    orgVal = target.data("jdirt-original-state");
			
  			if(newVal === orgVal) {
  				target.trigger("jdirt:reset");
  			} else {
  				target.trigger("jdirt:dirty");
  			}
  		} 
  	});
	
  	return this.each(function(){
  		var $this = $(this), val = $this.val();
  		$this.data("jdirt-original-state", val);
  		$this.originalState = val;
  		$this.keyup($.fn.jDirt.checkChange);
  	});  	
  };

})( jQuery );