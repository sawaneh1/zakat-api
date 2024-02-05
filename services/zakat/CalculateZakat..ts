
export const calculateZakat = async (payload:any, nisab:any) =>{
    if(!payload){
       return {sucesss:false , data: null, message: 'No payload passed'}
        
    }
    let total_payable
    let   zakat_value
    let money_owned
    let debt
    const {pay_in, saved_cash, money_owed_to_you, business_assests, shares, value_of_gold, value_of_silver, other_personal_assest , mortgage_payments,overdraft, load_payment,  business_liability, other_liabilities, } = payload 

    if(pay_in == 'cash'){
            money_owned = saved_cash + money_owed_to_you + business_assests + shares + value_of_gold + value_of_gold + value_of_silver + other_personal_assest
            debt = mortgage_payments - overdraft + load_payment + business_liability + other_liabilities
        total_payable =  money_owned - debt

        
        console.log('payaable' , total_payable);

          if(nisab){
            console.log('in hereeeee',  total_payable >= nisab.amount ? total_payable - nisab.amount : 0);
            
             zakat_value =  total_payable >= nisab .amount? (total_payable - nisab.amount) * 0.25  : 0
                
             console.log('nisab',  nisab);
             return {sucesss:true , data: {zakat_value, money_owned, debt }, message: 'Calucalatiion was successful'}
          }else{
            return {sucesss:false , data: null, message: 'Somethinh went wrong!!!'}
          }
    

        
        
    } else if(pay_in == 'agriculcutural_products'){

    } else if(pay_in == 'gold'){
        
    }
    else if(pay_in == 'silver'){
        
    }

    else if(pay_in == 'zakat_animals'){
        
    }

}