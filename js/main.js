var budgetController =(function(){
    //Some Code.
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
    
    var Dom=uiCtrl.getDom();

    var addItem = function(){
        
        //1.Get the field input data.
        var getValues = uiCtrl.getInput();
        console.log(getValues)

        //2.Add the item to the budget controller.

        //3.Add the item to the UI.

        //4.Calculate the Budget.

        //5. Clear fields.

        //6.Display the Budget on the UI.
    };

    document.querySelector(Dom.inputButt).addEventListener('click',addItem);
    document.addEventListener('keypress',function(ev){
        if(ev.keyCode === 13 || ev.which ===13){
            addItem();
        }
    });

})(budgetController,uiController);