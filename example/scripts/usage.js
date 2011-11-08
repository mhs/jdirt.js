$(function(){
	$("textarea").jDirt({
		resetCallback : function() {
			console.log("reset happened");
		},
		changeCallback: function() {
			console.log("change happened");
		}
	});
});