function banner()
{
    CocoonJS.Ad.onBannerReady.addEventListener(function() {

        CocoonJS.Ad.setBannerLayout(CocoonJS.Ad.BannerLayout.BOTTOM_CENTER);
        CocoonJS.Ad.showBanner();

    });
    // CocoonJS.Ad.showBanner()
    // alert('!')
}

CocoonJS.Ad.preloadBanner();
window.addEventListener("load",banner,false);
// banner();

var game;

//хаки:
//1. последний спрайт не грузится
//  загружаем пустой спрайт в конце
//2. шрифт отсутствует на начало работы
//  в разметке ставим символ, который его подтягивает

window.onload = function () {
    
    //удаляем символ исползующийся для хака со шрифтом 
    document.body.innerHTML = '';

    // var width = window.innerWidth,
        // height = window.innerHeight;

    var width = navigator.isCocoonJS ? window.innerWidth : 480;
    var height = navigator.isCocoonJS ? window.innerHeight : 320;

    // width = width * window.devicePixelRatio;
    // height = height * window.devicePixelRatio;

    game = new Phaser.Game(width, height, Phaser.CANVAS, 'laddercube', 
        {
            preload: function preload() {

                game.load.image('whitecube200', 'assets/sprites/whitecube200.png');
                game.load.image('deadcube200', 'assets/sprites/deadcube200.png');
                game.load.image('levelscube200', 'assets/sprites/levelscube200.png');
                game.load.image('whitecube400', 'assets/sprites/whitecube400.png');
                game.load.image('pinkcube24', 'assets/sprites/pinkcube24.png');//rect26x46.png //rect26x106.png
                game.load.image('leftarrow', 'assets/sprites/leftarrow.png');
                game.load.image('rightarrow', 'assets/sprites/rightarrow.png');

                game.load.image('twitter', 'assets/sprites/twitter.png');
                game.load.image('facebook', 'assets/sprites/facebook.png');

                // game.load.image('space', 'assets/sprites/space-307x512.jpg');
                // game.load.image('candy', 'assets/sprites/candy.png');

                // game.load.audio('from_city', ['assets/audio/music/city.mp3']); //, 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg'
                // game.load.audio('from_city', ['assets/audio/RoccoW_-_04_-_Weeklybeats_2014_4_-_All_Will_Be_Well.mp3']);
                // game.load.audio('game', ['assets/audio/music/Rolemusic_-_04_-_Scape_from_the_city.mp3']);
                game.load.audio('game', ['assets/audio/music/BoxCat_Games_-_09_-_eCommerce.mp3']);
                game.load.audio('menu', ['assets/audio/music/RoccoW_-_04_-_Weeklybeats_2014_4_-_All_Will_Be_Well.mp3']);

                game.load.audio('kick', [ 'assets/audio/kick.wav' ]);
                game.load.audio('boom', [ 'assets/audio/explode1.wav' ]);
                

                // game.load.audio('from_city', ['assets/audio/music/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/music/bodenstaendig_2000_in_rock_4bit.ogg']);

            },
            create: function create() {

                game.physics.startSystem(Phaser.Physics.P2JS);
                game.physics.setBoundsToWorld();

                game.physics.p2.gravity.y = 1500;

                //  Make things a bit more bouncey
                game.physics.p2.restitution = 0.2;
                game.physics.p2.friction = 3;


                sounds.menumusic = game.add.audio('menu', 1, true);
                sounds.gamemusic = game.add.audio('game', 1, true);
                sounds.kick = game.add.audio('kick');
                sounds.gameover = game.add.audio('boom');

                sounds.kick.addMarker('kick', 0, 1.0);



                //установка фона
                {
                    var myBitmap = game.add.bitmapData(game.world.width, game.world.height);

                    var grd = myBitmap.context.createLinearGradient(0,0,0,game.world.height);
                    // grd.addColorStop(0, "#b0fbff");
                    // grd.addColorStop(1, "#ffbbf8");
                    grd.addColorStop(0, "#002255");
                    grd.addColorStop(1, "#000105");
                    myBitmap.context.fillStyle=grd;
                    myBitmap.context.fillRect(0,0,game.world.width,game.world.height);

                    game.add.sprite(0, 0, myBitmap);
                }

                //поле количества очков на заднем плане
                {
                    texts.score = game.add.text(-100, -100, '', {
                        font: '250px KarmaFuture',
                        fill: '#ffffff',
                        align: "center"
                    });
                    // texts.score.scale.setTo(0.5,0.5);
                    texts.score.alpha = 0.02
                }
                /*
                var bg = this.game.add.sprite(0, 0, 'space');
                bg.alpha = 0.2;
                */


                //анимированный фон
                {
                    var emitter = game.add.emitter(game.world.centerX, game.world.height, 15);

                    emitter.gravity = 0;
                    emitter.width = game.world.width;
                    // emitter.angle = 30; // uncomment to set an angle for the rain.

                    emitter.makeParticles('whitecube200');

                    emitter.minParticleScale = 0.005;
                    emitter.maxParticleScale = 0.1;

                    var minspeed = 50;
                    emitter.setYSpeed(-minspeed, -minspeed*3);
                    emitter.setXSpeed(-5, 5);

                    emitter.minRotation = -200;
                    emitter.maxRotation = 200;

                    // console.log(game.world.height/minspeed)
                    emitter.start(false, game.world.height/minspeed*1000, 1500, 0);

                }

                //анимированный фон
                /*
                {
                    var emitter = game.add.emitter(game.world.centerX, game.world.height, 10);

                    emitter.gravity = 0;
                    emitter.width = game.world.width;
                    // emitter.angle = 30; // uncomment to set an angle for the rain.

                    emitter.makeParticles('whitecube200');

                    emitter.minParticleScale = 0.05;
                    emitter.maxParticleScale = 0.1;

                    var minspeed = 150;
                    emitter.setYSpeed(-minspeed, -minspeed*2);
                    emitter.setXSpeed(-5, 5);

                    emitter.minRotation = -400;
                    emitter.maxRotation = 400;

                    // console.log(game.world.height/minspeed)
                    emitter.start(false, game.world.height/minspeed*1000, 500, 0);

                }
                */


                //подгружаем спрайты
                {
                    sprites.menucube1 = game.add.sprite(game.world.width+500, game.world.height+500, 'deadcube200');
                    sprites.menucube1.anchor.setTo(0.5, 0.5);
                    sprites.menucube1.scale.setTo(0.5, 0.5);

                    sprites.menucube2 = game.add.sprite(game.world.width+500, game.world.height+500, 'whitecube200');
                    sprites.menucube2.anchor.setTo(0.5, 0.5);
                    sprites.menucube2.scale.setTo(0.5, 0.5);

                    sprites.menucube3 = game.add.sprite(game.world.width+500, game.world.height+500, 'levelscube200');
                    sprites.menucube3.anchor.setTo(0.5, 0.5);
                    sprites.menucube3.scale.setTo(0.5, 0.5);

                    player.sprite = game.add.sprite(-500, -500, 'pinkcube24');
                    player.sprite.anchor.setTo(0.5, 0.5);
                    player.sprite.scale.setTo(0.5, 0.5);


                    sprites.leftarrow = game.add.sprite(game.world.width+500, game.world.height+500, 'leftarrow');
                    sprites.leftarrow.anchor.setTo(0.5, 0.5);
                    sprites.leftarrow.scale.setTo(0.5, 0.5);
                    sprites.leftarrow.alpha = 0.5

                    sprites.rightarrow = game.add.sprite(game.world.width+500, game.world.height+500, 'rightarrow');
                    sprites.rightarrow.anchor.setTo(0.5, 0.5);
                    sprites.rightarrow.scale.setTo(0.5, 0.5);
                    sprites.rightarrow.alpha = 0.5

                    sprites.tweetbutton = game.add.sprite(game.world.width+500, game.world.height+500, 'twitter');
                    sprites.tweetbutton.anchor.setTo(0.5, 0.5);
                    sprites.tweetbutton.scale.setTo(0.5, 0.5);

                    /*
                    sprites.facebookbutton = game.add.sprite(game.world.width+500, game.world.height+500, 'facebook');
                    sprites.facebookbutton.anchor.setTo(0.5, 0.5);
                    sprites.facebookbutton.scale.setTo(0.5, 0.5);
                    */


                    cubes.initsprites();


                    //пустой от бага подгрузки последнего спрайта на cocoonjs
                    // sprites.empty = game.add.sprite(-50, -50, '');
                }

                //предзагрузка текстов
                {
                    texts.logo = game.add.text(-100, -100, 'LADDER CUBE', {
                        font: '80px KarmaFuture',
                        fill: '#ffffff',
                        align: "center"
                    });
                    texts.logo.scale.setTo(0.5,0.5);

                    texts.survival = game.add.text(-100, -100, 'Survival', {
                        font: '45px KarmaFuture',
                        fill: '#ffffff',
                        align: "center"
                    });
                    texts.survival.scale.setTo(0.5,0.5);

                    texts.levels = game.add.text(-100, -100, 'Levels', {
                        font: '50px KarmaFuture',
                        fill: '#ffffff',
                        align: "center"
                    });
                    texts.levels.scale.setTo(0.5,0.5);

                    texts.mode = game.add.text(-100, -100, '< Mode >', {
                        font: '40px KarmaFuture',
                        fill: '#f85153',
                        align: "center"
                    });
                    texts.mode.scale.setTo(0.5,0.5);



                    texts.menuscoretext = game.add.text(-100, -100, '', {
                        font: '30px KarmaFuture',
                        fill: '#52bbf8',
                        align: "center"
                    });
                    texts.menuscoretext.scale.setTo(0.5,0.5);

                    texts.menuscore = game.add.text(-100, -100, '', {
                        font: '35px KarmaFuture',
                        fill: '#f85153',
                        align: "center"
                    });
                    texts.menuscore.scale.setTo(0.5,0.5);

                    

                    texts.menubestscoretext = game.add.text(-100, -100, '', {
                        font: '30px KarmaFuture',
                        fill: '#52bbf8',
                        align: "center"
                    });
                    texts.menubestscoretext.scale.setTo(0.5, 0.5);

                    texts.menubestscore = game.add.text(-100, -100, '', {
                        font: '35px KarmaFuture',
                        fill: '#f85153',
                        align: "center"
                    });
                    texts.menubestscore.scale.setTo(0.5,0.5);



                    texts.soon = game.add.text(-100, -100, 'Soon', {
                        font: '30px KarmaFuture',
                        fill: '#ffffff',
                        align: "center"
                    });
                    texts.soon.scale.setTo(0.5,0.5);

                }

                //хак от ошибки загрузки последнего спрайта
                game.add.sprite(0,0,'');


                controls.cursors = game.input.keyboard.createCursorKeys();

                //переходим к меню
                game.time.events.add(Phaser.Timer.SECOND * 0.7, function () {
                    stages.change('menu');
                }, this);

            },
            update: function update() {
                
                if(stages.stage === 'menu')
                {
                    if(player.checkIfCanJump())
                    {
                        // console.log('!')
                    }
                }

                if(player.sprite && player.sprite.body && !controls.rotate.blocked)
                {
                    var pointer = (game.input.activePointer.isDown?game.input.activePointer:( (game.input.pointer1.isDown?game.input.pointer1:game.input.pointer2)) );

                    var rotatebuttonsize = (sprites.leftarrow||sprites.rightarrow).height*2;

                    var insideleftbutton = (pointer.isDown && pointer.x < rotatebuttonsize && pointer.y > (game.world.height-rotatebuttonsize) );
                    var insiderightbutton = (pointer.isDown && pointer.x > (game.world.width-rotatebuttonsize) && pointer.y > (game.world.height-rotatebuttonsize));

                    if (controls.cursors.left.isDown || (stages.stage === 'menu' && insideleftbutton) || (stages.stage === 'deadmode' && pointer.x < game.world.centerX && pointer.x > 0) )
                    {
                        // console.log(pointer.x)
                        if(player.rotdir === 1 && (controls.rotate.lastpresstime === undefined || (new Date()-controls.rotate.lastpresstime) < 500))
                        {
                            player.rotspeed = player.rotspeed>player.maxrotspeed*2.5?player.maxrotspeed*2.5:player.rotspeed+20;
                        }
                        else
                        {
                            player.rotspeed = 0;
                        }

                        sprites.leftarrow.scale.setTo(0.6, 0.6);

                        controls.rotate.lastpresstime = new Date();

                        player.rotdir = 1;
                        player.sprite.body.rotateLeft(player.rotspeed);

                        controls.tappedrotate = true;
                    }
                    else if (controls.cursors.right.isDown || (stages.stage === 'menu' && insiderightbutton) || (stages.stage === 'deadmode' && pointer.x > game.world.centerX) ) 
                    {
                    	// console.log('rightmodecubetween')
                        // console.log((new Date()-controls.rotate.lastpresstime))
                        if(player.rotdir === 2 && (controls.rotate.lastpresstime === undefined || (new Date()-controls.rotate.lastpresstime) < 500))
                        {
                            player.rotspeed = player.rotspeed>player.maxrotspeed*2.5?player.maxrotspeed*2.5:player.rotspeed+20;
                        }
                        else
                        {
                            player.rotspeed = 0;
                        }
                        
                        sprites.rightarrow.scale.setTo(0.6, 0.6)

                        controls.rotate.lastpresstime = new Date();

                        player.rotdir = 2;

                        player.sprite.body.rotateRight(player.rotspeed);
                    }
                    else
                    {
                        controls.rotate.reset();
                    }
                }
            }
        });
}

