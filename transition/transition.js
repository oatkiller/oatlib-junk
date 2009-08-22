//= require <oatlib-ui/reference>
//= require <dom/set_interval>
//= require <dom/clear_interval>
//= require <each>
//= require <filter>
//= require <call>
//= require <splice>
//= require <oatlib-ui/transitions/sine_ease_in_out>

(function () {
	var interval,
	wait = 1E3 / 32,
	things_to_tick = [],
	stop_interval_if_needed = function () {
		// if there are no items in 'things_to_tick', clear the interval stored in 'interval'. also set interval to null
		if (!things_to_tick.length) {
			o.dom.clear_interval(interval);
			interval = null;
		}
	},
	add_thing_to_tick = function (thing) {
		// push thing to the end of the 'things_to_tick' array
		// run 'start_interval'
		things_to_tick.push(thing);
		start_interval();
	},
	tick = function () {
		// run 'stop_interval_if_needed'
		// reset 'things_to_tick' to the result of a filter of 'things_to_tick'
		// the filter should run call
		Array.prototype.splice.apply(things_to_tick,[0,things_to_tick.length].concat(things_to_tick[o.filter](o.call)));
		stop_interval_if_needed();
	},
	start_interval = function () {
		// if the interval isnt already started, start it
		// save the interval to 'interval'
		// set the interval to use the time specified in 'wait'
		return !interval && (interval = o.dom.set_interval(tick,wait));
	};

	o.ui.transition = function (data) {
		// calculate b as the start property of data
		// calculate c as the difference of the end property of data and b
		// calculate d as the duration property of data
		// calculate start as the current time in milliseconds
		// calculate end as start summed with d
		// store a local reference to data.tween and data.callback as tween and callback, and on_complete
		// run add_thing_to_tick passing a function 
		var b = data.start,
		c = data.end - b,
		d = data.duration,
	 	start = new Date().getTime(),
		end = start + d,
		tween = data.tween || o.ui.transitions.sine_ease_in_out,
		on_complete = data.on_complete,
		callback = data.callback,
		on_start = data.on_start;
		add_thing_to_tick(function () {
			// calculate time as the current time
			// if time is greater than or equal to end, run the callback with the final value (calculated as begin + change)
			// run the on_complete property if it exists
			// return false
			// if time is less than end, run callback with the result of tween, passing it the time passed so far (calculated as time - start), b, c, and d
			// return true
			var time = new Date().getTime();
			on_start && (on_start() && (on_start = false));

			if (time >= end) {
				callback(b + c);
				on_complete && on_complete();
				return false;
			} else {
				callback(tween(time - start, b, c, d));
				return true;
			}
		});
	};

})();
