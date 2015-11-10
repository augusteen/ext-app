Ext.define('MyApp.view.auth.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.auth_login',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'MyApp.view.auth.LoginController'
    ],
    controller:'login',
    autoShow: true,
    height: 250,
    width: 350,
    modal:true,
    resizable:false,
    movable:false,
    closable:false,
    title: 'Login',
    buttons:[
        {
            text:'Submit',
            handler:'onSubmit'
        }
    ],
    items:[
        {
            xtype: 'form',
            bodyPadding: 10,
            reference:'login_form',
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Email',
                    name:'email',
                    allowBlank:false,
                    margin:'0 0 20 0'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Password',
                    inputType:'password',
                    name:'password',
                    allowBlank:false,
                    margin:'0 0 20 0',
                    reference:'password_field'
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: 'Remember Me',
                    inputValue:1,
                    name:'remember'
                }
            ]
        }
    ]
});