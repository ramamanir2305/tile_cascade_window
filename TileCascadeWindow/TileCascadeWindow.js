class TileCascadeWindow {
    constructor(screenObj,isElectron) {
        super();
        this.isElectron = isElectron;
        this.screenObj = screenObj;
        this.windowsArrangementObj = {
            tile    : 'tile',
            cascade : 'cascade'
        }
    }
    handleWindow = () => {
        this.windowAutoFocusCompleted(type,winObj);
    }
    focusWin = (win) => {
        if(this.isElectron) {
            win.focus();
        } else {
            let newWin = window.open("", win.name);
            newWin.focus();
        }
    }
    getSize = (obj) => {
        let size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    }
    getWidthFromHeight = (maxColumnDynamic,resizeRatio,initWid) => {
        var widthObj = {};
        var realHeight = (screen.height - (maxColumnDynamic * Number(this.screenObj.outerInnerHeightDifference)))/maxColumnDynamic;
        widthObj['getWidth'] = realHeight / resizeRatio;
        widthObj['windowCenter'] = true;
        if ((widthObj['getWidth'] * maxColumnDynamic) >= screen.width){
            widthObj['getWidth'] = initWid;
            widthObj['windowCenter'] = false;
        }
        return widthObj;
    }
    window_Tile_CasCade = (isThisCasCade,totWinObj) => {
        let winContainerSize = this.getSize(totWinObj);
        if (winContainerSize <= 1){
            return;
        }
        let leftPosCnt = 0;
        let leftPos = 0;
        let topPos = 0;
        let resizeRatio =  this.screenObj.resizeRatio;
        let maxColumnDynamic = 2;
        let maxTwoColumnTable = 4;
        let totRow = 0;
        let totRowInit = 0;
        let row_2_column_2_Arr = [3,4];
        let isThis_3_4_window = row_2_column_2_Arr.indexOf(winContainerSize);
        let wid = 0;
        let hei = 0;
        let row_2_column_2_column_cnt = 0;
        let row_2_column_2_column_exact_Column = 0;
        let updateRow = 0;
        let screenWidthBalance = 0;
        let winCnt = 0;
        if (winContainerSize > maxTwoColumnTable){
            maxColumnDynamic = 3;
        }
        totRowInit = Math.ceil(winContainerSize / maxColumnDynamic);
        for (let key in totWinObj) { 
            if (totWinObj[key].window){ 
                if (totWinObj[key].window.noTile)
                    continue;
                winCnt++;
                wid = Math.floor(screen.width/maxColumnDynamic);
                if (isThis_3_4_window !== -1){
                    if (screen.width > screen.height){
                        var widObj = getWidthFromHeight(maxColumnDynamic,resizeRatio,wid);
                        wid = widObj['getWidth'];
                        if (widObj['windowCenter']){
                            screenWidthBalance = ((screen.width - (wid * maxColumnDynamic)) / maxColumnDynamic); 
                        }
                        row_2_column_2_column_exact_Column = row_2_column_2_column_cnt % maxColumnDynamic;
                        row_2_column_2_column_cnt++;
                        
                    }
                }
                hei = Math.floor( (Math.round(wid) - Number(this.screenObj.outerInnerWidthDifference)) * resizeRatio) + Number(localStorage.outerInnerHeightDifference);
                totWinObj[key].resizeTo(wid,hei);
                updateRow = (leftPosCnt * wid) % (maxColumnDynamic * wid);
                if (updateRow === 0){
                    totRow++;
                }
                
                if (screenWidthBalance > 0){
                    leftPos = screenWidthBalance + (row_2_column_2_column_exact_Column * wid);
                } else {
                    leftPos = (leftPosCnt * wid) % (maxColumnDynamic * wid);
                }
                
                
                if ((hei * totRowInit) > screen.height){
                    let startPt_top = (screen.height - hei) / (totRowInit - 1);
                    topPos = startPt_top * (totRow-1);
                } else {
                    topPos = hei * (totRow-1); 
                }
                
                if (isThisCasCade){
                    leftPos = (winCnt-1) * (Number(this.screenObj.outerInnerHeightDifference) / 2);
                    topPos = winCnt * (Number(this.screenObj.outerInnerHeightDifference) / 2); 
                }

                if(this.isElectron) {
                    if (key.isMinimized()) {
                        key.restore();
                    }
                    key.setBounds({ x: Math.round(leftPos), y: Math.round(topPos), width: Math.round(wid), height: Math.round(hei) },true);
                } else {
                    totWinObj[key].moveTo(leftPos,topPos);
                }
                leftPosCnt++;
            }

        }
    

    }
    windowAutoFocusCompleted = (type,winObj) => {
        const windowFocusHandler = new Promise((resolve) => {
            for(let winKey in winObj) {
                if(this.isElectron) {
                    this.focusWin(winObj[winKey]);
                    resolve(true);
                } else if (winObj[winKey]) {
                    winObj[winKey].onfocus = (e) => {
                        winObj[winKey].onfocus = null;
                        resolve(true);
                    }
                    focusWin(winObj[winKey])
                    // winObj[winKey].focus()
                    winObj[winKey].winId = winKey;
                }
            }
        });
        windowFocusHandler.then((success) => {
            if(success) {
                switch(type) {
        
                    case this.windowsArrangementObj['tile']:
                        this.window_Tile_CasCade(false,winObj,screenObj,screen);
                        break;
    
                    case this.windowsArrangementObj['cascade']:
                        this.window_Tile_CasCade(true,winObj,screenObj,screen);
                        break;
                        
                    default:
                        Log.resize("window arrangement switch case issue");
                        break;
                }
            } 
            
        })
    }

}