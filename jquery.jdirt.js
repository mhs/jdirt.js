/*
 * jDirt JavaScript Library for jQuery
 * https://github.com/mhs/jquery.jdirt.js
 *
 * Copyright 2011, Mutually Human Software
 * Licensed under the MIT license.
 *
 * Dependencies on jquery.deserialize:
 *   * https://github.com/itsadok/jquery.deserialize
 */
(function( $ ) {
  
  $.fn.jDirtCommitState = function() {
    return this.each(function(){
      var $this = $(this);
      $this.data("jdirt-original-state", $this.serialize());
      $this.data("jdirt-original-value", $this.val());
      $this.trigger("jdirt:reset");
    });
  };

  $.fn.jDirt = function(options) {  
    $.extend($.fn.jDirt, {
      checkChange: function (eventObject) {
        var target = $(eventObject.target).closest('*[data-jdirt-original-state]'),
            newVal = target.serialize(),
            orgVal = target.attr("data-jdirt-original-state");

        if(newVal === orgVal) {
          target.trigger("jdirt:reset");
        } else {
          target.trigger("jdirt:dirty");
        }
      }
    });
    
    return this.each(function(){
      var $this = $(this), val = $this.serialize();
      $this.attr("data-jdirt-original-state", val);
      $this.data("jdirt-original-value", $this.val());
      $this.originalState = val;
      $this.keyup($.fn.jDirt.checkChange);
      $this.change($.fn.jDirt.checkChange);
    });
  };

  $.fn.jDirtRestore = function(){
    this.each(function(){
      var $this = $(this);
      $this.deserialize($this.data("jdirt-original-state"));
      $this.trigger("jdirt:reset");
    });
  };
})( jQuery );