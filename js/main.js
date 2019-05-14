var budgetController =(function(){
    var Expenses = function(id , desc , val){
        this.id = id;
        this.desc = desc;
        this.val = val;
    };
    var Incomes = function(id, desc , val){
        this.id = id;
        this.desc = desc;
        this.val = val;
    };
    var data ={
        allItems:{
            income:[],
            expenses:[]
        },
        totals:{
            incomes:0,
            expenses:0
        }
    }
    return {
        addItem:function(type, desc, val){
            var newItem,ID;
            // Create New ID
            if(data.allItems[type].length>0){
                ID = data.allItems[type][data.allItems[type].length-1].id+1;
            }else{
                ID=0;
            }
            //create new item 
            if(type === 'expenses'){
                newItem = new Expenses(ID,desc,val)
            }else if(type === 'income'){
                newItem = new Incomes (ID,desc,val)
            };
            // push new item to data
            data.allItems[type].push(newItem);
            //return new item
            return newItem;
        },
        testing:function(){
            console.log(data);
        }
    }
})();

var uiController=(function(){
    var DomStrings = {
        inputType:'.add-select',
        inputDesc:'#description',
        inputVal:'#value',
        inputButt:'.add-value',
        incContainer:'.container-inc',
        expContainer:'.container-exp'
    }
    return {
        getInput:function(){
            return{
                type:document.querySelector(DomStrings.inputType).value,
                description:document.querySelector(DomStrings.inputDesc).value,
                value:document.querySelector(DomStrings.inputVal).value
            }
        },
        addListItem:function(obj,type){
            var html , newHtml , element;
            //Create placeholder text
            if(type === 'income'){
                element=DomStrings.incContainer;
                html='<div class="data" id="income-%id%"><div class="name float-left"><p>%description%</p></div><div class="amount-income float-right"><span id="amount-income">%value%</span><span id="removeIncome"><i class="far fa-times-circle"></i></span></div><div class="clearfix"></div></div>';
            }else if(type === 'expenses'){
                element=DomStrings.expContainer;
                html='<div class="data" id="expenses-%id%"><div class="name float-left"><p>%description%</p></div><div class="amount-expenses float-right"><span id="amount-expenses">%value%</span><span id="percentage-exp">25%</span><span id="removeExpenses"><i class="far fa-times-circle"></i></span></div><div class="clearfix"></div></div> ';
            };
            // Replace placeholder text to my data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.desc);
            newHtml = newHtml.replace('%value%',obj.val);
            // add items to UI
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },
        //function to clears Inputs
        clearFields:function(){
            var fields,fieldsArr;
            fields = document.querySelectorAll(DomStrings.inputDesc+','+DomStrings.inputVal);
            fieldsArr = Array.prototype.slice.call(fields)
            fieldsArr.forEach(cur=>cur.value='');
        },
        getDom:function(){
            return DomStrings;
        }
    }
})();

var mainController =(function(budgCtrl , uiCtrl){
    var setupEventListener = function(){
        var Dom=uiCtrl.getDom();
        document.querySelector(Dom.inputButt).addEventListener('click',addItem);
        document.addEventListener('keypress',function(ev){
            if(ev.keyCode === 13 || ev.which ===13){
                addItem();
            }
        });
    }
    var addItem = function(){
        
        //1.Get the field input data.
        var getValues = uiCtrl.getInput();
        //2.Add the item to the budget controller.
        var newItem=budgCtrl.addItem(getValues.type,getValues.description,getValues.value);
        //3.Add the item to the UI.
        uiCtrl.addListItem(newItem,getValues.type);
        //4.Calculate the Budget.

        //5. Clear fields.
        uiCtrl.clearFields();
        //6.Display the Budget on the UI.
    };

    return {
        init:function(){
            setupEventListener();
        }
    }

})(budgetController,uiController);

mainController.init();