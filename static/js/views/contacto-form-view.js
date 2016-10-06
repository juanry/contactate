updateView = Backbone.View.extend({	
	initialize: function()
	{
		this.render();
	},
	render: function()
	{
		this.$el.html(_.template($('#editaFormulario').html(),this.model.attributes));
	}
});