var social = {
    tweet: function () {

        var url = 'https://twitter.com/intent/tweet?text=I scored '+player.lastscore+' points in the Ladder Cube Game &url=https://play.google.com/store/apps/details?id=com.laddercube.free'

        var win = window.open(url, '_blank');
        win.focus();

    },
    facebookme: function () {
        var url = 'https://twitter.com/intent/tweet?text=I have won '+player.lastscore+' on the Ladder Cube Game&url=https://play.google.com/store/apps/details?id=com.laddercube.free'

        var win = window.open(url, '_blank');
        win.focus();
    }
}


var texts = {
};

var sprites = {
    menucube1: null,
    menucube2: null
}


var stages = {
    menu: function () {
    },
    resetoldstagef: [],
    clear: function () {

        var cleararlength = stages.resetoldstagef.length;
        if(cleararlength > 0)
        {
            var i;
            for(i = 0; i < cleararlength; i++)
            {
                stages.resetoldstagef[i]();
            }

            stages.resetoldstagef = [];
        }
    },
    change: function (stage) {
        if(stage !== stages.stage)
        {
            // console.log(game.tweens._tweens)
            // console.log(game.tweens.remove)
            // console.log(stage)
            stages.clear();

            stages.stage = stage;

            if(stage === 'menu')
            {
                //показать логотип (название игры)
                texts.logo.x = game.world.centerX - 125;
                texts.logo.y = -100;

                stages.resetoldstagef.push(function () {
                    texts.logo.x = -1000;
                    texts.logo.y = -1000;
                    // console.log()
                });

                var logotween = game.add.tween(texts.logo).to( { y: game.world.centerY - 140 }, 1200, Phaser.Easing.Bounce.Out, true);

                logotween.onComplete.add(function () {


                    logotween = game.add.tween(texts.logo).to( { y:texts.logo.y+5}, 1200, Phaser.Easing.Linear.None, true)
                                    .to({ y: texts.logo.y-5 }, 1000, Phaser.Easing.Linear.None)
                                    .loop()
                                    .start();
                    // console.log(logotween)
                    stages.resetoldstagef.unshift(function () {
                        // console.log(game.tweens._tweens.indexOf(logotween));
                        logotween.pendingDelete = true;
                        game.tweens.remove(logotween);
                    });

                }, this)

                //куб опора
                var terraincube = sprites.menucube2;
                var tweetbutton = sprites.tweetbutton;
                // var facebookbutton = sprites.facebookbutton;
                
                if(!terraincube.body)
                {
                    console.log('terraincube enable p2');
                    game.physics.p2.enable(terraincube, false);
                    terraincube.body.kinematic = true;

                }
                
                terraincube.body.x = game.world.centerX;
                terraincube.body.y = game.world.height+10;



                stages.resetoldstagef.push(function () {
                    terraincube.body.x = -1000;
                    terraincube.body.y = -1000;

                    tweetbutton.x = -1000;
                    tweetbutton.y = -1000;

                    /*
                    facebookbutton.x = -1000;
                    facebookbutton.y = -1000;
                    */
                });

                var terraincubetween = game.add.tween(terraincube.body).to( { y: game.world.centerY+terraincube.height/4 }, 300, Phaser.Easing.Bounce.Out, true);

                terraincubetween.onComplete.add(function () {

                    terraincubetween.pendingDelete = true;
                    game.tweens.remove(terraincubetween);

                    if(!tweetbutton.inputEnabled)
                    {
                        tweetbutton.inputEnabled = true;

                        tweetbutton.events.onInputDown.add(function () {
                            social.tweet();
                        }, this);
                    }

                    /*
                    if(!facebookbutton.inputEnabled)
                    {
                        facebookbutton.inputEnabled = true;

                        facebookbutton.events.onInputDown.add(function () {
                            social.facebookme();
                        }, this);
                    }
                    */


                    tweetbutton.x = game.world.centerX;
                    tweetbutton.y = game.world.centerY+100;

                    /*
                    facebookbutton.x = game.world.centerX-25;
                    facebookbutton.y = game.world.centerY+100;
                    */


                    
                    texts.menuscoretext.text = 'score';
                    texts.menuscoretext.x = terraincube.x-texts.menuscoretext.width/2;
                    texts.menuscoretext.y = game.world.centerY-25;

                    texts.menuscore.text = player.lastscore;
                    texts.menuscore.x = terraincube.x-texts.menuscore.width/2;
                    texts.menuscore.y = game.world.centerY-3;

                    // alert(localStorage['bestscore'])

                    texts.menubestscoretext.text = 'best';
                    texts.menubestscoretext.x = terraincube.x-texts.menubestscoretext.width/2;
                    texts.menubestscoretext.y = game.world.centerY+20;

                    texts.menubestscore.text = (localStorage['bestscore']*1>0?localStorage['bestscore']*1:0);
                    texts.menubestscore.x = terraincube.x-texts.menubestscore.width/2;
                    texts.menubestscore.y = game.world.centerY+45;


                    if(localStorage['needanimatebestscoretext']*1 === 1)
                    {
                        localStorage['needanimatebestscoretext'] = 0;

                        var menubestscorealpha = texts.menubestscore.alpha;
                        // console.log(menubestscorescale)
                        var menubestscoretween1 = game.add.tween(texts.menubestscore).to( {alpha: menubestscorealpha*0.5}, 2000, Phaser.Easing.Linear.None, true);

                        menubestscoretween1.onComplete.add(function () {

                            menubestscoretween1.pendingDelete = true;
                            game.tweens.remove(menubestscoretween1);

                            var menubestscoretween2 = game.add.tween(texts.menubestscore).to( {alpha: menubestscorealpha}, 1000, Phaser.Easing.Linear.None, true);

                            menubestscoretween2.onComplete.add(function () {

                                menubestscoretween2.pendingDelete = true;
                                game.tweens.remove(menubestscoretween2);
                            });
                        });
                    }




                    //куб левого режима
                    var leftmodecube = sprites.menucube1;


                    if(!leftmodecube.body)
                    {
                        game.physics.p2.enable(leftmodecube, false);
                        leftmodecube.body.kinematic = true;
                        
                        leftmodecube.inputEnabled = true;

                        leftmodecube.events.onInputDown.add(function () {
                            console.log('deadmode on')
                            stages.change('deadmode');
                        }, this);
                    }
                    
                    leftmodecube.body.x = game.world.centerX-terraincube.width/2-leftmodecube.width*0.8-5;
                    leftmodecube.body.y = game.world.height+10;

                    stages.resetoldstagef.push(function () {

                        texts.menuscoretext.text = '';
                        texts.menuscoretext.x = -1000;
                        texts.menuscoretext.y = -1000;

                        texts.menuscore.text = '';
                        texts.menuscore.x = -1000;
                        texts.menuscore.y = -1000;

                        
                        texts.menubestscoretext.text = '';
                        texts.menubestscoretext.x = -1000;
                        texts.menubestscoretext.y = -1000;

                        texts.menubestscore.text = '';
                        texts.menubestscore.x = -1000;
                        texts.menubestscore.y = -1000;



                        // leftmodecube.destroy();
                        leftmodecube.body.x = game.world.width+500;
                        leftmodecube.body.y = game.world.height+500;
                    });

                    var leftmodecubetween = game.add.tween(leftmodecube.body).to( { y: game.world.centerY + terraincube.height*0.5 }, 300, Phaser.Easing.Bounce.Out, true);

                    leftmodecubetween.onComplete.add(function () {

                        leftmodecubetween.pendingDelete = true;
                        game.tweens.remove(leftmodecubetween);

                        leftmodecube.mode = 'dead';

                        var leftmodecubetweenloop = game.add.tween(leftmodecube.body).to( { y:leftmodecube.y+3}, 1200, Phaser.Easing.Linear.None, true)
                                        .to({ y: leftmodecube.y-3 }, 1000, Phaser.Easing.Linear.None)
                                        .loop()
                                        .start();

                        stages.resetoldstagef.push(function () {
                            // console.log(leftmodecubetween)
                            // console.log(game.tweens._tweens.indexOf(leftmodecubetween));
                            leftmodecubetweenloop.pendingDelete = true;
                            game.tweens.remove(leftmodecubetweenloop);
                        });

                        //куб правого режима
                        var rightmodecube = sprites.menucube3;
                        
                        if(!rightmodecube.body)
                        {
                            console.log('rightmodecube enable p2')
                            game.physics.p2.enable(rightmodecube, false);
                            rightmodecube.body.kinematic = true;
                        }
                        
                        rightmodecube.body.x = game.world.centerX+terraincube.width/2+leftmodecube.width*0.8+5;
                        rightmodecube.body.y = game.world.height+10;
                        rightmodecube.alpha = 0.5;

                        stages.resetoldstagef.push(function () {
                            // rightmodecube.destroy();
                            rightmodecube.body.x = game.world.width+500;
                            rightmodecube.body.y = game.world.height+500;
                        });

                        var rightmodecubetween = game.add.tween(rightmodecube.body).to( { y: game.world.centerY + terraincube.height*0.5 }, 200, Phaser.Easing.Bounce.Out, true);

                        rightmodecubetween.onComplete.add(function () {

                            rightmodecubetween.pendingDelete = true;
                            game.tweens.remove(rightmodecubetween);

                            var rightmodecubetweenloop = game.add.tween(rightmodecube.body).to( { y:rightmodecube.body.y+3}, 1200, Phaser.Easing.Linear.None, true)
                                            .to({ y: rightmodecube.body.y-3 }, 1000, Phaser.Easing.Linear.None)
                                            .loop()
                                            .start();

                            stages.resetoldstagef.push(function () {
                                rightmodecubetweenloop.pendingDelete = true;
                                game.tweens.remove(rightmodecubetweenloop);
                            });


                            //надпись SOON
                            texts.soon.x = rightmodecube.x-texts.soon.width/2;
                            texts.soon.y = rightmodecube.y-14;
                            texts.soon.alpha = 0.9;

                            stages.resetoldstagef.push(function () {
                                texts.soon.x = -1000;
                                texts.soon.y = -1000;
                            });


                            //куб игрока
                            player.sprite.x = game.world.centerX;
                            player.sprite.y = terraincube.y - terraincube.height/2 - player.sprite.height-15;
                            game.physics.p2.enable(player.sprite, false);

                            player.sprite.checkWorldBounds = true;
                            player.sprite.events.onOutOfBounds.add(player.spriteOut, this);

                            player.sprite.body.onBeginContact.add(player.spriteCollisionHandler, this);



                            //текст левого режима
                            texts.survival.x = -texts.survival.width;
                            texts.survival.y = leftmodecube.y-leftmodecube.height+2;
                            // texts.survival.bringToTop();

                            stages.resetoldstagef.push(function () {
                                texts.survival.x = -1000;
                                texts.survival.y = -1000;
                            });
                            
                            //определяем появление кнопки режима выживания
                            var survialtween = game.add.tween(texts.survival).to( { x: leftmodecube.x-texts.survival.width/2 }, 200, Phaser.Easing.Bounce.Out, true);

                            survialtween.onComplete.add(function () {

                                survialtween.pendingDelete = true;
                                game.tweens.remove(survialtween);

                                //текст правого режима
                                texts.levels.x = game.world.width+10;
                                texts.levels.y = rightmodecube.y-rightmodecube.height;
                                // texts.survival.bringToTop();

                                stages.resetoldstagef.push(function () {
                                    texts.levels.x = -1000;
                                    texts.levels.y = -1000;
                                });
                                
                                //определяем появление кнопки режима выживания
                                var levelstween = game.add.tween(texts.levels).to( { x: rightmodecube.x-texts.levels.width/2 }, 200, Phaser.Easing.Bounce.Out, true);

                                levelstween.onComplete.add(function () {

                                    levelstween.pendingDelete = true;
                                    game.tweens.remove(levelstween);


                                    sounds.menumusic.volume = 0;
                                    sounds.menumusic.play();
                                    
                                    var musictween = game.add.tween(sounds.menumusic).to( { volume: 1 }, 2000, Phaser.Easing.Linear.None, true);

                                    musictween.onComplete.add(function () {

                                        musictween.pendingDelete = true;
                                        game.tweens.remove(musictween);

                                        if(stages.stage !== 'menu')
                                        {
                                            sounds.menumusic.stop();
                                        }
                                    }, this);

                                    stages.resetoldstagef.push(function (){

                                        var musictween = game.add.tween(sounds.menumusic).to( { volume: 0 }, 1000, Phaser.Easing.Linear.None, true);

                                        musictween.onComplete.add(function () {

                                            musictween.pendingDelete = true;
                                            game.tweens.remove(musictween);

                                            sounds.menumusic.stop();
                                        }, this);
                                    });

                                    //покажем кнопки движения
                                    sprites.leftarrow.alpha = 0;
                                    sprites.leftarrow.x = 20;
                                    sprites.leftarrow.y = game.world.height - sprites.leftarrow.height*0.5-10;

                                    sprites.rightarrow.alpha = 0;
                                    sprites.rightarrow.x = game.world.width - 20;
                                    sprites.rightarrow.y = game.world.height - sprites.rightarrow.height*0.5-10;

                                    controls.rotate.blocked = false;

                                    //анимация их появления
                                    var leftarrowtween = game.add.tween(sprites.leftarrow).to( { alpha: 1 }, 800, Phaser.Easing.Bounce.Out, true);

                                    leftarrowtween.onComplete.add(function () {

                                        leftarrowtween.pendingDelete = true;
                                        game.tweens.remove(leftarrowtween);


                                        var rightarrowtween = game.add.tween(sprites.rightarrow).to( { alpha: 1 }, 400, Phaser.Easing.Bounce.Out, true);

                                        rightarrowtween.onComplete.add(function () {

                                            rightmodecubetween.pendingDelete = true;
                                            game.tweens.remove(rightmodecubetween);
                                        });



                                    }, this)


                                }, this);

                            }, this);


                        }, this);

                    }, this);
                }, this);
            }
            else if(stage === 'score')
            {
                
            }
            else if(stage === 'deadmode')
            {

                // console.log(player.sprite)
                // player.sprite.alive = false;

                player.score = 0;

                var playgamemusic = function () {

                    sounds.gamemusic.volume = 0;
                    sounds.gamemusic.play();
                    var musictween = game.add.tween(sounds.gamemusic).to( { volume: 1 }, 2000, Phaser.Easing.Linear.None, true);

                    musictween.onComplete.add(function () {

                        musictween.pendingDelete = true;
                        game.tweens.remove(musictween);

                        if(stages.stage !== 'deadmode')
                        {
                            musictween.pendingDelete = true;

                            sounds.gamemusic.stop();
                        }
                    }, this);
                };

                playgamemusic();


                texts.score.text = 0+'';
                texts.score.x = game.world.centerX-texts.score.width/2;
                texts.score.y = game.world.centerY-texts.score.height/2;

                stages.resetoldstagef.push(function (){

                    texts.score.text = '';

                    var musictween = game.add.tween(sounds.gamemusic).to( { volume: 0 }, 1000, Phaser.Easing.Linear.None, true);

                    musictween.onComplete.add(function () {

                        musictween.pendingDelete = true;
                        game.tweens.remove(musictween);

                        sounds.gamemusic.stop();

                        if(stages.stage === 'deadmode')
                        {
                            playgamemusic();
                        }
                    }, this);
                });
                

                /*
                sounds.gamemusic.play();

                stages.resetoldstagef.push(function (){
                    sounds.gamemusic.stop();
                });
                */


                cubes.show();
                stages.resetoldstagef.push(function () {
                    cubes.hide();
                });
            }
        }
    }
};

