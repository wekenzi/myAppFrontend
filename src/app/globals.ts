export const Globals = {
    // Url:'http://localhost:3000/'
    Url:'https://wekeapp.herokuapp.com/'   
}

export function GetTime(date:Date){
    let offset = new Date().getTimezoneOffset();
    if(offset<0){
        return new Date(date.getTime() + (Math.abs(offset)) * 60000);
    }else{
        return new Date(date.getTime() - (Math.abs(offset)) * 60000);
    }
}

export function StringToDate(string:string){
    let offset = new Date(string).getTimezoneOffset();
    if(offset>0){
        return new Date(new Date(string).getTime() + (Math.abs(offset)) * 60000);
    }else{
        return new Date(new Date(string).getTime() - (Math.abs(offset)) * 60000);
    }
}

export function callRtlStyle(){
    document.body.style.direction = "rtl";
    if(!document.getElementById('rtl-doc')){
      let head = document.getElementsByTagName('head')[0];
      let link  = document.createElement('link');
      link.id   = 'rtl-doc';
      link.rel  = 'stylesheet';
      link.href = './assets/bootstrap-ar.min.css';
      head.appendChild(link);
    }
}

export function  removeRtlStyle(){
    document.body.style.direction = "ltr";
    if(document.getElementById('rtl-doc')){
      let link = document.getElementById('rtl-doc');
      link.parentNode.removeChild(link);
    }
}
