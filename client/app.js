const searchBtn = document.querySelector("#search-btn");
searchBtn.onclick = () => {
  const symbol = document.querySelector("#symbol-input").value;  
  ajaxGet(`/api/stocks?symbol=${symbol}`);
};

const ajaxGet = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${url}`);
  xhr.send(null);

  xhr.onreadystatechange = () => {
    const DONE = 4; 
    const OK = 200; 
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        console.log(xhr.responseText);
      } else {
        console.log('Error: ' + xhr.status);
      }
    }
  };
}