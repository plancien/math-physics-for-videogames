function addEventCapabilities(object) {

    object.listenersFor = {};
    
    var listenerId = 0;

    object.on = function(eventName, callback) {
        if (!this.listenersFor[eventName]) {
            this.listenersFor[eventName] = {};
        }
        var e = new Error(); //fake error
        var origin = e.stack ? e.stack.split("\n")[2] : undefined;
        
        listenerId += 1;
        
        this.listenersFor[eventName][listenerId] = {
            origin:   origin,
            callback: callback
        };
        
        return listenerId;
    };

    object.emit = function() {
        var args = Array.prototype.slice.call(arguments);
        var eventName = args.shift();
        var listeners = object.listenersFor[eventName] || {};
        
        for (var id in listeners) {
            try {
                listeners[id].callback.apply(object, args);
            } catch (e) {
                console.error('Error in on.'+eventName+' '+listeners[id].origin + "\n");
                throw (e);
            }
        };
    };
    
    object.removeListener = function (id, eventName) {
        if (eventName) {
            delete this.listenersFor[eventName][id];
        } else {
            for (var name in this.listenersFor) {
                delete this.listenersFor[name][id];
            };
        }
    };

};
