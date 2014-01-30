;(function($,window,document,undefined) {
	$.fn.Game = function(options) {
		var defaultSettings = {
			choices:['Rock','Paper','Scissors','Lizard','Spock'],
			results:[
				[2,1,'Cuts'],
				[1,0,'Covers'],
				[0,3,'Crushes'],
				[3,4,'Poisons'],
				[4,2,'Smashes'],
				[2,3,'Decapitates'],
				[3,1,'Eats'],
				[1,4,'Disproves'],
				[4,0,'Vaporizes'],
				[0,2,'Crushes']
			]
		};
		var settings = $.extend(defaultSettings,options);
		return this.each(function(){
			var game = $(this);
			game.append('<ul id="Options" /><div class="Results"><div id="UserChoice" /><div id="ComputerChoice" /><div id="Reason" /><div id="Winner" /></div>');
			for(i=0;i<settings.choices.length;i++){
				game.children('#Options').append('<li>'+settings.choices[i]+'</li>');
			}
			game.find('#Options li').click(function(){
				game.find('#UserChoice, #ComputerChoice, #Reason, #Winner').stop().removeAttr('style').removeAttr('class').html('');
				var compChoice = Math.floor( Math.random() * settings.choices.length );
				var userChoice = $(this).index();
				var finalResult = '';
				var reason = '';
				if(compChoice === userChoice){ finalResult = 'Draw'; }
				else {
					for(i=0;i<settings.results.length;i++){
						resultsWinner = settings.results[i][0];
						resultsLoser = settings.results[i][1];
						resultsText = settings.choices[resultsWinner]+' '+settings.results[i][2]+' '+settings.choices[resultsLoser];
						if(userChoice === resultsWinner && compChoice === resultsLoser){ finalResult = 'You Win'; reason = resultsText; }
						else if(userChoice === resultsLoser && compChoice === resultsWinner){ finalResult = 'You Lose'; reason = resultsText;  }
					}
				}
// 				for(i=0;i<settings.choices.length;i++){
// 					setTimeout(function(){
// 						game.find('#UserChoice, #ComputerChoice').stop().removeAttr('style').html(settings.choices[i]).animate({'opacity':1});
// 						game.find('#UserChoice').addClass(settings.choices[userChoice]);
// 						game.find('#ComputerChoice').addClass(settings.choices[compChoice]);
// 					},500);
// 				}
				setTimeout(function(){
					game.find('.Results').fadeIn();
					game.find('#UserChoice').stop().removeAttr('style').addClass(settings.choices[userChoice]).html(settings.choices[userChoice]).animate({'opacity':1});
					game.find('#ComputerChoice').stop().removeAttr('style').addClass(settings.choices[compChoice]).html(settings.choices[compChoice]).animate({'opacity':1});
					game.find('#Reason').stop().removeAttr('style').delay(1000).html(reason).animate({'opacity':1});
					game.find('#Winner').stop().removeAttr('style').delay(1500).html(finalResult).animate({'opacity':1});
				},25);
			});
		});
	};
})( jQuery );