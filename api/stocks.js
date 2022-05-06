const symbolDB = require('../symbols.json')
const Handler = require('../mongo/handler')

const request = require('request');
const config = require('../config.json');
const User = require('../mongo/users');
const caller = "stock handler"

const handler = new Handler(caller)

module.exports = class Stock {

    constructor() {

    }


    async hasStock(id, symbol) {

        let i;
        const userData = await handler.fetchData(id)

        //console.log("cuck", userData.stock)
        const stockArray = userData.stock;

        for (i = 0; i < stockArray.length; i++) {

            console.log(stockArray[i].name)

            if (stockArray[i].name.includes(symbol)) {

                return true
            }
            
            else {
                return false
            }
        }
    }



    isValidSymbol(symbol) {

        let hasValue = JSON.stringify(symbolDB).includes(symbol)

        return (hasValue ? true : false)
    }



    async getStocksPrice(symbol) {

        var url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${config.stockAPIkey}`;
        // console.log(url)
        // console.log(this.isValidSymbol(symbol))

        if (this.isValidSymbol(symbol)) {

            return new Promise((resolve) => {
                request.get(
                    {
                        url: url,
                        json: true,
                        headers: { "User-Agent": "request" },
                    },

                    (err, res, data) => {

                        if (err) {
                            console.log("Error:", err);
                        }

                        else if (res.statusCode !== 200) {
                            console.log("Status:", res.statusCode);
                        }

                        else {
                            // data is successfully parsed as a JSON object:
                            //console.log(data);
                            try {
                                resolve(data["Global Quote"]["05. price"]);
                            } catch {
                                return undefined;
                            }
                        }
                    }
                );
            });
        }

        else {
            return false
        }
    }

    async buyStock(id, symbol, amount) {

        const userData = await handler.fetchData(id)
        const userBalance = userData.balance;

        console.log(`user balance is ${userBalance}`)

        const stockPriceOfOne = Math.floor(await this.getStocksPrice(symbol) / 10)
        const finalStockPrice = stockPriceOfOne * amount

        if (finalStockPrice >= userBalance) {

            return false;

        }

        else {
            console.log(`bought ${amount} shares of ${symbol} for ${finalStockPrice} cookies`)

            handler.decBal(id, finalStockPrice)

                .then(async () => {
                    await this.giveShare(id, symbol, amount, finalStockPrice)
                    console.log(id, symbol, amount, finalStockPrice)
                    return true, finalStockPrice;
                })
        }
    }

    async giveShare(id, symbol, count, paidFeeOfOne) {

        const stake = [{
            name: symbol,
            priceAtPurchase: paidFeeOfOne,
            numberOfShares: count,
            dateOfPurchase: Date.now()
        }]

        //console.log(stake)

        let userNewStock = await User.findOneAndUpdate({ userID: id }, {
            $push: { stock: stake },
        })


        //console.log(userNewStock)
    }
}