var controls = {
    cursors: null,
    rotate: {
        blocked: true,
        reset: function () {
            if(sprites.leftarrow && sprites.rightarrow && !controls.rotate.blocked)
            {
                sprites.leftarrow.scale.setTo(0.5, 0.5);
                sprites.rightarrow.scale.setTo(0.5, 0.5);
            }
        }
    }
}

var sounds = {
};

var cubes = {
    cubespeed: 70,
    out: function (cube) {

        //делаем проверку на необходимость впустить ещё куб, запускаем операцию добавления

        // cube.destroy();
        // console.log(cube.body.x)
        if(cube.body.x < game.world.centerX && cubes.showed)
        {
            // console.log('!')
            cube.kicked = false;

            var fromtop = false;
            // cube.body.x = game.world.centerX+game.world.centerY+cubes.size*cubes.scale;
            // cube.body.y = fromtop?-cubes.size*scale:(game.world.centerY*2+cubes.size*cubes.scale);

            var index = cubes.list.indexOf(cube);
            var nextindex = (cubes.list.length+index+1) % cubes.list.length;
            var previndex = (cubes.list.length+index-1) % cubes.list.length;
            // console.log(previndex+':'+index+':'+nextindex)
            cube.body.x = cubes.list[previndex].body.x+(cubes.list[nextindex].body.x-cube.body.x);
            cube.body.y = cubes.list[previndex].body.y+(cubes.list[nextindex].body.y-cube.body.y);

            // console.log()
            //получить кубик справа
            //вычислить разницу в расстояние
            //получить крайний правый
            //вычислить новую позицию

            // cube.body.x = cubes.spawnpos.x;
            // cube.body.y = cubes.spawnpos.y;

            // console.log(cube.body.x+':'+cube.body.y);

            cube.body.velocity.x = -cubes.speed;
            cube.body.velocity.y = -cubes.speed*(fromtop?-1:1);

            var dir = Math.random() > 0.4?1:-1;

            cube.body.rotateLeft(dir*player.score);
        };



        /*
        {
            cubes.lastcubeindex = (cubes.count+cube.i-1)%(cubes.count);

            var cubesgroup = cubes.group;
            var lastcube = cubesgroup.getAt(cubes.lastcubeindex);

            cube.reset(lastcube.body.x+cubes.cubesize-1, lastcube.body.y+cubes.cubesize-1);
            // cube.body.setRectangle(cubesize, cubesize);

            player.sprite.scale.setTo(1, 1);

            cube.body.velocity.x = -cubes.cubespeed;
            cube.body.velocity.y = -cubes.cubespeed;

            var dir = Math.random() > 0.4?1:-1;

            var rotspeed = stages.speed/350*Math.random()*stages.score/3;
            cube.body.rotateLeft(dir*rotspeed);

            cube.tint = cubes.tint.color;
            // console.log(cube)

            // cube.tint = Phaser.Color.RGBtoHexstring(Phaser.Color.getRandomColor(255-255*Math.abs(cube.body.angularVelocity), 255-255*Math.abs(cube.body.angularVelocity), 1));
        }
        */



    },
    scale: 0.25,
    size: 200,
    speed: 100,
    list: [],
    initsprites: function () {


        cubes.count = parseInt(game.world.height/(cubes.size*cubes.scale))+2;
        var i;

        // console.log(game.physics.p2.disable)

        for(i = 0; i < cubes.count; i++)
        {
            var scale = 0.25;
            var cube = game.add.sprite(-1000, -1000, 'whitecube200');
            cube.anchor.setTo(0.5, 0.5);
            cube.scale.setTo(scale, scale);

            game.physics.p2.enable(cube, false);
            cube.body.kinematic = true;
        
            cube.checkWorldBounds = true;
            cube.events.onOutOfBounds.add(cubes.out, this);

            cubes.list.push(cube);
        }

    },
    arrange: function () {
        var i;

        for(i=0;i<cubes.count; i++)
        {
            var fromtop = false;

            var cube = cubes.list[i];

            var offset = (game.world.height-(cubes.count-2)*cubes.size*cubes.scale)/(cubes.count-2);

            cube.body.x = offset+(game.world.centerX-game.world.centerY)+i*cubes.size*cubes.scale;
            cube.body.y = offset+(fromtop?-i*cubes.size*scale:(i*cubes.size*cubes.scale));


            // cube.body.x = game.world.centerX+game.world.centerY+cubes.size*cubes.scale;
            // cube.body.y = fromtop?-cubes.size*scale:(game.world.centerY*2+cubes.size*cubes.scale);

            cube.body.velocity.x = -cubes.speed;
            cube.body.velocity.y = -cubes.speed*(fromtop?-1:1);

            var dir = Math.random() > 0.4?1:-1;

            cube.body.rotateLeft(dir*player.score);
        };

        // console.log(cubes.list[cubes.list.length-1].body.x+':'+cubes.list[cubes.list.length-1].body.y);
        // console.log('last')

    },
    show: function () {


        cubes.arrange();
        cubes.showed = true;
        //расстановка кубов через функцию генератора

        /*
        game.physics.p2.gravity.y = 0;

        game.time.events.add(Phaser.Timer.SECOND*(game.world.height/cubes.speed), function () {
            game.physics.p2.gravity.y = 1500;
        }, this);

        cubes.loop = game.time.events.loop(Phaser.Timer.SECOND*0.5, cubes.generator.generate, this);
        */

    },
    hide: function () {
        // You can use emitter.on = false to toggle an emitter on/off.

        cubes.showed = false;

        var i;
        for(i=0;i<cubes.count; i++)
        {
            var cube = cubes.list[i];
            cube.body.x = -1000;
            cube.body.y = -1000;

            cube.body.velocity.x = 0;
            cube.body.velocity.y = 0;

            cube.body.rotateLeft(0);
        }
    }
}

