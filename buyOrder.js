/*
The point of this program is to help you pick which card to choose to buy, in the game Dominion-Intrigue: a Duke or a Duchy. 
There are 12 of each, and they cost the same amount to buy. 
A Duchy is worth three points. A Duke is worth one point for each Duchy you have already bought.

There are many other factors in the game, but lets isolate these two cards for the purposes of knowing which order to buy them in.
This is difficult to do, because their values change depending on each other.

The first 3 times, you should buy a duchy, as they guarantee 3 points. On the 4th turn, its a push (both worth 3), so you can buy either. 
Assuming in that turn, you decided to buy a 4th duchy, the next turn, dukes are now worth 4 - one more that a duchy.
After you buy your first Duke, you may consider only buying dukes since they are worth 4 each and duchies are only worth 3, BUT: 
Consider that buying a 5th Duchy on the 6th turn makes the Duke you already have worth 5, plus the 3 it adds - so it has also contributed 4, same as the duke. 
The next turn, dukes are worth 5 but another duchy would only be worth 3+1 (because of the one Duke).

The problem is that you need to know how to optimize the total number of points you have by buying in the correct order. If you buy all of both piles of cards, it costs the same and nets the same result.
However, the game can be ended before that happens, so its best to optimize each turn. 

In order to do that, you need to keep track of how many you have of each and how much the next choice of each type will contribute.
Theoretically, you could do try to remember the cards you have and do the math each time, but the goal is to identify an ideal buying pattern so you can focus on the rest of the game.
This program should output that pattern into the Console.
*/


var duke = 0, //Start with 0 dukes - they are worth 1 point for each duchy you have
		duchy = 0, //Start with 0 duchys - they are worth 3 points each
		dukeLeft = 12, //Pile has 12 dukes
		duchyLeft = 12, //Pile has 12 duchys
		dukeSingleVal = 0, //Point value of a duke if you bought one now
		duchySingleVal = 3, //Point value of a duchy if you bought one now
		nextDukePoints= 0, //Point value added by the next duke you buy (this changes depending on the current number of Duchies)
		nextDuchyPoints= 3; //Point value added by the next duchy you buy (this is 3 each time, until you have dukes which are also affected)

function currentValue(){ //This decides how many points each card is worth to you
	nextDuchyPoints = 3+(duke); //The next duchy gives you its 3, also making each Duke you have worth 1 more point
	dukeSingleVal = nextDukePoints = duchy; //The next duke you buy as well as any current ones are always worth the same => the number of Duchys
};

function showTotals(){ //This gives you a summary to see how much your cards are worth
	currentValue(); //This part is needed to make sure the current values are updated.
	console.log ("Duchys: "+duchy); //Show how many Duchys you have currently
	console.log ("Duchys Point Value: "+duchy*duchySingleVal); //Show how many points your Duchys are worth
	console.log ("Dukes: "+duke); //Show how many Dukes you have currently
	console.log ("Dukes Point Value: "+duke*dukeSingleVal); //Show how many points your Dukes are worth
	console.log ("Total: "+(duke*dukeSingleVal+duchy*duchySingleVal)); //Show how many points your cards are worth overall
};

function buyDuchy(){ //Adds a Duchy to your cards, removes it from the pile, annouces the transaction, and shows the point summary
	duchy++;
	duchyLeft--;
	console.log ("---------Teach me, TEACHME how to duchy---------");
	showTotals();
};

function buyDuke(){ //Adds a Duke to your cards, removes it from the pile, annouces the transaction, and shows the point summary
	duke++;
	dukeLeft--;	
	console.log ("---------Buy a duke-----------------------------");
	showTotals();
};

while((dukeLeft+duchyLeft)>0){
	currentValue(); //finds out how much each would be worth if picked next
	if(dukeLeft===0) { //makes sure to only buy Duchys when the dukes run out
		buyDuchy();
	}
	else if(duchyLeft===0){ //makes sure to only buy Dukes when the duchys run out
		buyDuke();
	}
	else if(nextDuchyPoints > nextDukePoints) { //Picks which one is more valuable based on how much each would change your point total
		buyDuchy();
	}
	else{
		buyDuke();
	};
};
console.log ("No more to buy"); //When there are no cards left to buy, the program ends.