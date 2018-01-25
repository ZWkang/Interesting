const electron = require('electron');
const url = require('url');
const path = require('path');


const {app,BrowserWindow,Menu,ipcMain} = electron;

//设置环境
process.env.NODE_ENV = 'production';

let mainWindow;
let addWindow;
//listen for app to be ready

app.on('ready',function(){
    //1.Create new window
    mainWindow = new BrowserWindow({});
    //load htmml into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'window.html'),
        protocol: 'file:', //协议
        slashes:true
    }));
    //file:/dirname/mainWindow.html

    //6. 大窗口关闭整个程序关闭
    mainWindow.on('close',function(){
        app.quit();
    })

    //2 .buile menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);



})


//handle create add window 

function createAddWindow(){
    //5. 新建窗口
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add TODO list item'
    });
    //load htmml into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,'addWindow.html'),
        protocol: 'file:', //协议
        slashes:true
    }));
    // 垃圾回收
    addWindow.on('close',function(){
        addWindow = null;
    })
}

//7. 捕获子窗口ipc item:add
ipcMain.on('item:add',function(e,item){
    console.log('item');
    mainWindow.webContents.send('item:add',item);
    addWindow.close();
});

const mainMenuTemplate = [{
    label: 'File',
    submenu: [//3. 子菜单
        {
            label: 'Add Item',
            click(){
                //4. 新建窗口
                createAddWindow();
            }

        },
        {
            label: 'Clear Items',
            click(){
                mainWindow.webContents.send('item:clear');
            }
        },
        {
            label: 'Quit',
            accelerator: process.platform =='darwin'? 'Commond+Q':'Ctrl+Q',//快捷键做os版本区分
            click(){
                app.quit();
            }
        }
    ]
}];


// if mac , add empty object to menu
if(process.platform =='darwin'){
    mainMenuTemplate.unshift({});
}


// 区分开发环境
if(process.env.NODE_ENV !== 'production'){
    // add devtools
    mainMenuTemplate.push({
        label:'Developer tools',
        submenu:[
            {
                role:'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator: process.platform =='darwin'? 'Commond+I':'Ctrl+I',//快捷键做os版本区分,
                click(item,focusedWindow){
                    //区分点击窗口
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}