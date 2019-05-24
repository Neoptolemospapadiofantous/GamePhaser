Game.PreloadState=function(game){};

Game.PreloadState.prototype={
	preload:function(){
		var loadingLabel= this.game.add.text(200,100,'loading...', {font: '30px Courier',fill:'#ffffff'});
		
		this.time.advancedTiming=true;
		
		/* load graphic Assets*/
		this.load.spritesheet('MainPlayer','JavaScript_Assets/sprites/character/spritesheetCharacter.png',567,556);
		this.load.spritesheet('enemy1','JavaScript_Assets/sprites/Enemies/Enemyone.png',430,519);
		this.load.spritesheet('enemy2','JavaScript_Assets/sprites/Enemies/enemytwo.png',521,576);
		this.load.image('Coin','JavaScript_Assets/sprites/Objectives/Coin.png');
		this.load.tilemap('map1','JavaScript_Assets/Tilemaps/Map1/Level1.csv',null, Phaser.Tilemap.CSV);
		this.load.image('tileset','JavaScript_Assets/Tilemaps/Map1/Level1.png');
		this.load.image('Rock','JavaScript_Assets/sprites/Enemies/Rock.png');
        this.load.image('playerammo','JavaScript_Assets/sprites/Bullets/BulletCharacter.png');
		this.load.image('PlayerLives','JavaScript_Assets/sprites/UI/HealthLives/Heart.png',328,320);
		this.load.image('HighScoreButton','JavaScript_Assets/sprites/UI/GUI/button_high-score.png');
		this.load.image('NewGameButton','JavaScript_Assets/sprites/UI/GUI/button_new-game.png');
		this.load.image('MainMenuButton','JavaScript_Assets/sprites/UI/GUI/button_main-menu.png');
		this.load.image('BackgroundLevel1','JavaScript_Assets/Backgrounds/forest.png');
		this.load.image('Kunai','JavaScript_Assets/sprites/Bullets/Kunai.png');
		this.load.image('Blood','JavaScript_Assets/sprites/Emmiter/blood.png');
		this.load.image('MenuBack','JavaScript_Assets/Backgrounds/fantasy.png');
		this.load.image('FinishLine','JavaScript_Assets/sprites/Random/FinishLine.png');
		this.load.image('VictoryBackground','JavaScript_Assets/Backgrounds/Vilage.png');

		/*load audio assets*/
		this.load.audio('ZombieDeathSound','JavaScript_Assets/sounds_effects/ZombieDead.mp3');
		this.load.audio('Lasersound','JavaScript_Assets/sounds_effects/laser.wav');
		this.load.audio('Damaged','JavaScript_Assets/sounds_effects/pain.mp3');
		this.load.audio('Dead','JavaScript_Assets/sounds_effects/DeadPlayer.mp3');
		this.load.audio('CoinCollect','JavaScript_Assets/sounds_effects/Coin_Collect.wav');
		this.load.audio('Entrance','JavaScript_Assets/sounds_effects/FactoryEntracnce.mp3');

	},

	create:function(){

	this.game.state.start('title');

	}
}