/*var scoretext = {
    score:0,
    set: function(newscore)
    {
        texts.score.text = newscore;
        texts.score.x = game.world.centerX-texts.score.width/2;
        texts.score.y = game.world.centerY-texts.score.height/2;
    },
    show: function () {
        texts.score.alpha = 0.9;
        texts.score.text = 0;
    },
    hide: function () {
        texts.score.text = '';
    }
}*/

var player = {
    sprite:null,
    rotspeed:0,
    maxrotspeed: 400,
    score:0,
    lastscore: 0,
    reset: function () {
        player.sprite.scale.setTo(0.5,0.5);
        player.sprite.body.velocity.x = 0;
        player.sprite.body.velocity.y = 0;
        player.sprite.body.x = game.world.centerX;
        player.sprite.body.y = game.world.centerY-50;

        player.sprite.body.rotateLeft(0);
    },
    spriteOut: function () {

        if(/*player.alive && */(player.sprite.body.y < 0 || player.sprite.body.y > game.world.height || player.sprite.body.x > game.world.width || player.sprite.body.x < 0))
        {

            sounds.gameover.play();

            player.sprite.scale.setTo(10,10);


            if(stages.stage === 'menu')
            {
                game.time.events.add(Phaser.Timer.SECOND * 0.05, function () {
                    player.reset();
                }, this);
            }
            else if(stages.stage === 'deadmode')
            {

                game.time.events.add(Phaser.Timer.SECOND * 0.05, function () {
                    
                    player.reset();

                    stages.change('menu');
                }, this);
            }
        }
        else
        {
            // console.log('nokill')
            player.out = true;
        }
    },
    checkIfCanJump: function() {

        var yAxis = p2.vec2.fromValues(0, 1);
        var result = false;

        for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
        {
            var c = game.physics.p2.world.narrowphase.contactEquations[i];

            if (c.bodyA === player.sprite.body.data || c.bodyB === player.sprite.body.data)
            {
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                if (c.bodyA === player.sprite.body.data) d *= -1;
                if (d > 0.5) result = true;
            }
        }
        
        return result;

    },
    kickanimate: function () {
        
        //сжатие при ударе
        sounds.kick.play('kick');
        player.sprite.alpha = 0.1;

        game.time.events.add(Phaser.Timer.SECOND * 0.05, function () {
            player.sprite.alpha = 1;
        }, this);
    },
    spriteCollisionHandler: function (event) {

        var maxspritevelocity = Math.abs(player.sprite.body.velocity.x)>Math.abs(player.sprite.body.velocity.y)?Math.abs(player.sprite.body.velocity.x):Math.abs(player.sprite.body.velocity.y);
        // console.log(maxspritevelocity)
        if( maxspritevelocity > 200)
        {

            
            if(stages.stage === 'menu')
            {

                player.kickanimate();

                if(event.sprite.mode && event.sprite.mode === 'dead')
                {
                    player.reset();
                    stages.change(event.sprite.mode+'mode');
                }
            }
            else if(stages.stage === 'deadmode')
            {
                var cube = event.sprite;
                if(!cube.kicked)
                {
                    player.kickanimate();

                    cube.kicked = true;

                    cube.alpha = 0;
                    var cubetween = game.add.tween(cube).to( { alpha: 1 }, 2000, Phaser.Easing.Bounce.Out, true);

                    cubetween.onComplete.add(function () {

                        cubetween.pendingDelete = true;
                        game.tweens.remove(cubetween);
                    });

                    player.score += 1;
                    texts.score.text = player.score+'';
                    texts.score.x = game.world.centerX-texts.score.width/2;
                    texts.score.y = game.world.centerY-texts.score.height/2;


                    player.lastscore = player.score;

                    if(localStorage['bestscore']*1 < player.score || isNaN(localStorage['bestscore']*1))
                    {
                        localStorage['bestscore'] = player.score;

                        localStorage['needanimatebestscoretext'] = '1';

                        if(!texts.score.intween)
                        {
                            var alpha = texts.score.alpha;
                            texts.score.intween = true;
                            texts.score.alpha = alpha+0.05;
                            var scoretween = game.add.tween(texts.score).to( { alpha: alpha }, 2000, Phaser.Easing.Linear.None, true);

                            scoretween.onComplete.add(function () {

                                scoretween.pendingDelete = true;
                                game.tweens.remove(scoretween);

                                texts.score.intween = false;
                            });
                        }

                    }

                    // console.log('score: '+player.score)
                }
            }


            
        }
    }
}
/*

//define you region
var topLeftQuarter = new Phaser.Rectangle(0,0,game.width/2,game.height/2)

//listen for pointers
game.input.onDown.add(handlePointerDown)

//handle a touch/click
handlePointerDown = function(pointer){
    //this is the test, contains test for a point belonging to a rect definition
    var inside = topLeftQuarter.contains(pointer.x,pointer.y)
    //do whatever with the result
    console.log('pointer is inside region top left quarter', inside)
}

*/