"use strict";

(function(){
	
	var Vec2D = require("Vec2D.js");
	
	
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
