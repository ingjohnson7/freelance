
var finalData = [];

function Portfolio(title, image, description, client, date, service) {

    this.title = title;
    this.image = image;
    this.description = description;
    this.client = client;
    this.date = date;
    this.service = service;

}





function getAllPortfolios() {
    
    portfolioRef.on('value', snapshot => {

        let data = snapshot.val();

        let counter = 0;
        
        for(let portfolio in data) {

            var tempKeyReference = Object.keys(data)[counter];

            db.ref('images/').once('child_added', snap => {

                let image = snap.val();

                if(image.key == tempKeyReference) {
                                    
                    finalData.push({
                        'key': Object.keys(data)[counter],
                        'title': data[portfolio].title,
                        'description': data[portfolio].description,
                        'date': data[portfolio].date,
                        'client': data[portfolio].client,
                        'service': data[portfolio].service,
                        'image': image.image
                    });
        
                    paintPortfolio(finalData[counter], counter);
        
                    counter++;
                }
            });   
            

        }

    })
}

function paintPortfolio(data, counter) {console.log(data);
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

    if(e.target.nextElementSibling && e.target.nextElementSibling.className.includes('img-portfolio')) {
        //display modal
        //#portfolioModal1

        let data = finalData.filter(item => item.key === e.target.nextElementSibling.id)[0];

        document.querySelector('#project-title').innerText = data.title;
        document.querySelector('#project-description').innerText = data.description;
        document.querySelector('#project-date').innerText = data.date;
        document.querySelector('#project-service').innerText = data.service;
        //document.querySelector('#project-img').attributes.src = data.image;
        
        getAllPortfolioImages(data.key);

        $('#portfolioModal1').modal();

    }

});

getAllPortfolios();


function getAllPortfolioImages(key) {

    let imagesContainer = document.querySelector('#portfolio-images');
    
    let counter = 0;

    db.ref('images/').on('child_added', snap => {

        let image = snap.val();

        if(image.key === key) {
            
            if(counter === 0) {

                imagesContainer.innerHTML = '';
                paintMainImage(image.image);

            } 

            let imageElement = document.createElement('img');

            imageElement.setAttribute('src', image.image);
            imageElement.className = 'img-responsive img-centered img-thumbnail float-left';
            imageElement.setAttribute('width', '180');
            imageElement.setAttribute('height', '180');
            imageElement.title = 'Click to zoom';

            imageElement.onclick = () => {
                document.querySelector('#main-image').src = image.image;
            };

            imagesContainer.appendChild(imageElement);

            
            counter++;

        }
    });      


    function paintMainImage(image) {
        let mainImage = document.createElement('img');
        mainImage.className = 'img-responsive img-centered img-bordered';
        mainImage.setAttribute('src', image);
        mainImage.setAttribute('width', '90%');
        mainImage.setAttribute('height', '100%');
        mainImage.setAttribute('id', 'main-image');
        imagesContainer.appendChild(mainImage);     
    }

}