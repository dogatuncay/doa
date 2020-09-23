import css from "../css/app.scss"
import 'whatwg-fetch'
import init from './init'

// https://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
function ready(callback){
  if (document.readyState!='loading') callback();
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
  else document.attachEvent('onreadystatechange', function() {
      if (document.readyState=='complete') callback();
  });
}

ready(init);