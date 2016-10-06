var Contacto = Backbone.Model.extend({
	defaults: {
        "nombre": "",
        "apellido": "",
        "alias": "",
        "telefono": "",
        "email": "",
        "direccion": "",
        "fechacreacion": "",
        "fechamodificacion": null
    },
	urlRoot: 'http://163.172.218.124/pwf/rest/agenda'
});
