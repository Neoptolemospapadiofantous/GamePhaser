
Game.VictoryState=function(game){};
		
Game.VictoryState.prototype={
	init: function(Score){
		
		
	},

	create:function(){
	 	
		this.game.input.activePointer.caprure=true;
	
		var backgroundimg=this.game.add.image(0,0,'VictoryBackground');
		text = this.game.add.text(10, 10, "YOU WON, YOUR SCORE IS:", {
			font: "40px Arial",
			fill: "#ffffff",
			align: "center" });
			text.setText('YOU WON, YOUR SCORE IS:'+Score);
			buttonPlay = this.game.add.button(420,320, 'MainMenuButton', actionOnClickPlay2, this);
	},

	update:function(){
	
		}
	}

	function actionOnClickPlay2 () {
		
		this.state.start('title',true,false,Score);
		
		}