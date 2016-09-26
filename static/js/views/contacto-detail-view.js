detailView = Backbone.View.extend({
	initialize: function()
	{
		this.listenTo(this.model, "change", this.render);

	},
	render: function()
	{
		this.$el.html(_.template($('#fichaTemplate').html(),this.model.attributes));
	}
});
