document.querySelector('#portfolio-form').addEventListener('submit', e => {
    
    addProjectToPortfolio();

    e.preventDefault();
});


function addProjectToPortfolio() {

    let title = document.querySelector('#title');
    let description = document.querySelector('#description');
    let client = document.querySelector('#client');
    let date = document.querySelector('#date');
    let service = document.querySelector('#service');
    let images = document.querySelector('#image').files;

    console.log(images);

    project = {
        "title": title.value,
        "description": description.value,
        "client": client.value,
        "date": date.value,
        "service": service.value
    };

    let newItem = portfolioRef.push(project);

    saveImages(images, newItem.key)

    title.value = '';
    description.value = '';
    client.value = '';        

}


function imageToBase64(image) {

    return new Promise(resolve => {

        var fr = new FileReader;

        fr.onload = function() { // file is loaded
            var img = new Image;
        
            img.onload = function() {
                resolve(img.src);
            };
        
            img.src = fr.result; // is the data URL because called with readAsDataURL
        };
        
        fr.readAsDataURL(image);

    });
    
}

function saveImages(imagesArray, key) {

    imagesArray = Array.from(imagesArray);

    imagesArray.forEach(image => {
        
        imageToBase64(image).then(baseEnconded => {
            
            db.ref('images/').push({
                'key': key,
                'image': baseEnconded
            });            

        });

    });

}