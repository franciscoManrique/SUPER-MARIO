window.onload = function(){
    var canvas = document.getElementById('canvas');
    var songIntro = new Audio();
    songIntro.src = 'music/intro.mp3';
    
    
    $('.fondoModal').fadeIn(1100);
    
    $('.background0').click(function(){
        songIntro.play();
        $('.fondoModal').fadeOut(800);
        $('.hero').fadeOut(500, function(){
            var game = new Game(canvas, songIntro, 'img/backgrounds/background_0.png', 'easy').start();
        });
    });
    
    $('.background1').click(function(){
        songIntro.play();
        $('.fondoModal').fadeOut(800);
        $('.hero').fadeOut(500, function(){
            var game = new Game(canvas, songIntro, 'img/backgrounds/background_1.png', 'hard').start();
        });
    }); 
    
    $('.background2').click(function(){
        songIntro.play();
        $('.fondoModal').fadeOut(800);
        $('.hero').fadeOut(500, function(){
            var game = new Game(canvas, songIntro, 'img/backgrounds/background_2.png', 'extreme').start();
        });
    }); 
    
    $('.reStart').click(function(){
        location.reload();
    });
    
    //TYPED PLUGIN
    var typed = new Typed(".word", options = {
        strings: ["", "You can collect hearts", "GOOD LUCK !!!"],
        typeSpeed: 20,
        backSpeed: 20,
        // shuffle: true,
        loop: true
    });
};


