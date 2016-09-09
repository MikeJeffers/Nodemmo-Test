(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

(function(){
	var Vec2D = require("./Vec2D.js");
	
	var Player = (function(){
		function Player(_id, _pos, _target){
			this.id = _id;
			this.pos = _pos;
			this.toPos = _target;
		}

		Player.prototype.constructor = Player;

		Player.prototype.setID = function(_id){
			this.id = _id;
		};

		Player.prototype.getID = function(){
			return this.id;
		};

		Player.prototype.getPos = function(){
			return this.pos;
		};

		Player.prototype.getTarget = function(){
			return this.toPos;
		};

		Player.prototype.setTarget = function(_pos){
			this.toPos = _pos;
		};

		Player.prototype.setPos = function(_pos){
			this.pos = _pos;
		};

		Player.prototype.isUndefined = function(){
			if(this.id||this.id==0){
				if(this.pos){
					if(this.toPos){
						return false;
					}
				}
			}
			return true;
		};

		Player.prototype.equals = function(other){
			if(other!=null && this!=null){
				if(this.id==other.id){
					if(this.pos.equals(other.pos)){
						if(this.toPos.equals(other.toPos)){
							return true;
						}
					}
				}
			}
			return false;
		}


		return Player;
	})();
	/*Cross compatability node/browser clause*/
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
		module.exports = Player;
	}else{
		window.Player = Player;
	}
	/*Cross compatability node/browser clause*/

})();

},{"./Vec2D.js":2}],2:[function(require,module,exports){
"use strict";

(function(){
	var Vec2D = (function(){
		function Vec2D(x1, y1){
			this.x = x1;
			this.y = y1;
		}

		Vec2D.prototype.constructor = Vec2D;

		Vec2D.prototype.x = function(){
			return this.x;
		};

		Vec2D.prototype.y = function() {
			return this.y;
		};

		Vec2D.prototype.setX = function(x1) {
			this.x = x1;
		};

		Vec2D.prototype.setY = function(y1) {
			this.y = y1;
		};

		Vec2D.prototype.add = function(a, b){
			if(typeof(a)===typeof(b) && typeof(a)==='Vec2D'){
				return new Vec2D(a.x+b.x, a.y+b.y);
			}
		};

		Vec2D.prototype.inverse = function(){
			return new Vec2D(-this._x, -this._y);
		};

		Vec2D.prototype.equals = function(other){
			if(other!=null && this!=null){
				if(other.x==this.x && this.y==other.y){
					return true;
				}
			}
			return false;
		};

		return Vec2D;
	})();

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
		module.exports = Vec2D;
	}else{
		window.Vec2D = Vec2D;
	}

})();


},{}],3:[function(require,module,exports){
var Vec2D = require("./Vec2D.js");
var Player = require("./Player.js");

},{"./Player.js":1,"./Vec2D.js":2}]},{},[3]);
