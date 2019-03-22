/**
 * @file hmi.js
 * @author Oliver Merkel <Merkel(dot)Oliver(at)web(dot)de>
 * @date 2019 March 14
 *
 * @section LICENSE
 *
 * Copyright 2019, Oliver Merkel <Merkel(dot)Oliver(at)web(dot)de>
 * All rights reserved.
 *
 * Released under the MIT license.
 *
 * @section DESCRIPTION
 *
 * @brief Class Hmi.
 *
 * Class representing the view or Hmi of Tangram.
 * Tangram game is a traditional solitaire puzzle.
 * The Tangram application displays various Tangram shapes and solutions.
 * To play the solitaire puzzle you can create the seven tiles yourself
 * from a cardboard.
 *
 * Get a template for a DIY print-and-play template for the tiles:
 * https://github.com/OMerkel/Tangram
 *
 */

Hmi.tiles = [
  "m 0,0 250,0 125,-125 -250,0 z",
  "m 0,0 250,250 250,-250 z",
  "m 0,0 250,250 -250,250 z",
  "m 0,0 -125,125 250,0 z",
  "m 0,0 125,125 125,-125 -125,-125 z",
  "m 0,0 0,-250 -125,125 z",
  "m 0,0 250,0 0,-250 z"
];

Hmi.challenge = [
  {
    transform: [
      "t0,500", "", "", "t250,250", "t250,250", "t500,250", "t250,500"
    ],
    solution: "m 0,0 500,0 0,500 -500,0 z",
    viewbox: [ -10,-10,520,520 ],
    level: 'Square',
    id: '1'
  },
  {
    transform: [
      "t0,0r45,0,0", "t531,531r180,0,0", "", "t354,0r45,0,0",
      "t354,0r45,0,0", "t354,354r45,0,0", "t531,177r135,0,0"
    ],
    solution:
    "m 0,0 0,500 250,-250 -73,-73 177,0 0,177 -73,-73 -250,250 500,0 0,-531 z",
    viewbox: [ -10,-10,552,552 ],
    level: 'Arrow',
    id: '2'
  },
  {
    transform: [
      "r45,0,0", "r45,0,0", "t0,707r-135,0,0",
      "t353,0r45,0,0", "t353,0r45,0,0", "t530,177r45,0,0", "t177,177r45,0,0"
    ],
    solution: "m 707,0 -707,0 0,707 z",
    viewbox: [ -10,-10,727,727 ],
    level: 'Triangle',
    id: '3'
  },
  {
    transform: [
      "t300,176r45,0,0", "t125,353", "t478,353r135,0,0",
      "t125,353", "t530,228", "t780,478", "t460,690r-135,0,0"
    ],
    solution: "m 125,0 0,354 -125,125 250,0 34,34 -177,177 353,0 -86,-86 " +
      "251,-251 31,0 125,125 0,-250 -125,-125 -126,126 -54,-54 -177,0 z",
    viewbox: [ -10,-50,804,804 ],
    level: 'Raven',
    id: '4'
  },
  {
    transform: [
      "t0,554", "t500,303r90,0,0", "t250,554", "t500,0", "t410,125r45,0,0",
      "t250,804", "t250,1054"
    ],
    solution: "m 0,554 250,0 -125,125 125,125 0,250 250,0 0,-752 88,0 " +
      "0,-177 36,0 -125,-125 -125,125 36,0 0,177 89,0 -126,126 -250,0 z",
    viewbox: [ -150,-20,300,1100 ],
    level: 'Man Paradox 1',
    id: '5'
  },
  {
    transform: [
      "t0,554", "t146,658r-45,0,0", "t146,658r-45,0,0", "t500,0",
      "t410,125r45,0,0", "t377,1012r225,0,0", "t250,762r90,0,0"
    ],
    solution: "m 0,554 250,0 -104,104 104,104 0,250 126,0 -177,177 177,0 " +
      "0,-177 124,0 0,-710 88,0 0,-177 36,0 -125,-125 -125,125 36,0 0,177 " +
      "89,0 -126,126 -250,0 z",
    viewbox: [ -250,-20,300,1240 ],
    level: 'Man Paradox 2',
    id: '6'
  },
  {
    transform: [
      "t125,125r90,0,0", "t728,728r-135,0,0", "t250,250", "t125,125r180,0,0",
      "t250,250", "t250,250", "t728,375r-135,0,0"
    ],
    solution: "m 0,0 125,125 0,250 125,125 0,250 250,-250 228,228 0,-352 " +
      "-177,-177 -52,52 -125,-125 -125,125 0,-250 z",
    viewbox: [ -10,-10,748,748 ],
    level: 'Camel',
    id: '7'
  },
  {
    transform: [
      "t266,444r45,0,0", "t708,0r135,0,0", "r-45,0,0", "t354,354r90,0,0",
      "t354,354", "t228,479", "t441,621r-135,0,0"
    ],
    solution: "m 0,0 707,0 -230,230 125,125 -125,125 141,141 -532,0 " +
      "141,-141 -125,-125 125,-125 -229,-231 m 266,444 90,-90 90,90 z",
    viewbox: [ -10,-50,727,641 ],
    level: 'Paradox 1',
    id: '8'
  },
  {
    transform: [
      "t104,604", "t708,0r135,0,0", "r-45,0,0", "t479,479",
      "t354,354", "t228,479", "t229,229r90,0,0"
    ],
    solution: "m 0,0 707,0 -230,230 125,125 -125,125 125,125 -500,0 " +
      "125,-125 -125,-125 125,-125 -229,-230 z",
    viewbox: [ -10,-60,727,641 ],
    level: 'Paradox 2',
    id: '9'
  },
];

