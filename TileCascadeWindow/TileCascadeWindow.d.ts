declare class TileCascadeWindow {
    constructor(screenObj: any, isElectron: any);
    isElectron: any;
    screenObj: any;
    windowsArrangementObj: {
        tile: string;
        cascade: string;
    };
    handleWindow: () => void;
    focusWin: (win: any) => void;
    getSize: (obj: any) => number;
    getWidthFromHeight: (maxColumnDynamic: any, resizeRatio: any, initWid: any) => {
        getWidth: any;
        windowCenter: boolean;
    };
    window_Tile_CasCade: (isThisCasCade: any, totWinObj: any) => void;
    windowAutoFocusCompleted: (type: any, winObj: any) => void;
}
