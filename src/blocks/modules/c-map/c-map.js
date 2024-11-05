

function cMap() {
    const mapBlocks = document.querySelectorAll('[data-js="cMap"]')

    if(mapBlocks.length < 1) return

    mapBlocks.forEach(mapBlock => {
        const mapContainer = mapBlock.querySelector('[data-js="cMapContainer"]')
        const mapPlacemarks = mapBlock.querySelectorAll('[data-js="cMapPlacemark"]')
    
        ymaps.ready(function () {
    
            let center = mapPlacemarks.length > 0 ? mapPlacemarks[0].dataset.coords.replace(/\s/g,"").split(",") : [46.642435, 32.584581]
            console.log(center)
            let windowWidth = window.innerWidth
            let zoom = 13;
    
            if(windowWidth < 769) {
                zoom = 13
            }
        
            const map = new ymaps.Map(mapContainer, {
                center: center,
                zoom: zoom,
                controls: []
            });
    
            let myGeoObjects = []
            
            mapPlacemarks.forEach(placemark => {
                
                let currentPlacemark = new ymaps.Placemark(
                    placemark.dataset.coords.replace(/\s/g,"").split(","),
                    {
                        balloonContentBody: `<div>ТЕСТ</div>`
                    },
                    {
                        openEmptyBalloon: true,
                        iconLayout: 'default#image',
                        iconImageHref: 'img/placemark.svg',
                        iconImageSize: [42, 60,5],
                        iconImageOffset: [-21, -40],
                    }
                );
    
                myGeoObjects.push(currentPlacemark)
               
            });
    
            myGeoObjects.forEach(item => {
                map.geoObjects.add(item);
            })
    
    
         });
    })


}