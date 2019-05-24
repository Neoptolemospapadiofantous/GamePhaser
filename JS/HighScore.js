
Game.HighScoreState=function(game){};
		
		Game.HighScoreState.prototype={
			init: function(Score){
				
				
			},
		

	create:function(){
	 	var backgroundimg=this.game.add.image(0,0,'MenuBack');
		this.game.input.activePointer.caprure=true;
		buttonPlay = this.game.add.button(420,320, 'MainMenuButton', actionOnClickPlay2, this);
		
	},

	update:function(){
	
		}
	}
	function actionOnClickPlay2 () {
		
		this.state.start('title',true,false,Score);
		
		}