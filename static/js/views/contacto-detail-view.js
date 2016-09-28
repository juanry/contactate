detalleView = Backbone.View.extend({	
	initialize: function()
	{
		this.render();
	},
	render: function()
	{
		this.$el.html(_.template($('#detalleTemplate').html(),this.model.attributes));
	}
});
