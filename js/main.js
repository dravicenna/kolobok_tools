const wax = new waxjs.WaxJS('https://wax.greymass.com', null, null, false);

//automatically check for credentials
autoLogin();

//checks if autologin is available 
async function autoLogin() {
    let isAutoLoginAvailable = await wax.isAutoLoginAvailable();
    if (isAutoLoginAvailable) {
        let userAccount = wax.userAccount;
        let pubKeys = wax.pubKeys;
        // let str = 'AutoLogin enabled for account: ' + userAccount + '<br/>Active: ' + pubKeys[0] + '<br/>Owner: ' + pubKeys[1]
        let str = 'AutoLogin enabled for account: ' + userAccount;
        document.getElementById('autologin').textContent =  str;
        document.getElementById('loginbtn').style.display = 'none';
    }
    else {
        document.getElementById('autologin').insertAdjacentHTML('beforeend', 'Not auto-logged in');
        const loginDiv = document.getElementsByClassName('login');
        loginDiv[0].style.display != 'none';
    }
}

//normal login. Triggers a popup for non-whitelisted dapps
async function login() {
    try {
        //if autologged in, this simply returns the userAccount w/no popup
        let userAccount = await wax.login();
        let pubKeys = wax.pubKeys;
        let str = 'Account: ' + userAccount
        // let str = 'Account: ' + userAccount + '<br/>Active: ' + pubKeys[0] + '<br/>Owner: ' + pubKeys[1]
        document.getElementById('loginresponse').textContent =  str;
        document.getElementById('autologin').style.display = 'none';
        document.getElementById('loginbtn').style.display = 'none';
        // document.getElementsByClassName('login').style.display = 'none';
    } catch (e) {
        document.getElementById('loginresponse').append(e.message);
    }
} 

async function sign() {
if(!wax.api) {
    // return document.getElementById('autologin').append('* Login first *');
    document.getElementById('autologin').textContent = '* Login first *';
    return
}
var kolo_id = document.getElementById('koloid').value;
var kolo_name = document.getElementById('name').value;
try {
    const result = await wax.api.transact({

    actions: [{
        account: 'ilovekolobok',
        name: 'rename',
        authorization: [{
            actor: wax.userAccount,
            permission: 'active',
            }],
        data: {
            owner: wax.userAccount,
            assetid: kolo_id,
            name: kolo_name,
            memo: ''
            },            
        }]
    }, {
    blocksBehind: 3,
    expireSeconds: 30
    });
    var trx_id = result['transaction_id'];
    var str = 'Done! Transaction # ' + trx_id;
    document.getElementById('response').textContent = str;
    // document.getElementById('response').textContent = JSON.stringify(result, null, 2);
} catch(e) {
    document.getElementById('response').textContent = e.message;
}
}
