## jQuery.ajaxMultiQueue ##

This plugin allows you to throttle a large amount of AJAX requests such that the browser's concurrent request limit isn't reached and so other requests can be still made.

**Note:** The number of concurrent requests is still capped by the browser's hard limit.

### Usage ###

Using the function `$.ajaxMultiQueue(n)` will return a MultiQueue which runs `n` concurrent requests simultaneously. 
The MultiQueue object provides the `queue` function which accepts the same parameters as the `$.ajax` function.

```js
var q = $.ajaxMultiQueue(3); // Creates a queue that runs 3 concurrent requests.

// Queue 10 ajax requests.
for (var i=0; i<10; i++) {
    q.queue({
        url: ...,
        ...
    });
}
```
