Game.LeveloneState=function(game){
   Score=0;
};


var player;
var controls={};
var playerSpeed=150;
var playerrunningspeed=350;
var jumpTimer=0;
var playerscale=0.15;
var bullets;
var bulletTime=0;
var facing='Right';
var text;
var lives;
VictoryIcon=null;
var Boss;
var Coins;
var rock;
var vulnerable=false;
var playeroutoftime;
var Victory;

Game.LeveloneState.prototype={
create:function(){
   

    laser = this.add.audio('Lasersound');
    Dead= this.add.audio('Dead');
    Pain =this.add.audio('Damaged');
    DeathMob = this.add.audio('ZombieDeathSound');
    CoinCollect= this.add.audio('CoinCollect');
    RockWarning= this.add.audio('Entrance');


    map=this.add.tilemap('map1',32,32);
    map.addTilesetImage('tileset');
    map.setCollisionBetween(770,785);
    this.physics.arcade.gravity.y=1100;
    
    layer=map.createLayer(0);
    layer.resizeWorld();

    text = this.game.add.text(10, 10, "Score: 0", {
        font: "40px Arial",
        fill: "#ffffff",
        align: "center" });
    text.fixedToCamera = true; 
    Victory=false;

    /* PLAYER ANIMATIONS*/
    player=this.add.sprite(this.game.world.centerX+15, this.game.world.centerY+100,'MainPlayer');
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(playerscale, playerscale);
    
    playeroutoftime=false;

    
    /* PLAYER ANIMATIONS*/
    player.animations.add('idle',[9,27,36,45,54,63,72,10,11,18],24,false);
    player.animations.add('walk',[35,39,48,57,66,75,40,41],12,false);
    player.animations.add('Run',[35,39,48,57,66,75,40,41],24,false);
    player.animations.add('jump',[12,14,15,16,17,19,28,37,46,13],24,false);
    player.animations.add('RangeAttack',[52,53,59,68],24,false);
    player.animations.add('RunShoot',[42,43,44,49,58,67,76,50],24,false);
    player.animations.add('PlayerDeath',[0,1,2,3,4,5,6,7,8],24,false);
    this.physics.enable(player,Phaser.Physics.ARCADE);
    this.camera.follow(player);
    player.body.collideWorldBounds=true;

  
 
  this.time.events.loop(Phaser.Timer.SECOND *4, spawnenemiesSpotOne, this);
  this.time.events.loop(Phaser.Timer.SECOND *4, spawnenemiesSpotTwo, this);
  this.time.events.loop(Phaser.Timer.SECOND *4, spawnenemiesSpotThree, this);
  this.time.events.loop(Phaser.Timer.SECOND *4, spawnenemiesSpotFour, this);


// Coin
this.time.events.loop(Phaser.Timer.SECOND *10, spawnnCoin, this);



//total time until trigger
this.timeInSeconds = 180;
//make a text field
this.timeText = this.add.text(this.game.world.centerX+15, this.game.world.centerY-50, "0:00");
//turn the text white
this.timeText.fill = "#ffffff";

//center the text
this.timeText.anchor.set(0.5, 0.5);
this.timeText.scale.setTo(1,1);
//set up a loop timer
this.timer = this.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
   
    

    bullets=this.add.group();
    bullets.physicsBodyType=Phaser.Physics.ARCADE;
    

    enemies=this.add.group();
    enemies.physicsBodyType=Phaser.Physics.ARCADE;

    
    rocks=this.add.group();
    rocks.enableBody=true;
    

    lives=this.add.group();
    for (var i = 0; i < 3; i++) 
   {
       var live = lives.create(800+ (30 * i), 60, 'PlayerLives');
       live.anchor.setTo(0.5, 0.5);
       live.scale.set(0.1,0.1);
   }
    lives.fixedToCamera = true; 



    controls={
        Left:this.input.keyboard.addKey(Phaser.Keyboard.A),
       Right: this.input.keyboard.addKey(Phaser.Keyboard.D),
       Jump:this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
       Attack:this.input.keyboard.addKey(Phaser.Keyboard.X),
       Run:this.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
       
  };
},

update:function(){

    this.physics.arcade.collide(player,layer);
    this.physics.arcade.collide(enemies,layer);
    this.physics.arcade.collide(VictoryIcon,layer);
    this.physics.arcade.collide(Boss,layer);
    this.physics.arcade.collide(Coins,layer);
    player.body.velocity.x=0;
   
    
    /*PLAYER MOVEMENT*/
    /*////////////////*/

    /*Player Left Movement*/
  if (controls.Left.isDown&&!controls.Attack.isDown&&lives.countLiving()>0 && playeroutoftime==false)
  {
       player.body.velocity.x=-playerSpeed;
       player.animations.play('walk');
       player.scale.setTo(-playerscale,playerscale);
       facing='left';

       
  }
   /*Player Left Running */
 if(controls.Left.isDown && controls.Run.isDown&&lives.countLiving()>0 && playeroutoftime==false){
    player.body.velocity.x=-playerrunningspeed;
    

 }
 //Run shoot left
 if(controls.Left.isDown&& controls.Run.isDown&&controls.Attack.isDown&&lives.countLiving()>0 && playeroutoftime==false){
    
    player.body.velocity.x=-playerSpeed-100;
   

 }

 /*Player Right Movement*/
 if(controls.Right.isDown&&!controls.Attack.isDown&&lives.countLiving()>0 && playeroutoftime==false)
  {
    player.body.velocity.x=+playerSpeed;
    player.animations.play('walk');
    player.scale.setTo(playerscale,playerscale);
    facing='Right';
    
}
/*Player Right Running */
if(controls.Right.isDown && controls.Run.isDown&&lives.countLiving()>0 && playeroutoftime==false){
    player.body.velocity.x=+playerrunningspeed;
    
 }
//run shoot
if(controls.Right.isDown&& controls.Run.isDown&&controls.Attack.isDown&&lives.countLiving()>0 && playeroutoftime==false){
    
player.body.velocity.x=+playerSpeed+100

 }




/*Player Jumping*/
if(controls.Jump.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer&&lives.countLiving()>0 && playeroutoftime==false)
{
    player.body.velocity.y=-600;	
    jumpTimer=this.time.now+750;
    player.animations.play('jump');

}

/*Player Idle*/
 if (player.body.velocity.x==0 && player.body.velocity.y==0 && !controls.Jump.isDown &&!controls.Attack.isDown&&lives.countLiving()>0&& playeroutoftime==false )
  {
            player.animations.play('idle');
     }
        
        
     	/*player Shooting*/
	if (controls.Attack.isDown&& lives.countLiving()>0 && playeroutoftime==false){
        if(bulletTime<this.time.now){
            bulletTime=this.time.now+200;
            var bullet;
            if(facing=='right'){
                bullet=bullets.create(player.body.x+player.body.width/2+20,player.body.y+player.body.height/2-4,'playerammo');
            }else{
                bullet=bullets.create(player.body.x+player.body.width/2-20,player.body.y+player.body.height/2-4,'playerammo');
            }
            this.physics.enable(bullet,Phaser.Physics.ARCADE);
            bullet.outOfBoundsKill=true;
        
            bullet.body.allowGravity=false;
        
            bullet.anchor.setTo(0.5,0.5);
            bullet.scale.setTo(0.1,0.1);
            if(facing=='Right'){
                bullet.body.velocity.x=800;
            }else{
                bullet.body.velocity.x=-800;
            }

            if(player.body.velocity.x==playerSpeed+100||player.body.velocity.x==-playerSpeed-100){
                player.animations.play('RunShoot');
            }
            else player.animations.play('RangeAttack');
            laser.play();

        }
        }
   
        if (this.physics.arcade.overlap(player,enemies,colisionHandlerPlayer,null,this))

        {
 
    }



	if (this.physics.arcade.overlap(bullets,enemies,colisionHandlerEnemy,null,this)){
		
        Score=Score+10;
        text.setText("Score:" + Score);
	}
	if (this.physics.arcade.overlap(player,Coins,colisionHandlerCoins,null,this)){
		Score=Score+50;
        text.setText("Score:" + Score);
		
    }
    if(this.physics.arcade.overlap(player,rocks,colisionHandlerRocks,null,this)){
		
    }

   
   
    
    if(lives.countLiving()>0){
    if(this.physics.arcade.overlap(player,VictoryIcon,colisionStageVictory,null,this)){
         Score=Score+10000;;
         text.setText("Score:" + Score);
         Victory=true;
       
    }
}
 },

 tick: function() {
    //subtract a second
    this.timeInSeconds--;
    //find how many complete minutes are left
    var minutes = Math.floor(this.timeInSeconds / 60);
    //find the number of seconds left
    //not counting the minutes
    var seconds = this.timeInSeconds - (minutes * 60);
    //make a string showing the time
    var timeString = this.addZeros(minutes) + ":" + this.addZeros(seconds);
    //display the string in the text field
    this.timeText.text = timeString;
    //check if the time is up
    
    if (this.timeInSeconds == 0) {
        //remove the timer from the game
        this.time.events.remove(this.timer);
       
        
        VictoryIcon=this.add.sprite(this.game.world.centerX, this.game.world.centerY,'FinishLine');
        VictoryIcon.scale.setTo(0.1,0.1);
        this.physics.enable(VictoryIcon,Phaser.Physics.ARCADE);
        if(Victory!==true){
        this.game.time.events.add(Phaser.Timer.SECOND * 5, PlayerOutOfTime, this);
        }
    }
    if ((this.timeInSeconds == 120)|| (this.timeInSeconds == 60)||(this.timeInSeconds == 10)){
        RockWarning.play();
       
       
       this.game.time.events.add(Phaser.Timer.SECOND * 4, spawnRocks, this); 
    
       

    }
},
    addZeros: function(num) {
        if (num < 10) {
            num = "0" + num;
        }
        return num;
    }


// EEEEEEEEEEEEEEEEEEBDSADASDSADAS

}

