var budgetController =(function(){
    var Expenses = function(id , desc , val){
        this.id = id;
        this.desc = desc;
        this.val = val;
        this.percentage = -1;
    };
    Expenses.prototype.calculatePerc=function(totoalInc){
        if(totoalInc >0){
            this.percentage = Math.round((this.val /totoalInc )*100);
        }else{
            this.percentage=-1;
        }
    }
    Expenses.prototype.getPerc=function(){
        return this.percentage;
    }
    var Incomes = function(id, desc , val){
        this.id = id;
        this.desc = desc;
        this.val = val;
    };
    var calculateTotal= function(type){
        var sum = 0 ;
        data.allItems[type].forEach(function(cur){
            sum += cur.val;
        })
        data.totals[type]=sum;
    }
    var data ={
        allItems:{
            income:[],
            expenses:[]
        },
        totals:{
            incomes:0,
            expenses:0
        },
        budget:0,
        percentage:-1,
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
        calculateBudegt:function(){
            //calc total inc or exp
            calculateTotal('income');
            calculateTotal('expenses');
            //calc budget
            data.budget = data.totals.income-data.totals.expenses;
            //calc percentage
            if(data.totals.income >0){
                data.percentage=Math.round((data.totals.expenses / data.totals.income)*100)
            }else{
                data.percentage =-1;
            }
        },
        getBudget:function(){
            return{
                totlatInc:data.totals.income,
                totalExp:data.totals.expenses,
                budget:data.budget,
                percentage:data.percentage,
            }
        },
        deleteFromData(type,id){
            var ids , index;
            ids = data.allItems[type].map(el => {
                return el.id;
            });
            index =ids.indexOf(id);
            
            if(index !== -1){
                data.allItems[type].splice(index,1);
            }
        },
        calcPercentage:function(){
            data.allItems.expenses.forEach(function(cur){
                cur.calculatePerc(data.totals.income);
            })
        },
        getPercentages:function(){
            var allPercentages = data.allItems.expenses.map(function(cur){
                return cur.getPerc();
            })
            return allPercentages;
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
        expContainer:'.container-exp',
        budgetLabel:'#total',
        incomeLabel:'#income',
        expensesLabel:'#expenses',
        percentageLabel:'#percentage',
        container:'.all-data',
        percLabel:'#percentage-exp',
        date:'#date'
    }
    var formatNum = function(num , type){
        var splitNum , int , dec;
        num = Math.abs(num);
        num = num.toFixed(2);
        splitNum = num.split('.');
        int = splitNum[0];
        if(int.length>3){
            int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,int.length); 
        }
        dec = splitNum[1];
        
        return (type === 'expenses' ? '-' : '+')+int + '.' +dec
    }
    return {
        getInput:function(){
            return{
                type:document.querySelector(DomStrings.inputType).value,
                description:document.querySelector(DomStrings.inputDesc).value,
                value:Number(document.querySelector(DomStrings.inputVal).value)
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
            newHtml = newHtml.replace('%value%',formatNum(obj.val,type));
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
        displayBudget(obj){
            var type;
            obj.budgCtrl > 0 ? type = 'expenses' : type= 'income';
            document.querySelector(DomStrings.budgetLabel).textContent=formatNum(obj.budget,type);
            document.querySelector(DomStrings.incomeLabel).textContent=formatNum(obj.totlatInc,'income');
            document.querySelector(DomStrings.expensesLabel).textContent=formatNum(obj.totalExp,'expenses');
            document.querySelector(DomStrings.percentageLabel).textContent=obj.percentage;

            if(obj.percentage >0){
                document.querySelector(DomStrings.percentageLabel).textContent=obj.percentage + '%';
            }else{
                document.querySelector(DomStrings.percentageLabel).textContent='--'
            }
        },
        deleteItemFromUi(selectedId){
            element =document.getElementById(selectedId);
            element.parentNode.removeChild(element);
        },
        getDom:function(){
            return DomStrings;
        },
        displayPercentages:function(per){
            var perLabel =document.querySelectorAll(DomStrings.percLabel);
            var allNode = function(list,callBack){
                for(var i =0 ; i<list.length;i++){
                    callBack(list[i],i);
                }
            }
            allNode(perLabel,function(cur,index){
                if(per[index]>0){
                    cur.textContent =per[index] + '%';
                }else{
                    cur.textContent ="----";
                }
            })
        },
        displayDate:function (){
            var getFullDate , getMonth , getYear  ,months ;
            var months = ['January' ,'February' ,'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December']
            getFullDate = new Date();
            getYear = getFullDate.getFullYear();
            getMonth = getFullDate.getMonth();
            document.querySelector(DomStrings.date).textContent = months[getMonth] + ' ' +getYear;
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
        document.querySelector(Dom.container).addEventListener('click',deleteItem)
    }
    var updateBudget=function(){
        //1.Calculate the Budget.
        budgCtrl.calculateBudegt();
        //2.Return the budget
        var budget = budgCtrl.getBudget();
        //3.Display the Budget on the UI.
        uiCtrl.displayBudget(budget);
    }
    var addItem = function(){
        
        //1.Get the field input data.
        var getValues = uiCtrl.getInput();
        if(getValues.description !== '' && !isNaN(getValues.value) && getValues.value >0 ){
        //2.Add the item to the budget controller.
            var newItem=budgCtrl.addItem(getValues.type,getValues.description,getValues.value);
        //3.Add the item to the UI.
            uiCtrl.addListItem(newItem,getValues.type);
        //4. Clear fields.
            uiCtrl.clearFields();
        //5.calculate and update the budget
            updateBudget();
            // budgCtrl.testing()
        //6. update percenetages
        updatePercenatge();
        }
    
    };
    var deleteItem=function(e){
        var itemID = e.target.parentNode.parentNode.parentNode.id;
        if(itemID){
            var ids , ID , Type;
            ids= itemID.split('-');
            TYPE = ids[0];
            ID = Number(ids[1]);
        }
        // DElete from data
        budgCtrl.deleteFromData(TYPE,ID)
        // DELETE FROM UI
        uiCtrl.deleteItemFromUi(itemID);
        // UPDATE BUDGET
        updateBudget();
        //update percenetages
        updatePercenatge();
    }
    var updatePercenatge = function(){
        // calc percenetage
        budgCtrl.calcPercentage();
        //read percenetage from the budget ctrl
        var perc = budgCtrl.getPercentages();
        //Update the Ui
        uiCtrl.displayPercentages(perc)
    }
    return {
        init:function(){
            setupEventListener();
            uiCtrl.displayDate();
            uiCtrl.displayBudget({
                totlatInc:0,
                totalExp:0,
                budget:0,
                percentage:0})
        }
    }

})(budgetController,uiController);

mainController.init();