/*宣告變數*/
const txt=document.querySelector(".txt");
const save=document.querySelector(".save");
const item= document.querySelector(".item");
const filter=document.querySelector(".filter");
const btnAll=document.querySelector(".btnAll");
const btnUndo=document.querySelector(".btnUndo");
const btnDone=document.querySelector(".btnDone");
const box=document.querySelector(".box");
const undoItem=document.querySelector(".undoItem");
const clear=document.querySelector(".clear");
const list=document.querySelector(".list");

/*todolist data*/
let data=[];

/*新增邏輯*/

save.addEventListener("click",function(e){
    if(txt.value.trim()===""){
        alert("尚未輸入待辦事項");
        return;
    }
    addNew();
});
function addNew(){
    const obj = {}
    obj.content=txt.value,
    obj.status="undo"
    data.push(obj);
    renderData();
    txt.value="";
};

/*篩選器點擊更改樣式與確認按鈕執行函數*/
let filterCheck="完成";
filter.addEventListener("click",function(e){
    if(e.target.value =="全部"){
        btnAll.classList.add("selected");
        btnUndo.classList.remove("selected");
        btnDone.classList.remove("selected");
        filterCheck="完成";
        renderData();
    }else if(e.target.value =="待完成"){
        btnUndo.classList.add("selected");
        btnAll.classList.remove("selected");
        btnDone.classList.remove("selected");
        filterCheck="待完成";
        renderData();
    }else{
        btnDone.classList.add("selected");
        btnAll.classList.remove("selected");
        btnUndo.classList.remove("selected");
        filterCheck="已完成";
        renderData();
    };
});

/*資料預設載入*/
function renderData(){
    let str="";
    data.forEach(function(item,index){
        if(filterCheck=="完成"){
            str+=
            `<li class=${item.status} data-item=${index}>
            <input type="checkbox" class="box">
            <span>✔</span>
            <p class=toDo>${item.content}</p><input type="image" class="del" src="https://hexschool.github.io/js-todo/assets/cancel.jpg"></li>`
        }else if(filterCheck=="待完成"){
            if(item.status=="undo"){
                str+=
                `<li class=${item.status} data-item=${index}>
                <input type="checkbox" class="box">
                <span>✔</span>
                <p class=toDo>${item.content}</p><input type="image" class="del" src="https://hexschool.github.io/js-todo/assets/cancel.jpg"></li>`
            }
        }else if(filterCheck=="已完成"){
            if(item.status=="check"){
                str+=
                `<li class=${item.status} data-item=${index}>
                <input type="checkbox" class="box">
                <span>✔</span>
                <p class=toDo>${item.content}</p><input type="image" class="del" src="https://hexschool.github.io/js-todo/assets/cancel.jpg"></li>`
            }
        }
        
    })
    item.innerHTML=str;
    undocheck();
}


/*完成與刪除邏輯*/
item.addEventListener("click",function(e){
    let parent=e.target.parentNode;
    let num=parent.getAttribute("data-item");
    if(e.target.getAttribute("class")=="del"){
        data.splice(num,1);
    }else if(parent.className=="undo"){
        data[num].status="check";
    }else if(parent.className=="check"){
        data[num].status="undo";
    };
    renderData();  
});



/*待完成項目數量*/
function undocheck(){
let count=0;
let undoNum ="";
let undoAry=[];
data.forEach(function(item,index){
    if(item.status=="undo"){
        undoAry.push(item.content);
        count=undoAry.length;
    }
});
undoNum=`${count}個待完成項目`;
undoItem.innerHTML=undoNum;
}

/*清除已完成項目*/

list.addEventListener("click",function(e){
    if(e.target.value!=="清除已完成項目"){
        return;
    }else if(e.target.value=="清除已完成項目"){
        data.forEach(function(item,index){
            if(item.status=="check"){
                data.splice(index,data.length);
            };
        });
    }
    renderData();
});
