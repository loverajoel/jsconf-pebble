/**
 * JfConf.js 0.1
 * https://github.com/loverajoel/jsconf-pebble.js
 */

// Imports
var UI = require('ui');
var Vector2 = require('vector2');

/**
 * Data
 * mockdata
 */
var data = [{
    "prefix": "UY",
    "name": "JSConf UY",
    "date": "4/24/2015",
    "venue": "Montevideo, Uruguay",
    "place": "Antel Auditorium",
    "desc": "Talks doesn't are ready, Submit your proposal",
    "talks": []
    },{
    "prefix": "US",
    "name": "JSConf US",
    "date": "5/27/2015",
    "venue": "Amelia Island, FL",
    "place": "Omni Amelia Island Resort",
    "desc": "Talks doesn't are ready, Submit your proposal",
    "talks": []
    },{
    "prefix": "BP",
    "name": "JSConf Budapest",
    "date": "5/14/2015",
    "venue": "Budapest, Hungary",
    "place": "Uránia Cinema",
    "desc": "Talks doesn't are ready, Submit your proposal",
    "talks": []
    },{
    "prefix": "EU",
    "name": "JSConf EU",
    "date": "9/25/2015",
    "venue": "Berlin, Germany",
    "place": "",
    "desc": "Talks doesn't are ready, Submit your proposal",
    "talks": []
    },{
    "prefix": "CO",
    "name": "JSConf CO",
    "date": "10/15/2015",
    "venue": "Medellin, Colombia",
    "place": "",
    "desc": "Talks doesn't are ready, Submit your proposal",
    "talks": []
    },{
    "prefix": "AU",
    "name": "JSConf AU",
    "date": "",
    "venue": "Melbourne, Australia",
    "place": "",
    "desc": "Talks doesn't are ready, Submit your proposal",
    "talks": []
    },{
    "prefix": "AR",
    "name": "JSConf AR",
    "date": "",
    "venue": "Buenos Aires, Argentina",
    "place": "",
    "desc": "Talks doesn't are ready, Submit your proposal",
    "talks": []
    },{
    "prefix": "BR",
    "name": "JSConf BR",
    "date": "",
    "venue": "Fortaleza, Brazil",
    "place": "",
    "desc": "Talks doesn't are ready, Submit your proposal",
    "talks": []
    },{
    "prefix": "UY",
    "name": "JSConf ASIA",
    "date": "",
    "venue": "Singapore",
    "place": "",
    "desc": "Talks doesn't are ready, Submit your proposal",
    "talks": []
    }];

var eventList = [];


/*
 * Object
 * will wait for the window.onload event fire
 */
var app = {
    /*
     * Function that finish the record info.
     * @param callback {function}
     * @param wait {bool} *optional if is true, the response
     * will wait for the window.onload event fire
     */
    init: function() {
        this.parseData(data);
        this.render.init();
    },
    /*
     * parseData.
     * @param data {object}
     * Parse the original data to format readble por Pebble-sdk components.
     */
    parseData: function(data) {
        var data = data.reverse();
        for (var i = data.length - 1; i >= 0; i--) {
            var eventItem = data[i];
            var talksList = [];
            
            for (var e = eventItem.talks.length - 1; e >= 0; e--) {
                var talk = eventItem.talks[e];
                talksList.push({title: talk.pitchName, subtitle: talk.start, body: talk.pitchDescription});
            };
            talksList = talksList.reverse();
            eventList.push({title: eventItem.name, subtitle: eventItem.date, icon: eventItem.prefix+'_ICON', talks: talksList, original: eventItem});
        };
    },
    render: {
        /*
         * events.
         * Draw the event list screen.
         * Also add a listener for select events.
         */
        events: function() {

            var events = new UI.Menu({
              sections: [{
                items: eventList
              }]
            });

            events.show();

            events.on('select', function(e) {
                if (eventList[e.itemIndex].talks.length) {
                    app.render.talks(eventList[e.itemIndex].talks);
                } else {
                    app.render.cardEvent(eventList[e.itemIndex]);
                }
            });
        },
        /*
         * talks.
         * @param talksList {array}
         * Draw the talks list.
         */
        talks: function(talksList) {
            var talks = new UI.Menu({
                sections: [{
                    items: talksList
                }]
            });

            talks.show();

            talks.on('select', function(e) {
                app.render.cardTalk(talksList[e.itemIndex]);
            });
        },
        /*
         * cardTalk.
         * @param talk {array}
         * Draw one talk screen.
         */
        cardTalk: function(talk) {
            var card = new UI.Card({
                title: talk.title,
                subtitle: talk.subtitle,
                body: talk.body,
                scrollable: true,
                style: 'small'
            });

            card.show();
        },
        /*
         * cardTalk.
         * @param event {array}
         * Draw one event screen.
         */
        cardTalk: function(event) {
            var card = new UI.Card({
                title: event.title,
                subtitle: event.original.venue +"\n"+ event.original.date,
                body: "\n"+event.original.desc,
                scrollable: true,
                style: 'small'
            });

            card.show();
        },
        /*
         * loading.
         * Loading screen
         */
        loading: function() {
            var wind = new UI.Window({ fullscreen: true });
            var image = new UI.Image({
              position: new Vector2(0, 0),
              size: new Vector2(144, 168),
              image: 'JS'
            });
            wind.add(image);
            var text = new UI.Text({
              position: new Vector2(0, 0),
              size: new Vector2(144, 168),
              text:'Loading...',
              font:'GOTHIC_14_BOLD',
              color:'black',
              textAlign:'center'
            });
             
            wind.add(text);
            wind.show();
        },
        /*
         * init.
         * Init screen.
         */
        init: function() {
            var wind = new UI.Window({ fullscreen: true });

            var image = new UI.Image({
              position: new Vector2(0, 0),
              size: new Vector2(144, 168),
              image: 'JS'
            });

            wind.add(image);

            var text = new UI.Text({
              position: new Vector2(0, 0),
              size: new Vector2(144, 168),
              text:'Enter',
              font:'GOTHIC_28_BOLD',
              color:'black',
              textAlign:'center'
            });
             
            wind.add(text);
            wind.show();

            wind.on('click', 'up', function() {
                app.render.events();
            });
        }
    }
};

app.init();
