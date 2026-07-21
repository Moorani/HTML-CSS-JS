const xhr = new XMLHttpRequest;


// response takes time to come back, so this event waits until 'load' response is available so that we can see it on console. 
// xhr.addEventListener('load', () => {
//     console.log(xhr.response);
// })

xhr.open('GET', 'https://supersimplebackend.dev/');
xhr.send();
