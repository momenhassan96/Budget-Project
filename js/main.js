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
            incomes:[],
            expenses:[]
        },
        totals:{
            incomes:0,
            expenses:0
        }
    }
})();

var uiController=(function(){
    var DomStrings = {
        inputType:'.add-select',
        inputDesc:'#description',
        inputVal:'#value',
        inputButt:'.add-value'
    }
    return {
        getInput:function(){
            return{
                type:document.querySelector(DomStrings.inputType).value,
                description:document.querySelector(DomStrings.inputDesc).value,
                value:document.querySelector(DomStrings.inputVal).value
            }
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

        //3.Add the item to the UI.

        //4.Calculate the Budget.

        //5. Clear fields.

        //6.Display the Budget on the UI.
    };

    return {
        init:function(){
            setupEventListener();
        }
    }

})(budgetController,uiController);

mainController.init();