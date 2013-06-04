/*
* jQuery.ajaxMultiQueue - A queue for multiple concurrent ajax requests
* (c) 2013 Amir Grozki
* Dual licensed under the MIT and GPL licenses.
* 
* Based on jQuery.ajaxQueue
* (c) 2011 Corey Frang
*
* Requires jQuery 1.5+
*/ 
(function($) {

$.ajaxMultiQueue = function(n) {
  return new MultiQueue(~~n);
};

function MultiQueue(number) {
  var queues, i,
      current = 0;
  
  if (!queues) {
    queues = new Array(number);
    
    for(i = 0; i < number; i++) {
      // jQuery on an empty object, we are going to use this as our Queue
      queues[i] = $({});
    }
  }
  
  function queue( ajaxOpts ) {
    var jqXHR,
        dfd = $.Deferred(),
        promise = dfd.promise();
 
    // queue our ajax request
    queues[current].queue( doRequest );
    
    current = (current + 1) % number;
 
    // add the abort method
    promise.abort = function( statusText ) {
 
        // proxy abort to the jqXHR if it is active
        if ( jqXHR ) {
            return jqXHR.abort( statusText );
        }
 
        
        var i,
            queue,
            index;
        
        // if there wasn't already a jqXHR we need to remove from queue    
        for (i = 0; i < number || index < 0; i++) {
          queue = queues[current].queue();
          index = $.inArray( doRequest, queue );
        }
 
        if ( index > -1 ) {
            queue.splice( index, 1 );
        }
 
        // and then reject the deferred
        dfd.rejectWith( ajaxOpts.context || ajaxOpts, [ promise, statusText, "" ] );
        return promise;
    };
 
    // run the actual query
    function doRequest( next ) {
        jqXHR = $.ajax( ajaxOpts )
            .done( dfd.resolve )
            .fail( dfd.reject )
            .then( next, next );
    }
 
    return promise;
  };
  
  return {
    queue: queue
  };
}
 
})(jQuery);