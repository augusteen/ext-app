Ext.define('MyApp.controller.Routes', {
    extend : 'Ext.app.Controller',
    requires: [
        'Ext.util.History',
        'MyApp.Global',
        'MyApp.view.auth.Login',
        'MyApp.view.auth.Register'
    ],
    /*
    * Listen for unmatched route
    * */
    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onUnmatchedRoute'
            }
        }
    },
    /*
    * Route list
    * */
    routes : {
        // Register route
        'register' : {
            action : 'onRegister'
        },
        // Login route
        'login' : {
            action : 'onLogin'
        },
        // Logout route
        'logout' : {
            action : 'onLogout'
        },
        // Home route
        'home' : {
            before:'loggedIn',
            action : 'onHome'
        }
    },
    /*
    * Unmatched route method.  On any unmatched route it redirects to the home route
    * */
    onUnmatchedRoute: function () {
        this.redirectTo('home', false);
    },
    /*
    * Login route method.  Loads the login form
    * */
    onLogin:function() {
        Ext.widget('auth_login');
    },
    /*
    * Register route method. Loads the register form
    * */
    onRegister:function() {
        Ext.widget('auth_register');
    },
    /*
    * Lougout route method.  Loads the login form
    * */
    onLogout:function() {
        var me = this;
        Ext.Ajax.request({
            url: MyApp.Global.getApiUrl() + '/auth/logout',
            method:'GET',
            // If successful continue loading the route
            success:function(){
                MyApp.Global.setUser(null); // Set user to null in Global singleton
                me.redirectTo('login',false); // Redirect to login route
            }
        });
    },
    /*
    * Home route method
    * */
    onHome:function() {
        alert('Welcome home, ' + MyApp.Global.getUser().name);
    },
    /*
    * LoggedIn method.  Checks if the user has a valid logon session
    * */
    loggedIn:function(){
        var me = this,
            args = Ext.Array.slice(arguments), // Get a reference to the route action
            action = args.pop(); // Get a reference to the route action
        me.startToken(); // Set the start token to the current hash
        Ext.Ajax.request({
            url: MyApp.Global.getApiUrl() + '/auth/login',
            method:'GET',
            // If successful continue loading the route
            success:function(response){
                var res = Ext.decode(response.responseText);
                MyApp.Global.setUser(res.user); // Update the global user var
                action.resume();
            },
            // If not logged in redirect to the login route
            failure:function() {
                me.redirectTo('login',false);
            }
        });
    },
    /*
    * StartToken method.  Updates the global startToken var with the current hash
    * */
    startToken:function() {
        MyApp.Global.setStartToken(Ext.util.History.getToken());
    }
});
