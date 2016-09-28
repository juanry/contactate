

var App = new (Backbone.Router.extend({
  nextID: 4,
  routes: {
    "contactos/:id": "detalle",
    "contactos/": "index",
    "*any" : "redirect"
  },

  initialize: function(){

  },

  start: function(bootstrap){

    //creamos lista de libros sin filtrar
    //mediante bootstrapping :)
    this.contactoList = new ContactoList(bootstrap.data);

    //lista filtrada que se usará para generar las vistas
    this.activeList = null;

    this.filter='';

    Backbone.history.start();
  },

  redirect: function()
  {
    //redirigimos a ruta inicial
    this.navigate("contactos/",true);
  },

  index: function(){

    //initialize
    if(!this.activeList)
      this.activeList = new ContactoList(this.contactoList.models);

    var contactoView = new ContactoListView({collection: this.activeList});

    //generamos vista
    $('#ui').html(_.template($('#searchTemplate').html(),
    //escape to prevent XSS attack
    { filter: _.escape(this.filter), sortOrder: this.activeList.sortOrder, sortField: this.activeList.sortField }
    ));
    $('select').material_select();

    $('#app').html(contactoView.el);
    $('#app').append("<thead><tr><th data-field='nombre'>Nombre</th><th data-field='apellido'>Apellido</th><th data-field='telefono'>Telefono</th></tr></thead>");
  contactoView.render();

},
detalle: function(){

},
//ordenar por attr field en order order
sortBy: function(field)
{
  this.activeList.sortField = field;
  this.activeList.sortOrder = "asc";

  this.activeList.sort();
},

//filtrar libros
filterBy: function(filter)
{
  this.filter = filter;

  //"remember" sort options
  var field = this.activeList.sortField;
  var order = this.activeList.sortOrder;
  this.activeList = this.contactoList.search(this.filter);
  //sort results
  this.activeList.sortField = field;
  this.activeList.sortOrder = order;
  this.activeList.sort();

  //creamos nueva vista con datos filtrados
  var contactoView = new ContactoListView({collection: this.activeList });
  //regeneramos vista
  contactoView.render();
  $('#app').html(contactoView.el);
  $('#app').append("<thead><tr><th data-field='nombre'>Nombre</th><th data-field='apellido'>Apellido</th><th data-field='telefono'>Telefono</th></tr></thead>");
},
agregarContacto: function(data){
  var contacto = new Contacto(data);
  
  contacto.save( null, {
      success: function(model, response, options){
          Materialize.toast("Contacto creado Correctamente!", 3000, 'rounded');
          nuevo = new Contacto(response);
          this.activeList.add(nuevo);
      }
  }
  );  
},
borrarContacto: function(id){

  var data = this.activeList.get(id);
  this.activeList.remove(data);

},
verContacto: function(id){
  var data = this.activeList.get(id);
  var itemView = new detalleView({model: data});
  $("#container-detalle").html(itemView.el);
  $('#modal-detalle-contacto').openModal();
  }
}))();
