
var finalData = [];

function Portfolio(title, image, description, client, date, service) {

    this.title = title;
    this.image = image;
    this.description = description;
    this.client = client;
    this.date = date;
    this.service = service;

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


function getAllPortfolios() {
    
    portfolioRef.on('value', snapshot => {


        let data = snapshot.val();
        
        let counter = 0;
        
        for(let portfolio in data) {

            finalData.push({
                'key': Object.keys(data)[counter],
                'title': data[portfolio].title,
                'description': data[portfolio].description,
                'date': data[portfolio].date,
                'client': data[portfolio].client,
                'service': data[portfolio].service,
                'image': data[portfolio].image
            });

            paintPortfolio(finalData[counter], counter);

            counter++;

        }

        //paintPortfolio(data);

        console.log(finalData);
    })
}

function paintPortfolio(data, counter) {
    let body = `
    <div class="col-sm-4 portfolio-item float-left">
        <a class="portfolio-link">
            <div class="caption">
                <div class="caption-content">
                    <i class="fa fa-search-plus fa-3x"></i>
                </div>
            </div>
            <img src="${data.image}" id="${data.key}" class="img-responsive img-portfolio" alt="${data.title}">
        </a>
    </div>
    `;

    //if(counter !== 0 && counter % 3 === 0) body += '<br>';

    document.querySelector('#portfolio-list').innerHTML += body;

}



document.querySelector('#portfolio-list').addEventListener('click', e => {
    console.log(e.target);
    if(e.target.nextElementSibling && e.target.nextElementSibling.className.includes('img-portfolio')) {
        //display modal
        //#portfolioModal1

        let data = finalData.filter(item => item.key === e.target.nextElementSibling.id)[0];

        //console.log('id ', data);
        document.querySelector('#project-title').innerText = data.title;
        document.querySelector('#project-description').innerText = data.description;
        //document.querySelector('#project-client').innerText = data.client;
        document.querySelector('#project-date').innerText = data.date;
        document.querySelector('#project-service').innerText = data.service;
        document.querySelector('#project-img').attributes.src = data.image;
        
        $('#portfolioModal1').modal();

    }

});

getAllPortfolios();