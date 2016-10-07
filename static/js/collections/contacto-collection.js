var inicio = 0;
var cantidad = 20;
var filtro;
var ultimo;

var ContactoList = Backbone.Collection.extend({
	
	model: Contacto,
	sortField: "apellido",
	
	url: function(){
		if(filtro === '' || typeof filtro === 'undefined'){
			return "https://desa03.konecta.com.py/pwf/rest/agenda?inicio="+inicio+"&cantidad="+cantidad+"&filtro=";	
		}else{
			return "https://desa03.konecta.com.py/pwf/rest/agenda?inicio="+inicio+"&cantidad="+cantidad+"&filtro="+filtro;
		}
		
	},
	parse: function(data) {
		ultimo = data.total;
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
	},
	first:function(){
		inicio=0;
	},
	next: function(){
		if(inicio+cantidad<=ultimo){
			inicio+=cantidad;	
		}
		
	},
	previous: function(){
		
		if(inicio != 0 ){
			inicio-=cantidad;
		}
	},
	last:function(){
		inicio = ultimo - (ultimo%cantidad);
	},
	filtrado: function(){
		console.log($('#search').val());
		filtro=$('#search').val();
	}
});


