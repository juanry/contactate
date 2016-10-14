var App = new (Backbone.Router.extend({
  
  routes: {
    
    "contactos/": "index",
    "*any" : "redirect"
  },

  initialize: function(){

  },

  start: function(bootstrap){
    this.contactoList = new ContactoList(bootstrap.data);
    this.activeList = null;
    this.filter='';
    Backbone.history.start();
  },
  
  redirect: function()
  {
    this.navigate("contactos/",true);
  },

  index: function(){
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
    this.pagina();
  },
  
  render: function(){
    var contactoView = new ContactoListView({collection: this.activeList });
    contactoView.render();
    $('#app').html(contactoView.el);
    $('#app').append("<thead><tr><th data-field='nombre'>Nombre</th><th data-field='apellido'>Apellido</th><th data-field='telefono'>Telefono</th></tr></thead>");
  },
  pagina: function(){
    $('#cantRegistros').text((inicio+1)+" - "+(inicio+cantidad)+" de "+ultimo);
  },
  sortBy: function(field)
  {
    this.activeList.sortField = field;
    this.activeList.sortOrder = "asc";
    this.activeList.sort();
    this.render();
  },
  filterBy: function(filter)
  {
    this.filter = filter;
    var field = this.activeList.sortField;
    var order = this.activeList.sortOrder;
    this.activeList = this.contactoList.search(this.filter);
    this.activeList.sortField = field;
    this.activeList.sortOrder = order;
    this.activeList.sort();
    this.render();
  },
  agregarContacto: function(data){
    var contacto = new Contacto(data);
    contacto.save( null, {
      success: function(model, response, options){
          Materialize.toast("Contacto creado Correctamente!", 3000, 'rounded');
          $('#modal-form-contacto').closeModal();
          App.modificarContacto(model.id);
      }
    }); 
  },
  borrarContacto: function(id){
    var data = this.activeList.get(id);
    this.activeList.remove(data);
    data.destroy(null, {
      success:function(model, response, options){
        Materialize.toast("Contacto borrado!", 3000, 'rounded');
      }
    });
  },
  verContacto: function(id){
    var data = this.activeList.get(id);
    var itemView = new detalleView({model: data});
    $("#container-detalle").html(itemView.el);
    $('#modal-detalle-contacto').openModal();
  },
  modificarContacto: function(id){
    var data = new Contacto({id:id});
    data.fetch({
      success:function(){
        var itemView = new updateView({model: data});
        $("#update-content").html(itemView.el);
        $('#modal-update-contacto').openModal();    
      }
    });
    
  },
  guardarModificacion: function(id){
    var data = new Contacto({id:id});
    data.fetch();
    data.attributes.nombre = $("#editContacto").find('#nombre').val();
    data.attributes.apellido = $("#editContacto").find('#apellido').val();
    data.attributes.alias = $("#editContacto").find('#alias').val();
    data.attributes.direccion = $("#editContacto").find('#direccion').val();
    data.attributes.telefono = $("#editContacto").find('#telefono').val();
    data.attributes.email = $("#editContacto").find('#email').val();
    data.save( null, {
      success: function(model, response, options){
          Materialize.toast("Contacto Modifcado Correctamente!", 3000, 'rounded');
      }
    }); 
  },
  siguiente: function(){
      this.contactoList.next();
      this.contactoList.fetch();
      this.activeList = this.contactoList;
      this.pagina();
      this.render();  
    },
    anterior: function(){
      this.contactoList.previous();
      this.contactoList.fetch();
      this.activeList = this.contactoList;
      this.pagina();
      this.render();
    },
    primero: function(){
      this.contactoList.first();
      this.contactoList.fetch();
      this.activeList = this.contactoList;
      this.pagina();
      this.render();
    },
    ultimo: function(){
      this.contactoList.last();
      this.contactoList.fetch();
      this.activeList = this.contactoList;
      this.pagina();
      this.render();
    },
    filtrar: function(){
      this.contactoList.filtrado();
      this.contactoList.fetch();
      this.activeList = this.contactoList;
      this.pagina();
      this.render();
    },
}))();
