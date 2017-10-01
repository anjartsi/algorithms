class Person {
	constructor(i, n) {
		this.preference = [];
		for(let ii = 0; ii < n; ii++)  {
			this.preference.push(ii);
		}


	}

	setPreference(arr) {
		this.preference = arr;
	}

}

class Man extends Person {
	constructor(i, n) {
		super(i, n);
		// console.log("New man created!");
	}
}

class Woman extends Person {
	constructor(i, n) {
		super(i, n);
		// console.log("New woman created!");
	}

}

class StableMarriage {
	constructor(n) {
		this.men = [];
		this.women = [];

		for(let i = 0; i < n; i++) {
			this.men.push(new Man(i, n));
			this.women.push(new Woman(i, n));
		}
	}
}

let a = new StableMarriage(3);
a.men[1].setPreference([1, 2, 0]);
console.log(a);
