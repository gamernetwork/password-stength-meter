var PasswordStrength = function(args) {

	this.input = jQuery(args.input);
	this.output = jQuery(args.output);
	this.output.hide();
	this.zxcvbn = args.zxcvbn || "https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js";

	jQuery.getScript(this.zxcvbn);

	this.output.css({
		display: "block",
		clear: "both"
	});

	this.listen = function() {
		this.input.on("keyup", this.run.bind(this));
	};

	this.run = function() {

		if(!window.zxcvbn) return;

		var strength = zxcvbn(this.input.val());
		var score = strength.score;
		var message = "";

		switch(score) {
			case 0:
			case 1:
				var message = "Very Weak";
				var colour = "red";
			break;

			case 2:
				var message = "Weak";
				var colour = "orange";
			break;

			case 3:
				var message = "Fairly strong";
				var colour = "blue";
			break;

			case 4:
				var message = "Strong";
				var colour = "green";
			break;
		}

		this.output.html("Password strength: <span>" + message + "</span>");
		this.output.css({
			color: colour
		});
	};

	this.listen();
	this.run();
};