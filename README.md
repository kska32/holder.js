# holder.js
웹페이지에서 가끔 버튼이나 한 엘리먼트를 N밀리초간 마우스 혹은 터치로 누르고 있거나 눌렀다가 포기했을시 탐지가 필요할때.


### 설명
## How to use
#### ES2015 module 방식:
 <pre>
    <script type='module'>
        import {Holder} from './holder.js';
    </script>
</pre>

#### 설명:
<pre>
Holder($$selector,param = {
        min:0, max:20, interval:30, 
        stepWidthPlus:1, stepWidthMinus:1,
        showState:(cur,param)=>{ throw "the callback must be implemented!" ;}
 });
 
 
 $$selector： 그냥 순수한 셀럭터입니다. css3의 셀럭터 문법과 동일합니다. 
 param: 누르고 있을시 필요한 파라미터들입니다.
              min최소치(한동안 누르고 있지 않을때의 상태를 표시하는 수치)
              max최대치(한동안 누르고 있으면 그치(值)가 누적(累积)되면서  최대치에 도달합니다)
              interval시간간격(요시간간격으로 점진적으로 누적됩니다)
              stepWidthPlus (매개 시간간격에 누적되는 수치, 누르고 있을시 이 수치로 매개시간겨으로 지금상태치가 늘어납니다)
              stepWidthMinus (매가 시간간격에 줄어드는 수치,  눌렀다고 포기했을시 이 수치로 매개시간격으로 줄어듭니다)
              showState:콜백함수; cur은 지금상태치이고 param은 Holder함수의 두번째파라미터의 지금 상태값입니다.
              
  예:
        let button = document.createElement("button");
        document.body.appendChild(button);
        button.setAttribute('value','holdme');
        div.classList.add('buttonX');
        Holder(".buttonX", {
                      min:0, max;100, interval:30,
                      stepWidthPlus:1, stepWidthMinus:2,
                      showState:(cur, param)=>{
                                   console.log(cur);
                      }
         });             
</pre>
