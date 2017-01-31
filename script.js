function Map(){
	var self = this;
	
	self.levelPosition = function( level, choice ){
		var left = 0;
		var top = 0;
		
		switch( level ){
			case 0:
				return {
					x: 410,
					y: 406,
				}
			case 1:
				switch( choice ){
					case 1:
						return {
							x: 401,
							y: 310,
						}
					case 2:
						return {
							x: 356,
							y: 384,
							
						}
					case 3:
						return {
							x: 395,
							y: 463,
							
						}
					
				}

				break;
			case 2:
				switch( choice ){
					case 1:
						return {
							x: 381,
							y: 211,
							
						}
					case 2:
						return {
							x: 352,
							y: 259,
							
						}
					case 3:
						return {
							x: 234,
							y: 403,
							
						}
					case 4:
						return {
							x: 197,
							y: 452,
							
						}
					
				}
				break;
			case 3:
				switch( choice ){
					case 1:
						return {
							x: 277,
							y: 207,
							
						}
					case 2:
						return {
							x: 215,
							y: 269,
							
						}
					case 3:
						return {
							x: 159,
							y: 329,
							
						}
					case 4:
						return {
							x: 120,
							y: 392,
							
						}
					case 5:
						return {
							x: 90,
							y: 472,
							
						}
					
				}
				break;
			case 4:
				switch( choice ){
					case 1:
						return {
							x: 619,
							y: 213,
							
						}
					case 2:
						return {
							x: 106,
							y: 268,
							
						}
					case 3:
						return {
							x: 60,
							y: 351,
							
						}
					
				}

				break;
			case 5:
				return {
					x: 30,
					y: 238,
					
				}
			
		}
	}
	
	
	
	// init
	self.$el = document.createElement('div');
	self.$el.classList.add('map');
}


function Faeze(){
	var self = this;
	self.go = function(position){
		self.$el.style.left = (position.x - 27) +'px';
		self.$el.style.top = (position.y - 75)+'px';
	}
	self.level = 0;
	self.ask = function(map, question, callback){
		var $el = document.createElement('div');
		$el.classList.add('question');
		$el.innerHTML = question.body;
		
		var $choice;
		for( var i = 0; i < question.choices.length; i++ ){
			$choice = document.createElement('div');
			$choice.classList.add('choice');
			$choice.setAttribute('choice', i+1);
			$choice.innerHTML = question.choices[i];
			$el.appendChild($choice);
			$choice.onclick = function(){
				var answer = parseInt( this.getAttribute('choice') );
				$el.remove();
				callback(answer, (function(){
					var random = Math.random();
					console.log(random)
					if (random > 0.3){
						return true;
					}else{
						return false;
					}
				})());
			}
		}
		map.$el.appendChild($el);
		

	}
	self.fcked = function(map, start){
		self.$el.classList.add('fcked');
		self.ask(map, 	{
			body: 'متاسفانه فائزه  مورد تجاوز واقع شد. آیا میخواهید ادامه دهید؟',
			choices: ['بله', 'خیر'],
			rightAnswer: 1
		}, function(answer, isTrue){
			if( isTrue ){
				start();
			}
		});
	}
	self.ended = function(){
		setTimeout(function(){
			self.go( map.levelPosition(5) );
			self.$el.classList.add('ended');
		}, 750 );
	}
	self.reset = function(map){
		self.$el.classList.remove('ended');
		self.$el.classList.remove('fcked');
		self.go( map.levelPosition(0) );
	}
	
	
	// init
	self.$el = document.createElement('div');
	self.$el.classList.add('faeze');
}


var map = new Map();
document.body.appendChild( map.$el );

var faeze = new Faeze();
map.$el.appendChild( faeze.$el );




var questions = [
	{
		body: 'فائزه در یک کشور آزاد زندگی میکنه و خودش حق انتخاب پوشش رو داره. در این کشور نسبتا سلامت روانی حاکمه یعنی احتمال اینکه در یک رابطه مورد آزار قرار بگیره خیلی کمه ولی برای اینکه بازی هیجان داشته باشه در ۳۰ درصد مواقع احتمال آزار وجود داره. بنابراین فائزه برای رفتن به خونه خیلی نگران نیست و با خیال راحت و آزادانه مسیرش رو انتخاب میکنه.<br>الان باید از رو کدوم پل برم؟ :)',
		choices: ['دوست پدر', 'عمو', 'پسردایی پدر'],
		
	},
	{
		body: 'خب خدا رو شکر. رد شدم و کسی بهم تجاوز نکرد. الان از رو کی رد شم؟',
		choices: ['پسر خواهر', 'داماد عمو', 'پسرعموی مادر', 'شوهر خاله'],
	
	},
	{
		body: 'بازم خدا رو صد هزار مرتبه شکر که هنوز تمبون تنمه. حالا از کی رد شم؟',
		choices: ['شوهرعمه', 'پدربزرگ', 'دوست عمو', 'مغازه دار', 'پسر عمو'],
		
	},
	{
		body: 'آخ جون ^_^ از رو اینم رد شم دیگه کار تمومه. از رو کی برم؟',
		choices: ['دوست برادر', 'پسر برادر', 'شوهر خواهر'],
		
	}
]




function start(){
	faeze.reset(map);
	faeze.ask(map, questions[0], function(answer, isTrue){
		faeze.go( map.levelPosition(1, answer) );
		if( isTrue ){
			faeze.ask(map, questions[1], function(answer, isTrue){
				faeze.go( map.levelPosition(2, answer) );
				if( isTrue ){
					faeze.ask(map, questions[2], function(answer, isTrue){
						faeze.go( map.levelPosition(3, answer) );
						if( isTrue ){
							faeze.ask(map, questions[3], function(answer, isTrue){
								faeze.go( map.levelPosition(4, answer) );
								if( isTrue ){
									faeze.ended();
								}
								else{
									faeze.fcked(map, start);
								}
							});
						}
						else{
							faeze.fcked(map, start);
						}
					});
			
				}
				else{
					faeze.fcked(map, start);
				}
			});

		}
		else{
			faeze.fcked(map, start);
		}
	});
}
start();
