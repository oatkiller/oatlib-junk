//= require <oatlib-ui/reference>
//= require <before>
//= require <invoke>
//= require <property>
(function () {

	o.ui.states = function (states_obj) {
		var get_state_obj_by_key = function (state_key) {
			return states_obj[state_key];
		},
		leave_implied_leavers = function () {
			o.each(o.filter(states_obj,o.property[o.curry]('implied_leave')),function (state_obj) {
				state_obj.leave();
			});
		};

		return {
			enter: function (state) {
				if (!state.active) {
					leave_implied_leavers();
					state.active = true;
					return state.enter && state.enter.apply(this,arguments)
				}
				// else return false
				return false;
			}[o.before](get_state_obj_by_key)
		};
	};
})();
