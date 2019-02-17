var ws = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=1089&l=RU");
ws.onopen = function(){
  console.log("connected");
  //init(); // Ну, поехали, млять
}
ws.onclose = function(event){
  if(event.wasClean){
    console.log("disconnected normally", event.code, event.reason);
  }else{
    alert("Обрыв соединения " + event.code + " по причине " + event.reason);
    window.location.reload();
  }
}
ws.onmessage = function(event){
  var result = JSON.parse(event.data);
  console.log(result);
}
ws.onerror = function(error){
  alert("[ERROR]:" + error.message);
}
// ---------------
// Отправка данных
// ---------------
function send_data(data){
  ws.send(JSON.stringify(data));
}