function PlayerOutOfTime(){
    playeroutoftime=true;
    var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
    var text = this.add.text(150, 220, "GAME OVER \n Click to go to Main Manu \n " , style);
    text.fixedToCamera=true;
    player.animations.play('PlayerDeath');
  
    player.body.enable=false;
    Dead.play();
    
   

    this.input.onTap.addOnce(DeathState,this);
    
}

function colisionHandlerRocks(){
 
    if(vulnerable!==true){
        Pain.play();
        live = lives.getFirstExists();
        
            if (live)
            {
                live.kill();
            }
            vulnerable=true;
        }
       this.game.time.events.add(Phaser.Timer.SECOND * 2, PlayerVunrable, this);
        
   
    if (lives.countLiving()==0){
        var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
        var text = this.add.text(150, 220, "GAME OVER \n Click to go to Main Manu \n " , style);
        text.fixedToCamera=true;
        player.animations.play('PlayerDeath');
        player.body.enable=false;
        Dead.play();
        
       

        this.input.onTap.addOnce(DeathState,this);
    }
}
function spawnRocks(){

    this. game.camera.shake(0.05, 500);
    for (var i = 0; i < 6; i++) 
   {
       rocks.create(-100 + (300 * i), 60, 'Rock');
      
      
   }
    


};




 function changelevel(){
    this.game.state.start('Victory',true,false,Score);
 }
