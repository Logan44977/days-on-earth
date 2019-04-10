const express = require('express');
const DateDiff = require('date-diff');
var path = require('path');

// let ejs = require('ejs');
const app = express();

app.listen(3002, ()=> console.log('Server started on port 8080'));


app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

const dates = [
    {name: 'Price', birthdate: new Date(1987, 7, 16)},
    {name: 'Scheifele', birthdate: new Date(1993,2,15)},
    {name: "Crosby", birthdate: new Date(1987, 7, 7)}, 
    {name: "Matthews", birthdate: new Date(1997, 8, 17)},
    {name: "McDavid", birthdate: new Date(1997, 0, 13)},
    {name: "Stamkos", birthdate: new Date(1990, 1, 7)}
]

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let d = new Date();
const today = new Date(d.getFullYear(), d.getMonth(), d.getDate());

let days = [];
let total = 0;

dates.forEach(date => {
    var diff = new DateDiff(today, date.birthdate);
    let x = numberWithCommas(diff.days());
    days.push(x);
    total += parseInt(diff.days());
});

total = numberWithCommas(total);

app.get('/', (req, res) => {
    res.render('index', {page:'Home', menuId:'home', Price: days[0], Scheifele: days[1], Crosby: days[2], Matthews: days[3], McDavid: days[4], Stamkos: days[5], Days: total});
  });
