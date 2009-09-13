//= require <oatlib-ui/reference>
//= require <dom/element>
//= require <dom/get_window_size>
//= require <dom/event/add_listener>
//= require <dom/set_dimensions>
//= require <dom/node>
//= require <curry>
//= require <each>
//= require <supplant>
//= require <last>
//= require <oatlib-ui/transition/transition>
//= require <oatlib-ui/transitions/sine_ease_in_out>
//= require <call_once>
//= require <map>
//= require <update>
//= require <dom/remove>

o.ui.chat = function (node) {

	
	var members = o.dom.element('members'),
	log = o.dom.element('log'),
	log_table = log.getElementsByTagName('TABLE')[0],
	input = document.getElementsByTagName('INPUT')[0];

	input.focus();

	var resize = function (e,oe) {
		var size = o.dom.get_window_size();
		o.dom.set_dimensions(node,size);
		[members,log][o.each](function (node) {
			node.style.height = (size.height - 60) + 'px';
		});
	};
	o.dom.event.add_listener(window,'resize',resize);
	resize();


	user_name = 'robert';
	var last_user_name,
	message_count = 0;

	var flash_input = function () {
		o.ui.transition({
			start: 100,
			end: 155,
			duration: 250,
			tween: o.ui.sine_ease_in_out,
			callback: function (v) {
				var color = 'rgb('+Math.floor(v)+',0,0)';
				input.style.backgroundColor = color;
			},
			on_complete: function () {
				o.ui.transition({
					start: 155,
					end: 100,
					duration: 150,
					tween: o.ui.sine_ease_in_out,
					callback: function (v) {
						var color = 'rgb('+Math.floor(v)+',0,0)';
						input.style.backgroundColor = color;
					},
					on_complete: function () {
						input.style.backgroundColor = '';
					}
				});
			}
		});
	};

	Function.prototype.markov = function () {
		var args = arguments,
		fn = args.callee,
		that = this;
		time_out = setTimeout(function () {
			fn.apply(that,args);
		},Math.random() * 9E3);
		this.apply(this,arguments[Math.floor(Math.random()*arguments.length)]);
		return clearTimeout[o.curry](time_out);
	};

	var new_line = function (user_name,message) {
		var same_as_last = last_user_name === user_name;
		!same_as_last && (message_count+=1);
		log_table.innerHTML += '<tr class="{same_as_last} {odd}"><th class="user-name">{user_name}</th><td class="message">{message}</td></tr>'[o.supplant]({
			message: message,
			user_name: !same_as_last ? user_name + ':' : '',
			same_as_last: same_as_last ? 'same-as-last' : '',
			odd: message_count % 2 ? 'odd' : ''
		});
		last_user_name = user_name;
		input.value = '';
		input.focus();
		flash_input();
		o.last(log_table.childNodes).scrollIntoView();
	};


	o.dom.event.add_listener(document,'keydown',function (e,oe) {
		var key = oe.get_key().key;
		if (oe.get_key().key === 13) {
			new_line('robert',input.value);

		}
	});


	var get_message = (function () {

		var async_callback,
		messages = [],
		script,
		base_url = 'http://search.twitter.com/search.json',
		url = base_url + '?q=sleep&callback=jsonp',
		get_more = function (callback) {
			async_callback = callback;
			script = document.createElement('script'),
			document.body.appendChild(script);
			script.src = url;
		};



		jsonp = function (response) {
			o.dom.remove(script);
			script = undefined;
			messages[o.update](messages.concat(response.results[o.map](function (result) {
				return [result.from_user,result.text];
			})));
			url = base_url + response.next_page + '&callback=jsonp';
			async_callback && async_callback.apply(null,messages.shift());
			async_callback = null;
		};

		return function (callback) {
			if (messages.length) {
				callback.apply(null,messages.shift());
			} else {
				get_more(callback);
			}
		}
	})();

	var get_it = function () {
		var fn = arguments.callee;
		get_message(function () {
			new_line.apply(this,arguments);
			setTimeout(fn,Math.random()*9E3);
		});
	};
	get_it();

};

o.ui.chat(o.dom.element('chat'));