function colisionStageVictory(){
    this.time.events.add(Phaser.Timer.SECOND * 2, changelevel, this);
    var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
    var text = this.add.text(300, 220, "Level Complete", style);
    player.body.gravity=true;
    player.body.enable=false;
    text.fixedToCamera=true;
    playeroutoftime=true;
    
}



 

function colisionHandlerEnemy(bullets,enemies){
    DeathMob.play();
    bullets.kill();
    enemies.kill()

}

function PlayerVunrable(){
    vulnerable=false;
}

function colisionHandlerPlayer(player,enemy){
    
    if(vulnerable!==true){
        Pain.play();
        live = lives.getFirstExists();
        
            if (live)
            {
                live.kill();
            }
            vulnerable=true;
        }
       this.game.time.events.add(Phaser.Timer.SECOND * 2, PlayerVunrable, this);
        
   
    if (lives.countLiving()==0){
        var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
        var text = this.add.text(280, 220, "GAME OVER \n Click to continue \n " , style);
        text.fixedToCamera=true;
        player.animations.play('PlayerDeath');
        player.body.enable=false;
        Dead.play();
        
       

        this.input.onTap.addOnce(DeathState,this);
    }

        }
    

function DeathState(){

    this.state.start('title',true,false);
	player.kill();
}

function spawnenemiesSpotOne(){
    
    
    enemy=enemies.create(1700,300,'enemy1');
    enemy.animations.add('ZombieBoywalk',[35,36,37,38,39,40,41,42,43,44],15,true);
    enemy.animations.add('ZombieDead',[8,9,10,11,12,13,14,15,16,17,18,19],15,false);
    enemy.animations.play('ZombieBoywalk');
    this.physics.enable(enemy,Phaser.Physics.ARCADE);
    enemy.body.velocity.x=-100;
    enemy.scale.setTo(-0.15,0.15);
    enemy.outOfBoundsKill=true;

}

