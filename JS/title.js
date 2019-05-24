
function actionOnClickPlay () {
	
	this.state.start('level1',true,false);
	
	}
	function actionOnClickHighScore () {
		
		this.state.start('HighScore',true,false,Score)
		
		}

Game.TitleState=function(game){};
		
		Game.TitleState.prototype={
			init: function(Score){
				
				
			},
		

	create:function(){
	 	var backgroundimg=this.game.add.image(0,0,'MenuBack');
		this.game.input.activePointer.caprure=true;
		buttonPlay = this.game.add.button(480-115, 320-100, 'NewGameButton', actionOnClickPlay, this);
		buttonHighScore = this.game.add.button(478-115, 420-100, 'HighScoreButton', actionOnClickHighScore, this);
		
	},

	update:function(){
	
		}
	}