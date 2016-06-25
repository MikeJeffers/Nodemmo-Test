"use strict";

(function(){
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

		Player.prototype.fromJSON = function(obj){
			if(obj!=null){
				for (var prop in obj){
					if(this.hasOwnProperty(prop)){
						this[prop] = obj[prop];
					}
				} 
			}
		};


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
