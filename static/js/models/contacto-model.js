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
	urlRoot: 'https://desa03.konecta.com.py/pwf/rest/agenda'
});
