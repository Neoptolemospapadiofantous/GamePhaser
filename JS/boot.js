var Game={};
Game.BootState=function(game){

};
Game.BootState.prototype={

	init:function(){
		this.input.maxPointers=1;
		this.stage.disableVisibilityChange=true;
	},

	preload:function(){

	},

	create:function(){
		this.state.start('preload');
	}


}
	