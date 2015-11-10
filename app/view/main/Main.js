Ext.define('MyApp.view.main.Main', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.main',
    requires: [
        'MyApp.view.main.MainController',
        'MyApp.view.main.MainModel'
    ],
    controller: 'main',
    viewModel: 'main',
});
