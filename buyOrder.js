/*
** Object-Oriented DuchyDuke
**		by Arnaud Rouyer
**
** Usage:
**	> var dd = new DuchyDuke(dukeStack, duchyStack);
**	> dd.run(limit);
**
**
** Arguments
**	> dukeStack and duchyStack respectively represent the starting quantities of dukes and duchy. Default is 12 each.
**
**	> limit is explained with specific examples in the next paragraphs.
**
**
** Specific changes:
**	> The object is built from a function. In JavaScript, all functions are objects.
**	  Objects can be assigned new properties (variables) and methods (functions) at runtime.
**
**	> Arguments. The function/object DuchyDuke can be called with arguments.
**	  As they are non-mandatory (opposing C's behavious), we have to check their existence first.
**
**	> Ternaries. Ternaries everywhere. I just love ternaries.
**	  Reminder about ternaries: ((exp a) ? (if a==true) : (else));
**
**	> Some code refactoring around the two "buy" functions. Plus a friendly turn-counter.
**
**	> The ending ternary-inception was just to mess your brain up. Never do this at home.
**
**	> Created a run() method. Thus, the code is now be run through:
**		> var dd = new DuchyDuke(42,24);	//No execution
**		> dd.run();							//Execution and output
**
**	> Going with the run(), limiting the number of iterations through run()'s argument.
**		> var dd = new DuchyDuke(42,24);	//No execution
**		> dd.run(3);						//Execution and output for only three iterations
**
**	> Going further down the run() madness, using a negative argument will mute the first rows.
**		> var dd = new DuchyDuke(2,2);		//No execution
**		> dd.run(-3);						//Will only output the last iteration
**
**	> The run() command returns a string with "(turn):(Duchy/Duke)_" for each iteration.
**
**/

function DuchyDuke(dukeStack, duchyStack)
{
	this.checkArgs = function(a, b) { return ((typeof a != 'undefined') ? a : b); }

	this.limit				= 'undefined';
	this.turn				= 1;
	this.duke				= 0;
	this.duchy				= 0;
	this.dukeLeft			= this.checkArgs(dukeStack,12);
	this.duchyLeft			= this.checkArgs(duchyStack, 12);
	this.dukeSingleVal		= 0;
	this.duchySingleVal		= 0;
	this.nextDukePoints		= 0;
	this.nextDuchyPoints	= 0;
	this.messageDuke		= '---------Buy a duke-----------------------------';
	this.messageDuchy		= '---------Teach me, TEACHME how to duchy---------';
	this.answer				= '';

	this.showLogs = function(du) {
		console.log('---------TURN '+this.turn);
		console.log((du == 'duchy') ? this.messageDuchy : this.messageDuke);
		console.log ("Duchys: "+this.duchy);
		console.log ("Duchys Point Value: "+this.duchy*this.duchySingleVal);
		console.log ("Dukes: "+this.duke);
		console.log ("Dukes Point Value: "+this.duke*this.dukeSingleVal);
		console.log ("Total: "+(this.duke*this.dukeSingleVal+this.duchy*this.duchySingleVal));
	};
	
	this.buy = function(du) {
		if (du == 'duchy') {
			this.duchy++;
			this.duchyLeft--;
		} else if (du == 'duke') {
			this.duke++;
			this.dukeLeft--;
		}
		this.answer += this.turn + ':' + ((du == 'duchy') ? 'Duchy' : 'Duke') + '_';
		this.nextDuchyPoints = 3 + (this.duke);
		this.dukeSingleVal = this.nextDukePoints = this.duchy;
		if (!(this.limit < 0)) {
			this.showLogs(du);
		}
		this.turn++;
	};
	
	this.run = function(limit) {
		this.limit = limit;
		while ((this.dukeLeft+this.duchyLeft) > 0) {
			this.currentValue();
			this.buy((this.dukeLeft == 0) ? 'duchy' :
					 (this.duchyLeft == 0) ? 'duke' :
					 (this.nextDuchyPoints > this.nextDukePoints) ? 'duchy' :
					 'duke');
			if (this.limit < 0) {
				if (this.limit == -1) {
					this.limit = 'undefined';
				} else {
					this.limit++;
				}
			} else if ((this.limit > 0) && (this.limit < this.turn)) {
				console.log('Limit iteration '+this.limit+' reached. Now ending...');
				return(this.answer);
			}
		};
		console.log ("THE END! No more to buy!");
		return(this.answer);
	};
};
