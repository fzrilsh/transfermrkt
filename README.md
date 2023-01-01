# TransferMrkt

Scrape top transfer and query fotball club in world

## Table of Contents

- [TransferMrkt](#transfermrkt)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [For Node.js](#for-nodejs)

## Usage

#### For Node.js

Install using:

```shell
npm install string-similarity --save
```

Get top transfer:

```javascript
var { clubInfoFromCountry, topTransfer, findland } = require("transfermrkt");

(async() => {
    const transfer = await topTransfer("brazil")
    console.log(transfer)
})
// ->
[
  {
    name: 'Erling Haaland',
    position: 'Centre-Forward',
    marketprice: '€150.00m',
    newclub: 'Manchester City',
    images: {
      photo: 'https://tmssl.akamaized.net/images/flagge/verysmall/189.png?lm=1520611569',
      logo: 'https://tmssl.akamaized.net/images/wappen/tiny/281.png?lm=1467356331'
    }
  },
  {
    name: 'Antony',
    position: 'Right Winger',
    marketprice: '€35.00m',
    newclub: 'Manchester United',
    images: {
      photo: 'https://tmssl.akamaized.net/images/wappen/tiny/985.png?lm=1457975903',
      logo: 'https://tmssl.akamaized.net/images/flagge/verysmall/189.png?lm=1520611569'
    }
  },
  ...
]
```

Get clubs by country:

```javascript
var { clubInfoFromCountry, topTransfer, findland } = require("transfermrkt");

(async() => {
    const clubs = await clubInfoFromCountry("indonesia")
    console.log(clubs)
})
// ->
[
  {
    name: 'Indonesia',
    league: 'International Friendlies',
    marketvalue: '€6.35m',
    squad_size: '23',
    average_age: '24.7',
    foreigners: '6  26.1 %',
    'konföderation': 'AFC',
    fifa_world_ranking: 'Pos 152',
    players: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object]
    ]
  },
  {
    name: 'Persija Jakarta',
    league: 'Liga 1 Indonesia',
    marketvalue: '€6.15m',
    squad_size: '34',
    average_age: '24.6',
    foreigners: '4  11.8 %',
    national_team_players: '6',
    stadium: 'Stadion Patriot Candrabhaga  30.000 Seats',
    current_transfer_record: '€-200k',
    players: [
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object], [Object], [Object],
      [Object]
    ]
  },
  ...
]
```