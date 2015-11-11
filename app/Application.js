Ext.define('MyApp.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'MyApp.Global'
    ],

    name: 'MyApp',
    /*
     * The default hash for the router
     * */
    defaultToken : 'home',
    /*
     * Define the router controller
     * */
    controllers:[
        'Routes'
    ],
    stores: [],
    launch:function() {
        /*
        * Calling the registerVtypes method in the Global singleton to set up the vtypes to use in the application
        * */
        MyApp.Global.registerVtypes()
    },
    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
