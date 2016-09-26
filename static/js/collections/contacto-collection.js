var ContactoList = Backbone.Collection.extend({

	model: Contacto,
	url: "http://localhost:1337/163.172.218.124/pwf/rest/agenda",
	sortField: "apellido",
	
	parse: function(data) {
    	return data.lista;
  	},

	comparator: function (contacto1, contacto2)
	{
		return contacto1.get(this.sortField) > contacto2.get(this.sortField);
	},
	search: function(letters)
	{
		if(letters === "") return this;
	
	var pattern = new RegExp(letters,'i');
		var filteredList = this.filter(function(data)
		{
			return (pattern.test( data.get('nombre') + "  "+data.get('apellido') ));
		});
		var coll = new ContactoList(filteredList);
		return coll;
	}
});
