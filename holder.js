export function Holder($$selector,param = {
        min:0, max:{n:20}, interval:30, 
        stepWidthPlus:1, stepWidthMinus:1,
        showState:(cur)=>{ throw "the callback must be implemented!" ;}
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
            param.showState(i);
            tids.push(setInterval(()=>{
                if(i>=param.max.n) {
                    clearTids(tids);
                    i = param.max.n;
                    stopit[0] = true;//达到目标值暂停一切间隔器
                }else{
                    i += stepWidthPlus;
                }
                param.showState(i);
            }, interval));
        }, (stopit)=>{
            clearTids(tids);
            tids.push(setInterval(()=>{
                if(i<=param.min){
                    clearTids(tids);
                    i = param.min;
                    //stopit[0] = true;
                }else{
                    i -= stepWidthMinus;
                }
                param.showState(i);
            }, interval));
        }
    );
}

/*
    //Example:
    Holder(".holdx",{
        min:0,max:100,interval:10,
        stepWidthPlus:1, stepWidthMinus:1,
        showState: (cur)=>{
            console.log(cur);
            
        }
    });
*/