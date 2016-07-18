require.config({
    // baseUrl: "src/js/com",
    paths: {
        "jsEventCenter": "com/jsEventCenter"
    }
});

require(['jsEventCenter'], function (jsEventCenter){

    function Logger(topics, data) {
        console.log("Logging: " + topics);
        console.log(data);
    }

    //订阅者监听订阅的topic，一旦该topic广播一个通知，订阅者就调用回调
    var subscription = jsEventCenter.subscribe("newMessage", Logger);
    // pubsub.unsubscribe(subscription);
    //发布者发布topic
    jsEventCenter.publish("newMessage", "Hello Man!!!");

    jsEventCenter.publish("newMessage", ["Hello", "World", "!!!"]);

    jsEventCenter.publish("newMessage", {
        target: "咸鱼君",
        message: "Hello Man!!!"
    });

    //取消订阅

});