function spawnenemiesSpotTwo(){
    
    
    enemy=enemies.create(200,300,'enemy1');
    enemy.animations.add('ZombieBoywalk',[35,36,37,38,39,40,41,42,43,44],15,true);
    enemy.animations.add('ZombieDead',[8,9,10,11,12,13,14,15,16,17,18,19],15,false);
    enemy.animations.play('ZombieBoywalk');
    this.physics.enable(enemy,Phaser.Physics.ARCADE);
    enemy.body.velocity.x=+100;
    enemy.scale.setTo(0.15,0.15);
    enemy.outOfBoundsKill=true;

}
function spawnenemiesSpotThree(){
    
    
    enemy=enemies.create(150,600,'enemy1');
    enemy.animations.add('ZombieBoywalk',[35,36,37,38,39,40,41,42,43,44],15,true);
    enemy.animations.add('ZombieDead',[8,9,10,11,12,13,14,15,16,17,18,19],15,false);
    enemy.animations.play('ZombieBoywalk');
    this.physics.enable(enemy,Phaser.Physics.ARCADE);
    enemy.body.velocity.x=+100;
    enemy.scale.setTo(0.15,0.15);
    enemy.outOfBoundsKill=true;

}
function spawnenemiesSpotFour(){
    
    
    enemy=enemies.create(1800,600,'enemy1');
    enemy.animations.add('ZombieBoywalk',[35,36,37,38,39,40,41,42,43,44],15,true);
    enemy.animations.add('ZombieDead',[8,9,10,11,12,13,14,15,16,17,18,19],15,false);
    enemy.animations.play('ZombieBoywalk');
    this.physics.enable(enemy,Phaser.Physics.ARCADE);
    enemy.body.velocity.x=-100;
    enemy.scale.setTo(-0.15,0.15);
    enemy.outOfBoundsKill=true;

}


function makeParticle(){
    emitter = this.add.emitter(player.x,player.y, 100);
    emitter.makeParticles('Blood');
    emitter.gravity = 200;
    emitter.minParticleScale = 0.01;
    emitter.maxParticleScale = 0.05;
    emitter.start(true, 4000, null, 10);
}


function spawnnCoin(){
    
    Coins=this.add.sprite(this.game.rnd.integerInRange(200, 1900),this.game.rnd.integerInRange(300, 800),'Coin');
    Coins.anchor.setTo(0.5,0.5);
    Coins.scale.setTo(0.1, 0.1);
    
    this.physics.enable(Coins,Phaser.Physics.ARCADE);
}

function colisionHandlerCoins(){
    
    Coins.kill();
    CoinCollect.play();
}