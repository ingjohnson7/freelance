document.querySelector('#portfolio-form').addEventListener('submit', e => {
    
    addProjectToPortfolio();

    //getAllPortfolios();

    e.preventDefault();
});


function addProjectToPortfolio() {

    let title = document.querySelector('#title');
    let description = document.querySelector('#description');
    let client = document.querySelector('#client');
    let date = document.querySelector('#date');
    let service = document.querySelector('#service');
    let image = document.querySelector('#image').files[0];

    //const project = new Portfolio(title, image, description, client, date, service);

    //console.log(project);

    imageToBase64(image).then(baseEnconded => {
        //console.log(baseEnconded);
        
        project = {
            "title": title.value,
            "description": description.value,
            "client": client.value,
            "date": date.value,
            "service": service.value,
            "image": baseEnconded
        };

        portfolioRef.push(project);

        title.value = '';
        description.value = '';
        client.value = '';
        
    });
    


}