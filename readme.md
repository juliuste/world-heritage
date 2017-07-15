# world-heritage

List of [UNESCO world heritage](http://whc.unesco.org/) sites, automatically fetched from [this official endpoint](http://whc.unesco.org/en/list/xml/).

[![npm version](https://img.shields.io/npm/v/world-heritage.svg)](https://www.npmjs.com/package/world-heritage)
[![Build Status](https://travis-ci.org/juliuste/world-heritage.svg?branch=master)](https://travis-ci.org/juliuste/world-heritage)
[![dependency status](https://img.shields.io/david/juliuste/world-heritage.svg)](https://david-dm.org/juliuste/world-heritage)
[![dev dependency status](https://img.shields.io/david/dev/juliuste/world-heritage.svg)](https://david-dm.org/juliuste/world-heritage#info=devDependencies)
[![license](https://img.shields.io/github/license/juliuste/world-heritage.svg?style=flat)](LICENSE)
[![chat on gitter](https://badges.gitter.im/juliuste.svg)](https://gitter.im/juliuste)

## Installation

```shell
npm install world-heritage
```

## Usage

### `heritage(opt)`

```js
const heritage = require('world-heritage')

heritage().then(…)

heritate({markdown: true}).then(…) // converts all HTML descriptions to markdown, but takes noteably longer to compute
```

Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/promise) that will resolve in an list of UNESCO world heritage sites which looks as follows. Please note that some of the keys might be empty for some sites (e.g. `justification` or `location` information is relatively rare):

```js
[
    {
        "id": 1137,
        "site": "Kernavė  Archaeological Site (Cultural Reserve of Kernavė)",
        "category": "Cultural", // Natural, Cultural or Mixed
        "criteria": [
            "iii",
            "iv"
        ],
        "dates": {
            "inscription": 2004,
            "other": [] // list of years
        },
        "extension": 0,
        "danger": null,
        "description": {
            "historical": null,
            "long": "<p>The archaeological site of Kernavė offers exceptional testimony to the evolution of human settlements in the Baltic region in Europe over some 10 millennia, with evidence of the contact of pagan and Christian funeral traditions. The settlement patterns and the impressive hill forts are outstanding examples of the development of such types of structures and the history of their use in the pre-Christian era.</p>\r\n<p>The earliest traces of inhabitants have been discovered at the River Neris in the Pajauta valley. The representatives of the Swiderian culture, late Palaeolithic hunters, came here in the 9th-8th millennia BC, followed by more settlements in the Mesolithic and Neolithic periods, due to the river rich in fish and the vast hunting terrain on the upper terr", // …
            "short": "<p>The Kernavė Archaeological site, about 35 km north-west of Vilnius in eastern Lithuania, represents an exceptional testimony to some 10 millennia of human settlements in this region. Situated in the valley of the River Neris, the site is a complex ensemble of archaeological properties, encompassing the town of Kernavė, forts, some unfortified sett" // …
        },
        "justification": "<p><em>Criterion (iii):</em> The archaeological site of Kernave presents an exceptional testimony to the evolution of human settlements in the Baltic region in Europe over the period of some 10 millennia. The site has exceptional evidence of the contact of Pagan and Christian funeral traditio", // …
        "location": "Vilnius county, Širvintos district, Kernave town.",
        "coordinates": {
            "longitude": 24.83055556,
            "latitude": 54.88777778
        },
        "url": "http://whc.unesco.org/en/list/1137",
        "image": "http://whc.unesco.org/uploads/sites/site_1137.jpg", // almost useless since really small
        "countries": {
            "iso": [
                "lt"
            ],
            "names": [
                "Lithuania"
            ]
        },
        "region": "Europe and North America",
        "revision": 0,
        "transBoundary": false,
        "uniqueNumber": 1317
    }
    // …
]
```

## Contributing

If you found a bug, want to propose a feature or feel the urge to complain about your life, feel free to visit [the issues page](https://github.com/juliuste/world-heritage/issues).
