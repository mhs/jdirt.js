(function( $ ) {
	
  $.fn.jDirtResetState = function() {
	return this.each(function(index, item){
	  $(item).data("originalState", $(item).val());
	});
  };

  $.fn.jDirt = function(options) {
	
	var params = {
		resetCallback : function() { /* DO NOTHING */ },
		changeCallback: function() { /* DO NOTHING */ }
	};

	$.extend(params, options);
	
	$.extend($.fn.jDirt, {
		checkChange: function (eventObject) {
			var target = $(eventObject.target),
			    newVal = target.val(),
			    orgVal = target.data("originalState");
					
			if(newVal == orgVal) {
				params.resetCallback();
			} else {
				params.changeCallback();
			}
		} 
	});
	
	return this.each(function(index, item){
		var val = $(item).val();
		$(item).data("originalState", val);
		$(item).originalState = val;
		$(item).keyup(function(eventObject) {$.fn.jDirt.checkChange(eventObject)} );
	});
  	
  };

})( jQuery );