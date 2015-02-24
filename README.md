# JsConf Pebble Watchapp

Watchapp for all js conferences.
This app contains all events, and your talks.

![promo app](https://www.filepicker.io/api/file/xfRu6tH3RYKIzledcRJr)


[Live app link](https://apps.getpebble.com/applications/54ebb991b0a2e249e20000e9)

WARNING: JsConf Pebble Watchapp is currently under active development.

# How add a new event?:
This is the format of the events:
```
{
    "prefix": "AR",
    "name": "JSConf AR",
    "date": "11/10/2015",
    "venue": "Buenos Aires, Argentina",
    "place": "Coliseo",
    "desc": "Conference description",
    "talks": [{
            "start": "10:25",
            "end": "10:00",
            "pitchName": "ReactJs",
            "pitchDescription": "Pitch description here",
            "user": "Brendan Eich",
            "twitter": "@petehunt"
        },
        ...]
}
```

# TODO:
-   Get the events feed from an endpoint
-   Add notifications support

