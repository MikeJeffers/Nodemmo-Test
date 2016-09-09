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

