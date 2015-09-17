var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');

var mainState = {
  preload: function () {
    game.stage.backgroundColor = '#666';
    game.load.image('keithachu', 'assets/keithachu.png');
    game.load.image('pokeball', 'assets/pokeball.png');
    game.load.image('fred', 'assets/fred.png');
    game.load.image('player', 'assets/player.png'); 
    game.load.image('ground', 'assets/ground.png');
  },
  create: function () {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = this.game.add.sprite(100, 400, 'keithachu');
    this.player.scale.setTo(.66666);
    game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 1000; 
    this.player.body.bounce.y = 0.5;
    this.player.body.collideWorldBounds = true;

    this.player2 = this.game.add.sprite(400, 400, 'fred');
    this.player2.scale.setTo(.333);

    game.physics.arcade.enable(this.player2);
    this.player2.body.gravity.y = 1000; 
    this.player2.body.bounce.y = 0.5;
    this.player2.body.collideWorldBounds = true;

    this.ball = this.game.add.sprite(250, 200, 'pokeball');
    this.ball.scale.setTo(.1);

    game.physics.arcade.enable(this.ball);
    this.ball.body.gravity.y = 1000; 
    this.ball.body.bounce.y = 1;
    this.ball.body.collideWorldBounds = true;

    
    this.platforms = game.add.group();
    this.platforms.enableBody = true;
    
    this.ground = [];
    for (var i = 0; i < game.world.width; i+=70) {
      this.ground.push(this.platforms.create(i, game.world.height - 70, 'ground'));
    }
    for (var j = 0; j < this.ground.length; j++) {
      this.ground[j].body.immovable = true;
    }
    
  },
  update: function () {
    for (var i = 0; i < this.ground.length; i++) {
      game.physics.arcade.collide(this.player, this.ground[i]);
      game.physics.arcade.collide(this.player2, this.ground[i]);
      game.physics.arcade.collide(this.ball, this.ground[i]);
    }
      game.physics.arcade.collide(this.player2, this.player);


    game.physics.arcade.collide(this.ball, this.player, function(ball, player){
      var angle = game.physics.arcade.angleBetween(ball, player)/Math.PI*180;
      ball.body.velocity = game.physics.arcade.velocityFromAngle(angle, ball.body.speed);
      console.log(angle);
    });
    game.physics.arcade.collide(this.ball, this.player2, function(ball, player){
      var angle = game.physics.arcade.angleBetween(ball, player)/Math.PI*180;
      ball.body.velocity = game.physics.arcade.velocityFromAngle(angle, ball.body.speed);
      console.log(angle);
    });

    this.player.body.velocity.x = 0;

    var cursors = game.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
        this.player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        this.player.body.velocity.x = 150;
    }
    if (cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.body.velocity.y = -600;
    }
  
    this.player2.body.velocity.x = 0;

    var wasd = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W ),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S ),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A ),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D )
    } 
    if (wasd.left.isDown)
    {
        this.player2.body.velocity.x = -150;
    }
    else if (wasd.right.isDown)
    {
        this.player2.body.velocity.x = 150;
    }
    if (wasd.up.isDown && this.player2.body.touching.down)
    {
        this.player2.body.velocity.y = -600;
    }
  }
};

game.state.add('main', mainState);
game.state.start('main');