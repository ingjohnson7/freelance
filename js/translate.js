window.addEventListener('DOMContentLoaded', function(){
    setLang();

});

var languagesJson = new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            resolve(this.response);           
        }
    };
    xhr.open('get', 'lang.json', true);
    xhr.send();
});


function changeLanguage(lang, event){
    if(typeof event != 'undefined')
       event.preventDefault();
    
    var selectors = document.querySelectorAll('.traducible');
    
    languagesJson.then(function(result){
        
        var translation = JSON.parse(result);
        var counter = 0;
        var size = selectors.length;
        
        for(counter; counter < size; counter++){
            var word = selectors[counter].attributes.key.value.trim();
            
            if(selectors[counter].tagName == "INPUT" || selectors[counter].tagName == "TEXTAREA"){
                selectors[counter].attributes.placeholder.value = translation[lang][word];
                selectors[counter].dataset.validationRequiredMessage = translation[lang][selectors[counter].dataset.key];                
                
            } else {
                selectors[counter].innerHTML = translation[lang][word];
            }                        
        }
    });
}

function setLang(){
    var lang = navigator.language.toString();
    if(lang.includes('es')){
        changeLanguage('es');
    }
}