function Hmi() {}

Hmi.prototype.resize = function () {
  var offsetHeight = 64,
    availableWidth = window.innerWidth - 32,
    availableHeight = window.innerHeight - offsetHeight;
  var size = Math.min(availableWidth, availableHeight);
  this.paper.setSize( size, size );
  var boardMarginTop = (availableHeight - size) / 2;
  $('#board').css({ 'margin-top': boardMarginTop + 'px' });

  $('#game-page').css({
    'background-size': 'auto ' + (size/6) + 'px',
  });
  var size = size / 10;
  var minSize = 60;
  size = size < minSize ? minSize : size;
  var maxSize = 120;
  size = maxSize < size ? maxSize : size;
  $('#customMenu').css({
    'width': size+'px', 'height': size+'px',
    'background-size': size+'px ' + size+'px',
  });
  $('#customBackRules').css({
    'width': size+'px', 'height': size+'px',
    'background-size': size+'px ' + size+'px',
  });
  $('#customBackOptions').css({
    'width': size+'px', 'height': size+'px',
    'background-size': size+'px ' + size+'px',
  });
  $('#customBackAbout').css({
    'width': size+'px', 'height': size+'px',
    'background-size': size+'px ' + size+'px',
  });
};

Hmi.prototype.setupChallenge = function (tile, paper, challenge) {
  var colors = [
    'red', 'blue', 'green', 'cyan', 'orange', 'yellow', 'violet'
  ];
  var selectedChallenge = Hmi.challenge[challenge];
  paper.setViewBox(selectedChallenge.viewbox[0],
    selectedChallenge.viewbox[1],
    selectedChallenge.viewbox[2],
    selectedChallenge.viewbox[3], false );
  if (selectedChallenge.hasOwnProperty('solution') && this.showSolution == 0) {
    tile[0] = paper.path( selectedChallenge.solution ).attr({
      fill: 'cyan',
      'fill-rule': 'evenodd',
      stroke: 'black',
      'stroke-width': 2.5,
      'stroke-linecap': 'butt',
      'stroke-linejoin': 'miter',
      'stroke-miterlimit': 2.5,
      'stroke-opacity': 1,
      'stroke-dasharray': 'none',
    });
  }
  else {
    var t = selectedChallenge.transform;
    for(var n=0; n<t.length; ++n) {
      var tileColor = /*"white" colors[n]*/ 'cyan';
      tile[n] = paper.path( Hmi.tiles[n] ).attr({
        fill: tileColor,
        stroke: this.showSolution == 0 ? tileColor : 'black',
        'stroke-width': 2.5,
        'stroke-linecap': 'butt',
        'stroke-linejoin': 'miter',
        'stroke-miterlimit': 2.5,
        'stroke-opacity': 1,
        'stroke-dasharray': 'none',
      }).transform(t[n]);
    }
  }
};

Hmi.prototype.initBoard = function () {
  this.paper = Raphael( 'board', 400, 400);
  this.paper.setViewBox(0, 0, 400, 400, false );
  this.paper.path( 'm-1000,-1000 4000,0 0,4000 -4000,0 z').attr({
    stroke: '#444', 'stroke-width': 0.2, 'stroke-linecap': 'round', fill: '#555'
  });
  this.showSolution = 0;
  this.challenge = 0; // Hmi.challenge.length - 1;
  this.tile = [];
  this.setupChallenge(this.tile, this.paper, this.challenge);
  this.setHeader();
};

Hmi.prototype.init = function () {
  this.initBoard();
  var $window = $(window);
  $window.resize( this.resize.bind( this ) );
  $window.resize();
  $('#solution').on( 'click', this.solution.bind(this) );
  $('#next').on( 'click', this.next.bind(this) );
  $('#previous').on( 'click', this.previous.bind(this) );
  $('#random').on( 'click', this.random.bind(this) );
};

Hmi.prototype.solution = function() {
  this.showSolution ^= 1;
  this.updateChallenge();
  $( '#left-panel' ).panel( 'close' );
};

Hmi.prototype.next = function() {
  this.showSolution = 0;
  this.challenge = (this.challenge + 1) % Hmi.challenge.length;
  this.updateChallenge();
  $( '#left-panel' ).panel( 'close' );
};

Hmi.prototype.previous = function() {
  this.showSolution = 0;
  this.challenge = (this.challenge - 1 + Hmi.challenge.length ) % Hmi.challenge.length;
  this.updateChallenge();
  $( '#left-panel' ).panel( 'close' );
};

Hmi.prototype.random = function() {
  this.showSolution = 0;
  this.challenge = Math.floor(Math.random() * Hmi.challenge.length );
  this.updateChallenge();
  $( '#left-panel' ).panel( 'close' );
};

Hmi.prototype.updateChallenge = function() {
  for(var n=0; n<this.tile.length; ++n) {
    this.tile[n].remove();
  }
  this.tile = [];
  this.setupChallenge(this.tile, this.paper, this.challenge);
  this.setHeader();
};

Hmi.prototype.setHeader = function() {
  $('#myheader').html(
    "Tangram : " +
    Hmi.challenge[this.challenge].id + ' : ' +
    Hmi.challenge[this.challenge].level
  );
}

var g_Hmi = new Hmi();
$(document).ready( function () { g_Hmi.init(); });
