export function Holder($$selector,param = {
        min:0, max:20, interval:30, 
        stepWidthPlus:1, stepWidthMinus:1,
        showState:(cur,param)=>{ throw "the callback must be implemented!" ;}
    }){   

    let tids = [];
    let i = param.min;//current number
    //const lastNum = param.max;

    const interval = param.interval;
    const stepWidthPlus = param.stepWidthPlus;
    const stepWidthMinus = param.stepWidthMinus;

    let stopit = [false];

    let isBtDown = false;
    function mouseHold($selector,startCallback, endCallback){
        ["mousedown","touchstart"].forEach((v)=>{
            let selector = document.querySelector($selector);
            selector.addEventListener(v,(e)=>{
                isBtDown = true;
                if(isBtDown && !stopit[0]) startCallback(stopit);  
            });
        });

        ["mouseup","touchend","mouseleave"].forEach((v)=>{
            let selector = document.querySelector($selector);
            selector.addEventListener(v,(e)=>{
                    isBtDown = false;
                    if(!isBtDown && !stopit[0] ) endCallback(stopit); 
            });
        });
    }

    function clearTids(arrays){
        while(arrays.length){
            clearInterval(arrays.pop());
        }
    }

    mouseHold($$selector,
        (stopit)=>{//stopit is array
            clearTids(tids);
            param.showState(i, param);
            tids.push(setInterval(()=>{
                if(i>=param.max) {
                    clearTids(tids);
                    i = param.max;
                    stopit[0] = true;//达到目标值暂停一切间隔器
                    param.terminated = true;
                    param.running = false;
                }else{
                    param.initialized = false;
                    param.terminated = false;
                    param.running = true;
                    i += stepWidthPlus;
                }
                param.showState(i,param);
            }, interval));
        }, (stopit)=>{
            clearTids(tids);
            tids.push(setInterval(()=>{
                
                if(i<=param.min){
                    clearTids(tids);
                    i = param.min;
                    param.initialized = true;
                    param.running = false;
                    //stopit[0] = true;
                }else{
                    param.initialized = false;
                    param.terminated = false;
                    param.running = true;
                    i -= stepWidthMinus;
                }
                param.showState(i,param);
            }, interval));
        }
    );
}

/*
    //Example:
    Holder(".holdx",{
        min:0,max:100,interval:10,
        stepWidthPlus:1, stepWidthMinus:1,
        showState: (cur, param)=>{
            console.log(cur);
            
        }
    });
*/
