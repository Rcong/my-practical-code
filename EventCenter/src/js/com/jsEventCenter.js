define(function (){

    var jsEventCenter = (function() {

        var events = {},
            subUid = -1;

        function publish(event, args) {

            if (!events[event]) {
                return false
            }

            var subscribers = events[event],
                len = subscribers ? subscribers.length : 0;

            while (len--) {
                subscribers[len].fn(event, args);
            }

        }

        function subscribe(event, fn) {

            !events[event] && ( events[event] = [] );

            var token = (++subUid).toString();

            events[event].push({
                token: token,
                fn: fn
            });

            return token;

        }

        function unsubscribe(token) {

            for (var event in events) {
                if (events[event]) {
                    for (var i = 0, max = events[event].length; i < max; i++) {
                        if (events[event][i].token === token) {
                            events[event].splice(i, 1);
                            return token;
                        }
                    }
                }
            }

        }

        return {
            publish: publish,
            subscribe: subscribe,
            unsubscribe: unsubscribe
        }

    }());

    return jsEventCenter;

});
