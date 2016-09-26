ContactoView = Backbone.View.extend({
	tagName: "tr", /*Toma el tagName li y empieza a modificar*/
	//renderizar vista cuando el modelo cambie
	initialize: function()
	{
		//this.model.on("change", this.render, this);
		this.listenTo(this.model, "change", this.render);

	},

	render: function()
	{
		this.$el.html(_.template($('#fichaTemplate').html(),this.model.attributes));
	}
});
