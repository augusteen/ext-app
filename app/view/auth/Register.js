Ext.define('MyApp.view.auth.Register', {
    extend: 'Ext.window.Window',
    alias:'widget.auth_register',
    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'MyApp.view.auth.RegisterController'
    ],
    controller: 'register',
    autoShow: true,
    height: 275,
    width: 375,
    modal:true,
    resizable:false,
    movable:false,
    closable:false,
    title: 'Register',
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
            reference:'register_form',
            defaults:{
                labelWidth:120
            },
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Name',
                    name:'name',
                    allowBlank:false,
                    margin:'0 0 20 0'
                },
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
                }
            ]
        }
    ]
});