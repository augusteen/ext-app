Ext.define('MyApp.Application', {
    extend: 'Ext.app.Application',

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
