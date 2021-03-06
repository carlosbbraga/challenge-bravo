module.exports = app => {
    
    const currencyModel = {};
    const currencyCoverageValues = app.data.currencyValues.currency;

    currencyModel.convertFromTo = (from, to, amount) => {

        if(typeof amount !== 'number' || isNaN(amount))
        {
            return failMessage('Amount should be a valid Number!');
        }

        let dolarValue = currencyModel.toDolar(amount, from);
        if(dolarValue.success)
        {
            return currencyModel.toCurrency(dolarValue.value, to);
        }
        
        return dolarValue;
    }
 
    /**
     * Converte valor recebido de moeda recebida (from) para Dolar
     * 
     * @param {number} amount 
     * @param {string} currency 
     * 
     * @return {array}
     */
    currencyModel.toDolar = (amount, currency) => {

        if(typeof amount !== 'number' || isNaN(amount))
        {
            return failMessage('Amount should be a valid Number!');
        }

        let convertedToDolar = currencyCoverageValues[currency];
        if(convertedToDolar)
        {  
            return {
                "success": true, 
                "value": amount/convertedToDolar
            }
        }
        else 
        {
            return failMessage('Currency ' + currency + ' not Available!');            
        }
    }

    /**
     * Converte valor de dólar para moeda recebida (to)
     * 
     * @param {number} amount 
     * @param {string} currency 
     */
    currencyModel.toCurrency = (amount, currency) => {

        if(typeof amount !== 'number' || isNaN(amount))
        {
            return failMessage('Amount should be a valid Number!');
        }

        let convertedToDolar = currencyCoverageValues[currency];
        if(convertedToDolar)
        {
            return {
                "success": true, 
                "currency": currency,
                "value": (amount * convertedToDolar).toFixed(2)
            }
        }
        else 
        {
            return failMessage('Currency ' + currency + ' not Available!');
        }
    }

    /**
     * Retorno de Mensagem com erro
     * 
     * @param {string} message 
     */
    failMessage = (message) => {
        return {
            "success": false,
            "errorMessage": message 
        };
    }

    return currencyModel;
}
