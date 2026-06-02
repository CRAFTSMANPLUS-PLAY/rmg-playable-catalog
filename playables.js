const PLAYABLES = [
  {
    id: 1,
    name: "Bison",
    category: "Casino",
    tags: ["slots", "adventure"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/bison/7/320x480/index.html?portrait=true",
    thumbnail: "images/bison.jpg"
  },
  {
    id: 2,
    name: "Aztec Gold",
    category: "Casino",
    tags: ["slots", "adventure"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/aztec/7/320x480/index.html?portrait=true",
    thumbnail: "images/aztec-gold.jpg"
  },
  {
    id: 3,
    name: "90B Spot",
    category: "Casino",
    tags: ["bingo", "social"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/90bspot/16/audio_on/index.html?portrait=true",
    thumbnail: "images/90b-spot.jpg"
  },
  {
    id: 4,
    name: "PPK Monopoly",
    category: "Lottery",
    tags: ["board", "scratch"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/76ppkmonopoly/12/index.html?portrait=true",
    thumbnail: "images/ppk-monopoly.jpg"
  },
  {
    id: 5,
    name: "Half Dome",
    category: "Lottery",
    tags: ["scratch", "adventure"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/123halfdome/24/index.html?portrait=true",
    thumbnail: "images/half-dome.jpg"
  },
  {
    id: 6,
    name: "Illinois Lottery",
    category: "Lottery",
    tags: ["scratch", "state"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/100illinoislottery/7/index.html?portrait=true",
    thumbnail: "images/illinois-lottery.jpg"
  },
  {
    id: 7,
    name: "Maryland Lottery",
    category: "Lottery",
    tags: ["scratch", "state"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/106marylandlottery/15/index.html?portrait=true",
    thumbnail: "images/maryland-lottery.jpg"
  },
  {
    id: 8,
    name: "OLG Plinko",
    category: "Lottery",
    tags: ["plinko", "physics"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/99olg/plinko/5/index.html?portrait=true",
    thumbnail: "images/olg-plinko.jpg"
  },
  {
    id: 9,
    name: "Papaya",
    category: "Casual",
    tags: ["match", "puzzle"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/103papaya/15/index.html?portrait=true",
    thumbnail: "images/papaya.jpg"
  },
  {
    id: 10,
    name: "Match to Win",
    category: "Casual",
    tags: ["match", "puzzle"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/63matchtowin/13/index.html?portrait=true",
    thumbnail: "images/match-to-win.jpg"
  },
  {
    id: 11,
    name: "Skillz – Solitaire Cube",
    category: "Casual",
    tags: ["cards", "skill"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/82skillz/solitairecube/24/index.html?portrait=true",
    thumbnail: "images/skillz-solitaire.jpg"
  },
  {
    id: 12,
    name: "Skillz – Blackout Blitz",
    category: "Casual",
    tags: ["bingo", "skill"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/82skillz/blackoutblitz/14/index.html?portrait=true",
    thumbnail: "images/skillz-blackout.jpg"
  },
  {
    id: 13,
    name: "Hot Vegas",
    category: "Casino",
    tags: ["slots", "vegas"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/hotvegas/9/zr/index.html?portrait=true",
    thumbnail: "images/hot-vegas.jpg"
  },
  {
    id: 14,
    name: "Super Lucky Bingo",
    category: "Casino",
    tags: ["bingo", "social"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview/?playable=https://production-static-playables.s3.amazonaws.com/test/67superluckybingo/13/index.html?portrait=true",
    thumbnail: "images/super-lucky-bingo.jpg"
  },
  {
    id: 15,
    name: "RMG Classic I",
    category: "Casino",
    tags: ["classic", "slots"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview?portrait=true&playable=https://s3.us-east-1.amazonaws.com/production-elasticbeanstalk-environmen-databucket-1v9icak6ecq6y/1646169904132-1646169904132.html",
    thumbnail: "images/rmg-classic-1.jpg"
  },
  {
    id: 16,
    name: "RMG Classic II",
    category: "Casino",
    tags: ["classic", "slots"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview?portrait=true&playable=https://s3.us-east-1.amazonaws.com/production-elasticbeanstalk-environmen-databucket-1v9icak6ecq6y/1646169975400-1646169975400.html",
    thumbnail: "images/rmg-classic-2.jpg"
  },
  {
    id: 17,
    name: "RMG Classic III",
    category: "Casino",
    tags: ["classic", "slots"],
    previewUrl: "https://play.preview.craftsmanplus.com/preview?portrait=true&playable=https://s3.us-east-1.amazonaws.com/production-elasticbeanstalk-environmen-databucket-1v9icak6ecq6y/1646176246098-1646176246098.html",
    thumbnail: "images/rmg-classic-3.jpg"
  }
];
