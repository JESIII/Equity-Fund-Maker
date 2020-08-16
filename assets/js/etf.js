var num = 1;
function addRow(){
  $(".btn").mouseup(function(){
    $(this).blur();
  })
    var table = document.getElementById("stonks")
    var newRow = document.createElement("tr")
    newRow.setAttribute("id", "row" + num)
    var col1 = document.createElement("td")
    var textField1 = document.createElement("input")
    textField1.type = "text"
    textField1.setAttribute("id", "symbol" + num) 
    col1.appendChild(textField1)
    var col2 = document.createElement("td")
    var textField2 = document.createElement("input")
    textField2.type = "text"
    textField2.setAttribute("id","alloc" + num)
    col2.appendChild(textField2)
    newRow.appendChild(col1)
    newRow.appendChild(col2)
    var pps = newRow.appendChild(document.createElement("td"))
    pps.setAttribute("id", "pps" + num)
    var quant = newRow.appendChild(document.createElement("td"))
    quant.setAttribute("id", "quant" + num)
    var eq = newRow.appendChild(document.createElement("td"))
    eq.setAttribute("id", "eq" + num)
    newRow.appendChild(pps)
    newRow.appendChild(quant)
    newRow.appendChild(eq)
    table.appendChild(newRow)
    num += 1
}
function delRow(){
  $(".btn").mouseup(function(){
    $(this).blur();
  })
    var table = document.getElementById("stonks")
    if (table.hasChildNodes()) {
      var rows = table.childElementCount
        table.removeChild(table.childNodes[rows+1]);
      }
}
function getQuote(symbol, i, availCap, table){
  console.log(i)
  var settings = {
    "url": "https://finnhub.io/api/v1/quote?token=bsnpc1nrh5rctp1flcd0&symbol=" + symbol,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Cookie": "__cfduid=d404aa8f0146ae8a0c5ecc746e85c294d1597517827"
    },
  };
  $.ajax(settings).done(function (response) {
    var alloc = document.getElementById("alloc" + (i)).value / 100 * availCap
    var quan = Math.floor(alloc / response.pc)
    var eq = quan * response.pc
    console.log(i)
    document.getElementById("quant"+(i)).innerText = quan
    document.getElementById("pps"+(i)).innerText = response.pc
    document.getElementById("eq"+(i)).innerText = eq
    availCap = availCap - eq
  });
}
function autoBalance(){
  $(".btn").mouseup(function(){
    $(this).blur();
  })
    var table = document.getElementById("stonks")
    var rows = table.childElementCount
    var availCap = document.getElementById("availCapital").value
    for(var i = 0; i < rows; i++){
        var symbol = document.getElementById("symbol"+i).value.toUpperCase()
        console.log(symbol)
        getQuote(symbol, i, availCap, table)
    }
}