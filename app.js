const express = require('express');
const fetch = require('node-fetch');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res)=>{
        var arr = [];
        const data = await fetch(
            "https://api.wazirx.com/api/v2/tickers"
        );
        let response = await data.json();
        var ct = 0;
        for (const [key, value] of Object.entries(response))
        {
            arr.push({
                [key]: value
            });
            ct++;
            if(ct == 10)
            {
                break;
            }
        }
        //console.log(arr);
        res.render('index', {arr: arr});
})

app.listen(process.env.PORT || 3000 , ()=>{
    console.log("Server Started");
})
