ContactoListView = Backbone.View.extend({
	tagName: "tbody",
	initialize: function()
	{
		this.listenTo(this.collection, "save", this.render);
		this.listenTo(this.collection, "reset", this.render);
		this.listenTo(this.collection, "sort", this.render);
		this.listenTo(this.collection, "remove", this.render);
	},
	addAll: function()
	{
		this.collection.forEach(this.addOne, this);
	},
	render: function()
	{
		this.$el.empty();
		this.addAll();
	},
	addOne: function(item)
	{
		var itemView = new ContactoView({model: item});
		itemView.render();
		this.$el.append(itemView.el);
	}
});
