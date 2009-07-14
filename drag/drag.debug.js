(function () {
var $$_qname, $$_store, $toString = 'toString', $$_dom, $dom = 'dom', $$_dom_clear_interval, $clear_interval = 'clear_interval', $$window = window, $clearInterval = 'clearInterval', $$_language_prototypes_array, $$Array = Array, $prototype = 'prototype', $$_slice, $slice = 'slice', $$_array, $array = 'array', $apply = 'apply', $$_language_prototypes_function, $$Function = Function, $$_o$bind, $bind = 'bind', $call = 'call', $concat = 'concat', $$_o$curry, $curry = 'curry', $$null = null, $$_take, $take = 'take', $$_K, $length = 'length', $push = 'push', $$_o$filter, $filter = 'filter', $$_filter, $$_dom_event, $event = 'event', $attachEvent = 'attachEvent', $detachEvent = 'detachEvent', $on = 'on', $addEventListener = 'addEventListener', $removeEventListener = 'removeEventListener', $$_dom_event_register, $register = 'register', $$_dom_event_add_handler, $add_handler = 'add_handler', $$true = true, $$_dom_event_remove_handler, $remove_handler = 'remove_handler', $$false = false, $$_o$each, $each = 'each', $$_dom_event_events_to_remove, $events_to_remove = 'events_to_remove', $unload = 'unload', $$_o$inject, $inject = 'inject', $$_inject, $$_combine, $combine = 'combine', $hasOwnProperty = 'hasOwnProperty', $$_super_combine, $super_combine = 'super_combine', $$_constructor, $constructor = 'constructor', $$_injector, $injector = 'injector', $$_builder, $builder = 'builder', $$_get_object_property, $get_object_property = 'get_object_property', $$_concat, $$_o$rcurry, $rcurry = 'rcurry', $$_dom_event_get_event, $get_event = 'get_event', $which = 'which', $right = 'right', $left = 'left', $button = 'button', $$_dom_event_get_button, $get_button = 'get_button', $$_dom_event_get_key, $get_key = 'get_key', $character = 'character', $$String = String, $fromCharCode = 'fromCharCode', $key = 'key', $keyCode = 'keyCode', $$_dom_event_get_mouse_coordinates, $get_mouse_coordinates = 'get_mouse_coordinates', $pageX = 'pageX', $pageY = 'pageY', $$document = document, $body = 'body', $documentElement = 'documentElement', $clientX = 'clientX', $scrollLeft = 'scrollLeft', $clientY = 'clientY', $scrollTop = 'scrollTop', $relatedTarget = 'relatedTarget', $callee = 'callee', $get_related_mouseover_target = 'get_related_mouseover_target', $fromElement = 'fromElement', $get_related_mouseout_target = 'get_related_mouseout_target', $toElement = 'toElement', $$_dom_event_get_related_mouseover_target, $$_dom_event_get_related_mouseout_target, $nodeType = 'nodeType', $parentNode = 'parentNode', $target = 'target', $srcElement = 'srcElement', $$_dom_event_get_target, $get_target = 'get_target', $$_dom_event_prevent_default, $prevent_default = 'prevent_default', $preventDefault = 'preventDefault', $returnValue = 'returnValue', $$_dom_event_cancel, $cancel = 'cancel', $stopPropagation = 'stopPropagation', $cancelBubble = 'cancelBubble', $$_dom_event_get_related_target, $$_dom_event_get_abstraction, $get_abstraction = 'get_abstraction', $$_splice, $splice = 'splice', $$_dom_event_add_listener, $add_listener = 'add_listener', $$_dom_contains, $contains = 'contains', $compareDocumentPosition = 'compareDocumentPosition', $filter_delegates_by_descendant = 'filter_delegates_by_descendant', $ancestor = 'ancestor', $consider_delegates_for_node = 'consider_delegates_for_node', $test = 'test', $delegate_target = 'delegate_target', $action = 'action', $delegates = 'delegates', $delegate_handler = 'delegate_handler', $add_delegate_handler_by_type = 'add_delegate_handler_by_type', $get_or_create_array_of_delegates_by_type = 'get_or_create_array_of_delegates_by_type', $$_dom_event_delegate, $delegate = 'delegate', $type = 'type', $$_dom_find_node_position, $find_node_position = 'find_node_position', $offsetParent = 'offsetParent', $offsetLeft = 'offsetLeft', $offsetTop = 'offsetTop', $$_dom_get_node_style, $get_node_style = 'get_node_style', $currentStyle = 'currentStyle', $defaultView = 'defaultView', $getComputedStyle = 'getComputedStyle', $getPropertyValue = 'getPropertyValue', $$_join, $join = 'join', $$_o$memoize, $memoize = 'memoize', $$_memoize, $$_regex, $regex = 'regex', $$RegExp = RegExp, $$_string, $string = 'string', $$_dom_class_name_test_regex, $$_dom_has_class_name, $has_class_name = 'has_class_name', $className = 'className', $$_dom_set_interval, $set_interval = 'set_interval', $setInterval = 'setInterval', $$_empty_function, $replace = 'replace', $$parseFloat = parseFloat, $mouseup = 'mouseup', $mouse_coordinates = 'mouse_coordinates', $style = 'style', $zIndex = 'zIndex', $position = 'position', $static = 'static', $relative = 'relative', $top = 'top', $mousemove = 'mousemove', $x = 'x', $y = 'y', $mousedown = 'mousedown', $draggable = 'draggable', emptyString = '';
var namespace = 'http://oatlab.com/oatlib/v2',
qname_prefix = namespace + ':::',
o,
emptyArray = [];


$$_qname = function (name) {
	return qname_prefix + name;
};
$$_store = function (obj,name,payload) {
	var qname = $$_qname(name);
	obj[qname] = payload;
	return (o[name] = qname);
};
this[namespace] = o = {};
o[$toString] = function () {
	return namespace;
};
$$_dom = o[$dom] = {};
$$_dom_clear_interval = $$_dom[$clear_interval] = function (payload) {
	return $$window[$clearInterval](payload);
};
$$_language_prototypes_array = $$Array[$prototype];
$$_slice = $$_language_prototypes_array[$slice];
$$_array = o[$array] = function (arrayLike) {
	return $$_slice[$apply](arrayLike);
};
$$_language_prototypes_function = $$Function[$prototype];
$$_o$bind = $$_store($$_language_prototypes_function,$bind,function (obj) { // holds the logic for curry
	var that = this,
	oldArguments = $$_slice[$call](arguments,1);
	return function () {
		return that[$apply](obj,oldArguments[$concat]($$_array(arguments)));
	};
});
$$_o$curry = $$_store($$_language_prototypes_function,$curry,function () {
	return this[$$_o$bind][$apply](this,[$$null][$concat]($$_array(arguments)));
});
$$_take = o[$take] = function (fn) {
	return function () {
		return fn[$apply](arguments[0],$$_slice[$call](arguments,1));
	};
};
$$_K = function (e) {return e;};
(function () {
	var fn = function (fn) {
		var length = this[$length], i = 0, results = [], an;
		for (; i < length; i++) {
			an = this[i];
			if (fn[$call](this,an,this)) {
				results[$push](an);
			}
		}
		return results;
	};

	$$_o$filter = $$_store($$_language_prototypes_array,$filter,fn);
	$$_filter = o[$filter] = $$_take(fn);
	$$_filter[$toString] = $$_K[$$_o$curry]($$_o$filter);

})();
$$_dom_event = $$_dom[$event] = {};
(function () {
 	var fn = function (add,node) {
		if (node[$attachEvent]) {
			add_property_name = $attachEvent;
			remove_property_name = $detachEvent;
			prefix = $on;
		} else {
			add_property_name = $addEventListener;
			remove_property_name = $removeEventListener;
		}
		return (fn = $$_dom_event_register = $$_dom_event[$register] = function (add,node,type,fn,bubble) {
			return node[add ? add_property_name : remove_property_name](prefix + type,fn,bubble);
		})[$apply](this,arguments);
	},
	add_property_name,
	remove_property_name,
	prefix = emptyString;
	$$_dom_event_register = $$_dom_event[$register] = function () {
		return fn[$apply](this,arguments);
	};
})();
$$_dom_event_add_handler = $$_dom_event[$add_handler] = $$_dom_event_register[$$_o$curry]($$true);
$$_dom_event_remove_handler = $$_dom_event[$remove_handler] = $$_dom_event_register[$$_o$curry]($$false);
$$_o$each = $$_store($$_language_prototypes_array,$each,function (fn) {
	var that = this, i = 0, length = that[$length];
	for (; i < length; i++) {
		fn[$call](that, that[i], i, that);
	}
});
$$_dom_event_events_to_remove = $$_dom_event[$events_to_remove] = [];
$$_dom_event_add_handler($$window,$unload,function () {
	$$_dom_event_events_to_remove[$$_o$each](function (args) {
		args[$length] && $$_dom_event_remove_handler[$apply]($$null,args);
	});
});

(function () {

	var fn = function (memo,iterator) {
		this[$$_o$each](function (property) {
			memo = iterator[$call](this,memo,property);
		});
		return memo;
	};

	$$_o$inject = $$_store($$_language_prototypes_array,$inject,fn);
	$$_inject = o[$inject] = $$_take(fn);
	$$_inject[$toString] = $$_K[$$_o$curry]($$_o$inject);

})();
(function () {

	var iterator = function (test,resultObj,anObj) { // combines two objects
		for (var propertyName in anObj) {
			if (test(anObj,propertyName)) {
				resultObj[propertyName] = anObj[propertyName];
			}
		}
		return resultObj;
	},
	combinator = function (anIterator,resultObj) { // combines any number of objects
		return $$_slice[$call](arguments,2)[$$_o$inject](resultObj,anIterator);
	};

	$$_combine = o[$combine] = combinator[$$_o$curry](iterator[$$_o$curry](function (anObj,propertyName) { // curries combinator with a test to make sure the properties are on the subject argument directly, as opposed to being on its prototype
		return anObj[$hasOwnProperty](propertyName);
	}));
	$$_super_combine = o[$super_combine] = combinator[$$_o$curry](iterator[$$_o$curry](function () {return $$true;}));

})();
$$_constructor = o[$constructor] = function (prototype) { // produces a new generic object constructor function
	var fn = function () {
		return $$_super_combine[$apply]($$null,[this][$concat]($$_array(arguments)));
	};
	fn[$prototype] = prototype;
  return fn;
};
$$_injector = o[$injector] = function (memoBuilder, iterator) { // takes a function which returns a new memo and an iterator function. returns a function which wraps inject, passes it a new memo each times its called. see document.getFragmentWithNodes. this is the way you should use inject if the memo is not primitive
	return function () {
		return $$_array(arguments)[$$_o$inject](memoBuilder(),iterator);
	};
};
(function () {

  var singleBuilder = function (prototype) { // takes a prototype and produces a function which takes a properties object and produces an instance
    return function (properties) {
      return new ($$_constructor(prototype))(properties);
    };
	};

	$$_builder = o[$builder] = $$_injector(function () {return singleBuilder({});},function (aSingleBuilder,aPrototype) {return singleBuilder(aSingleBuilder(aPrototype));});

})();
$$_get_object_property = o[$get_object_property] = function (obj,property) {
	return obj[property];
};
$$_concat = $$_language_prototypes_array[$concat];
$$_o$rcurry = $$_store($$_language_prototypes_function,$rcurry,function () {
	var that = this,
	oldArguments = $$_array(arguments);
	return function () {
		return that[$apply](this,$$_concat[$call]($$_array(arguments),oldArguments));
	};
});
(function () {
	var fn = function (e) {
		return (fn = e ? $$_K : $$_get_object_property[$$_o$rcurry]($event,$$window))[$apply](this,arguments);
	};
 	$$_dom_event_get_event = $$_dom_event[$get_event] = function () {
		return fn[$apply](this,arguments);
	};
})();
(function () {
	var fn = function (e) {
		return (fn = e[$which] ?  function (e) {
			return e[$which] === 3 ? $right : $left;
		} : function (e) {
			return e[$button] === 2 ? $right : $left;})[$apply](this,arguments);
	};
	$$_dom_event_get_button = $$_dom_event[$get_button] = function (e) {
		return fn[$apply](this,arguments);
	};
})();

$$_dom_event_get_key = $$_dom_event[$get_key] = function (e) {

	var result = {};
	result[$character] = $$String[$fromCharCode](result[$key] = e[$keyCode] || e[$which]);
	return result;

};
(function () {
	var fn = function (e) {
		return (fn = $$_dom_event_get_mouse_coordinates = $$_dom_event[$get_mouse_coordinates] = e[$pageX] ?  function (e) {
			return {x: e[$pageX], y: e[$pageY]};
		} : function (e) {
			var document_body = $$document[$body],
			document_element = $$document[$documentElement];
			return {x: e[$clientX] + document_body[$scrollLeft] + document_element[$scrollLeft],
				y: e[$clientY] + document_body[$scrollTop] + document_element[$scrollTop]};
		})[$apply](this,arguments);
	};

	$$_dom_event_get_mouse_coordinates = $$_dom_event[$get_mouse_coordinates] = function (e) {
		return fn[$apply](this,arguments);
	};
})();
(function (fn_name,property) {

	var fn = function (e) {
		return (fn = e[$relatedTarget] ? $$_get_object_property[$$_o$rcurry]($relatedTarget) : $$_get_object_property[$$_o$rcurry](property))[$apply](this,arguments);
	};

	$$_dom_event[fn_name] = function () {
		return fn[$apply](this,arguments);
	};

	return arguments[$callee];

})($get_related_mouseover_target,$fromElement)($get_related_mouseout_target,$toElement);
$$_dom_event_get_related_mouseover_target = $$_dom_event[$get_related_mouseover_target];
$$_dom_event_get_related_mouseout_target = $$_dom_event[$get_related_mouseout_target];
(function () {

	var base_fn = function (property,e) {
		var target = e[property];
		return target[$nodeType] !== 3 ? target : target[$parentNode];
	},
	fn = function (e) {
		return (fn = e[$target] ? base_fn[$$_o$curry]($target) : base_fn[$$_o$curry]($srcElement))[$apply](this,arguments);
	};

	$$_dom_event_get_target = $$_dom_event[$get_target] = function () {
		return fn[$apply](this,arguments);
	};

})();
(function () {
	var fn = function (e) {
		return (fn = $$_dom_event_prevent_default = $$_dom_event[$prevent_default] = $preventDefault in e ? function (e) {return e[$preventDefault]();} : function (e) {return e[$returnValue] = $$false;})[$apply](this,arguments);
	};
	$$_dom_event_prevent_default = $$_dom_event[$prevent_default] = function () {
		return fn[$apply](this,arguments);
	};
})();
(function () {
	var fn = function (e) {
		return (fn = $$_dom_event_cancel = $$_dom_event[$cancel] = $stopPropagation in e ? function (e) {return e[$stopPropagation]();} : function (e) {return e[$cancelBubble] = $$false;})[$apply](this,arguments);
	};
	$$_dom_event_cancel = $$_dom_event[$cancel] = function () {
		return fn[$apply](this,arguments);
	};
})();
(function () {
 	var curry_with_this_dot_event = function (fn) {
		return function () {
			return fn[$call](this,this[$event]);
		};
	},
	getter = $$_builder({
		get_event: curry_with_this_dot_event($$_dom_event_get_event),
		get_button: curry_with_this_dot_event($$_dom_event_get_button),
		get_key: curry_with_this_dot_event($$_dom_event_get_key),
		get_mouse_coordinates: curry_with_this_dot_event($$_dom_event_get_mouse_coordinates),
		get_related_target: curry_with_this_dot_event($$_dom_event_get_related_target),
		get_target: curry_with_this_dot_event($$_dom_event_get_target),
		prevent_default: curry_with_this_dot_event($$_dom_event_prevent_default),
		cancel: curry_with_this_dot_event($$_dom_event_cancel)
	});
	$$_dom_event_get_abstraction = $$_dom_event[$get_abstraction] = function (e) {
		return getter({event: $$_dom_event_get_event(e)});
	};
})();
$$_splice = $$_language_prototypes_array[$splice];

$$_dom_event_add_listener = $$_dom_event[$add_listener] = function (node,type,fn,bubble) {

	var wrapped_fn = function (e) {
		return fn[$call](this,e,$$_dom_event_get_abstraction(e));
	},
	args = [node,type,wrapped_fn,bubble];
	$$_dom_event_add_handler[$apply]($$null,args);

	$$_dom_event_events_to_remove[$push](args);
	return function () {
		return $$_dom_event_remove_handler[$apply]($$null,args);
	};
};
(function () {
 	var fn = function (ancestor) {
		return (fn = $$_dom_contains = $$_dom[$contains] = ancestor[$contains] ? function (ancestor,descendant) {
			return ancestor[$contains](descendant);
		} : function (ancestor,descendant) {
			return (ancestor[$compareDocumentPosition](descendant) & 16) !== 0;
		})[$apply](this,arguments);
	};
	$$_dom_contains = $$_dom[$contains] = function () {
		return fn[$apply](this,arguments);
	};
})();
(function () {

 	var filter_delegates_by_descendant,
	consider_delegates_for_node,
	delegates,
	garbage_collect_delegates_by_type,
	delegate_handler,
	add_delegate_handler_by_type,
	get_or_create_array_of_delegates_by_type;


	filter_delegates_by_descendant = $$_dom_event[$filter_delegates_by_descendant] = function (delegates,descendant) {
		return $$_filter(delegates,function (delegate) {
			return $$_dom_contains(delegate[$ancestor],descendant);
		});
	};
	consider_delegates_for_node = $$_dom_event[$consider_delegates_for_node] = function (delegates,node,e,oe) {
		var filtered_delegates = delegates[$$_o$filter](function (delegate) {
			if (!delegate[$test](node,e,oe)) {
				return $$true;
			} else {
				oe[$delegate_target] = node;
				delegate[$action](e,oe);
				return $$false;
			}
		}),
		new_node = node[$parentNode];
		return filtered_delegates[$length] && new_node ? arguments[$callee](filtered_delegates,new_node,e,oe) : $$true;
	};
	delegates = $$_dom_event[$delegates] = $$_dom_event[$delegates] = [];
	garbage_collect_delegates_by_type = function (type) {
		return delegates[type] = delegates[type][$$_o$filter](function (delegate) {
			return $ancestor in delegate;
		});
	};
 	delegate_handler = $$_dom_event[$delegate_handler] = function (type,e,oe) {
		garbage_collect_delegates_by_type(type);
		var delegates_by_type = delegates[type],
		current_target = oe[$get_target](),
		delegates_by_descendant;
		delegates_by_descendant = filter_delegates_by_descendant(delegates_by_type,current_target);
		consider_delegates_for_node(delegates_by_descendant,current_target,e,oe);
	};
	add_delegate_handler_by_type = $$_dom_event[$add_delegate_handler_by_type] = function (type) {
		$$_dom_event_add_listener($$document[$body],type,delegate_handler[$$_o$curry](type));
	};
	get_or_create_array_of_delegates_by_type = $$_dom_event[$get_or_create_array_of_delegates_by_type] = function (type) {
		if (!delegates[$hasOwnProperty](type)) {
			add_delegate_handler_by_type(type);
			delegates[type] = [];
		}
		return delegates[type];
	};
	$$_dom_event_delegate = $$_dom_event[$delegate] = function (options) {
		var type = options[$type],
		array_of_delegates = get_or_create_array_of_delegates_by_type(type),
		delegate_object = {
			test: options[$test],
			action: options[$action],
			ancestor: options[$ancestor]
		};
		array_of_delegates[$push](delegate_object);
		return function () {
			delete delegate_object[$ancestor];
		};
	};
})();
$$_dom_find_node_position = $$_dom[$find_node_position] = function (node) {
	var sum_of_x = sum_of_y = 0;
	if (node[$offsetParent]) {
		do {
			sum_of_x += node[$offsetLeft];
			sum_of_y += node[$offsetTop];
		} while (node = node[$offsetParent]);
		return {x: sum_of_x, y: sum_of_y};
	}
};
(function () {
	var fn = function (node) {
		return (fn = $$_dom_get_node_style = $$_dom[$get_node_style] = node[$currentStyle] ? function (node,style) {
			return node[$currentStyle][style];
		} : function (node,style) {
			return $$document[$defaultView][$getComputedStyle](node,$$null)[$getPropertyValue](style);
		})[$apply](this,arguments);
	};
	$$_dom_get_node_style = $$_dom[$get_node_style] = function () {
		return fn[$apply](this,arguments);
	};

})();
$$_join = $$_language_prototypes_array[$join];
(function () {
	var join = $$_take($$_join),
	fn = function (memo) {
		memo = memo || {};
		var that = this;
		return function () {
			var key = join(arguments);
			return memo[$hasOwnProperty](key) ? memo[key] : (memo[key] = that[$apply](this,arguments));
		};
	};

	$$_o$memoize = $$_store($$_language_prototypes_function,$memoize,fn);
	$$_memoize = o[$memoize] = $$_take(fn);
	$$_memoize[$toString] = $$_K[$$_o$curry]($$_o$memoize);

})();
$$_regex = o[$regex] = function (pattern,flags) {
	return new $$RegExp(pattern,flags);
};
$$_string = o[$string] = function () {
	return $$_join[$call](arguments,emptyString);
};
$$_dom_class_name_test_regex = $$_memoize(function (className) {
	return $$_regex($$_string('(^|\\s+)',className,'(\\s+|$)'));
});
$$_dom_has_class_name = $$_dom[$has_class_name] = function (element,className) {
	return $$_dom_class_name_test_regex(className)[$test](element[$className]);
};
$$_dom_set_interval = $$_dom[$set_interval] = function (fn,time) {
	return $$window[$setInterval](fn,time);
};
$$_empty_function = function () {};

var active_drag,
current_z_index = 1,
parse_pixel_value = function (value) {
	var minus_px = value[$replace](/px$/);
	if (value !== minus_px) {
		return $$parseFloat(minus_px);
	}
	return false;
},
wait = 1E3 / 12,
prepare = function () {

	canceler = $$_dom_event_add_listener($$window,$mouseup,function (e,oe) {
		active_drag && active_drag();
	});

	prepare = $$_empty_function;
},
begin_dragging = function (data) {

	prepare();

	var target = data[$target],
	original_left = 0,
	original_top = 0,
	get_style = $$_dom_get_node_style[$$_o$curry](target),
	current_mouse_coordinates =
	original_mouse_coordinates = data[$mouse_coordinates],
	mouse_coordinate_watcher,
	interval,
	canceler;

	target[$style][$zIndex] = ++current_z_index;

	var current_style_position_value = get_style($position);
	if (current_style_position_value === $static) {
		target[$style][$position] = $relative;
	} else {
		original_left = parse_pixel_value(get_style($left)) || original_left;
		original_top = parse_pixel_value(get_style($top)) || original_top;
	}

	active_drag = function () {
		mouse_coordinate_watcher();
		$$_dom_clear_interval(interval);
		active_drag = undefined;
	};

	mouse_coordinate_watcher = $$_dom_event_add_listener($$window,$mousemove,function (e,oe) {
		current_mouse_coordinates = oe[$get_mouse_coordinates]();
	});

	interval = $$_dom_set_interval(function () {
		target[$style][$left] = (original_left + (current_mouse_coordinates[$x] - original_mouse_coordinates[$x])) + 'px';
		target[$style][$top] = (original_top + (current_mouse_coordinates[$y] - original_mouse_coordinates[$y])) + 'px';
	},wait);

};

$$_dom_event_delegate({
	ancestor: $$document[$body],
	type: $mousedown,
	test: function (n) {
		return $$_dom_has_class_name(n,$draggable);
	},
	action: function (e,oe) {
		if (!active_drag) {
			begin_dragging({
				target: oe[$delegate_target],
				mouse_coordinates: oe[$get_mouse_coordinates]()
			});
			oe[$prevent_default]();
		}
	}
});
}).apply(this);
