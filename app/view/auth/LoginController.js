Ext.define('MyApp.view.auth.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    /*
     * Form submit method
     * */
    onSubmit:function(btn){
        var me = this, // Controller reference
            win = btn.up('window'), // Window reference
            form = me.lookupReference('login_form'), // Form reference
            password; // Empty var
        // Check if form is valid
        if (form.isValid()) {
            // Pop-up a message for login progress
            Ext.MessageBox.show({
                title : 'Login',
                msg : 'Attempting login, please wait...',
                width : 200,
                closable : false
            });
            // Submit login form
            form.submit({
                url: MyApp.Global.getApiUrl() + '/auth/login',
                // If login is successful
                success:function(form,action) {
                    var res = Ext.decode(action.response.responseText),
                        token = MyApp.Global.getStartToken(); // Get the global start token hash
                    MyApp.Global.setUser(res.user); // Update the global user var
                    Ext.MessageBox.hide();
                    win.close(); // Close the login form
                    // If there is a start token redirect there otherwise redirect home
                    !token ? me.redirectTo('home',false) : me.redirectTo(token,false);
                },
                // If login is not successful
                failure:function(form,action){
                    var res = Ext.decode(action.response.responseText);
                    Ext.MessageBox.hide();
                    // If the server returns user:false
                    if (!res.user) {
                        win.close();
                        me.redirectTo('register',false); // Redirect to the register route
                    }
                    // If the server returns user:true and password:false
                    else if (!res.password) {
                        // Pop up a message to say bad password
                        Ext.MessageBox.show({
                            title : 'Password',
                            msg : 'Password invalid, please try again',
                            icon: Ext.MessageBox.ERROR,
                            width : 200,
                            closable : false,
                            buttons: Ext.MessageBox.OK
                        });
                        password = me.lookupReference('password_field'); // Reference to the password field
                        password.setValue(); // Blank the value
                        password.validate(); // Validate the field to mark it invalid
                    }
                }
            });
        }
    },
    /*
    * onRegister method is called when the options - register menu item is selected.  Redirects to register route
    * */
    onRegister:function() {
        this.redirectTo('register',false);
    },
    /*
    * onRecoverPassword method is called when the options - recover password menu item is selected.  Redirects to
    * password route
    * */
    onRecoverPassword:function() {
        this.redirectTo('password',false);
    }
});