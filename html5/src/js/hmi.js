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

function Hmi() {}

Hmi.prototype.resize = function () {
  var offsetHeight = 164,
    offsetWidth = 48,
    availableWidth = window.innerWidth - offsetWidth,
    availableHeight = window.innerHeight - offsetHeight;
  var size = Math.min(availableWidth, availableHeight);
  $('#board').attr({ width: ''+size, height: ''+size });
  var boardMarginTop = (availableHeight - size) / 2;
  $('#board').css({ 'margin-top': boardMarginTop + 'px',
    'margin-bottom': boardMarginTop + 'px' });
};

Hmi.prototype.setupChallenge = function (tile, paper, challenge) {
  var colors = [
    'red', 'blue', 'green', 'cyan', 'orange', 'yellow', 'violet'
  ];
  var selectedChallenge = HmiChallenge[challenge];
  
  var fs = selectedChallenge.viewbox[3] / 20;
  var vb = '' + selectedChallenge.viewbox[0] + ' ' +
    (selectedChallenge.viewbox[1] - fs) + ' ' +
    selectedChallenge.viewbox[2] + ' ' +
    (selectedChallenge.viewbox[3] + fs);
  paper.attr({ viewBox: vb });
  this.header.attr({
    x: ((selectedChallenge.viewbox[0]+selectedChallenge.viewbox[2]) / 2),
    'font-size': fs
  });
  var multiColored = $('#multicolor').is(':checked');
  var mainColor = $('#maincolor').val();
  if (selectedChallenge.hasOwnProperty('silhouette') && this.showSolution == 0) {
    tile[0] = paper.path( selectedChallenge.silhouette ).attr({
      fill: mainColor,
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
      tile[n] = paper.path( Hmi.tiles[n] ).attr({
        fill: this.showSolution == 1 && multiColored ? colors[n] : mainColor,
        stroke: this.showSolution == 0 ? mainColor : 'black',
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
  this.paper = Snap('#board').attr({viewBox: '0 -20 400 400' });
  /*
  this.paper.path( 'm-1000,-1000 4000,0 0,4000 -4000,0 z').attr({
    stroke: '#ddd', 'stroke-width': 0.2, 'stroke-linecap': 'round', fill: '#ddd'
  });
  */
  this.header = this.paper.text( 200, -10, '').attr({
    'font-size': 12, 'font-family': 'sans-serif',
    fill: '#444',
    'text-anchor': 'middle',
    'alignment-baseline': 'middle'
  });
  var c = localStorage.getItem('TangramChallenge');
  this.challenge = null == c ? 0 : parseInt(c);
  this.showSolution = this.challenge == 0 ? 1 : 0;
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
  $('#board_tab').on( 'click', this.updateChallenge.bind(this) );
};

Hmi.prototype.solution = function() {
  this.showSolution ^= 1;
  this.updateChallenge();
};

Hmi.prototype.next = function() {
  this.showSolution = 0;
  this.challenge = (this.challenge + 1) % HmiChallenge.length;
  this.updateChallenge();
};

Hmi.prototype.previous = function() {
  this.showSolution = 0;
  this.challenge = (this.challenge - 1 + HmiChallenge.length ) % HmiChallenge.length;
  this.updateChallenge();
};

Hmi.prototype.random = function() {
  this.showSolution = 0;
  this.challenge = Math.floor(Math.random() * HmiChallenge.length );
  this.updateChallenge();
};

Hmi.prototype.updateChallenge = function() {
  for(var n=0; n<this.tile.length; ++n) {
    this.tile[n].remove();
  }
  this.tile = [];
  this.setupChallenge(this.tile, this.paper, this.challenge);
  localStorage.setItem('TangramChallenge', '' + this.challenge);
  this.setHeader();
};

Hmi.prototype.setHeader = function() {
  var t = 'Tangram : ' +
    (this.challenge+1) + ' : ' +
    HmiChallenge[this.challenge].level;
  this.header.attr({
    text: t
  });
}

var g_Hmi = new Hmi();
$(document).ready( function () { g_Hmi.init(); });
