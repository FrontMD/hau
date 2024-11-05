

function cMap() {
    const mapBlocks = document.querySelectorAll('[data-js="cMap"]')

    if(mapBlocks.length < 1) return

    mapBlocks.forEach(mapBlock => {
        const mapContainer = mapBlock.querySelector('[data-js="cMapContainer"]')
        const mapPlacemarks = mapBlock.querySelectorAll('[data-js="cMapPlacemark"]')
    
        ymaps.ready(function () {
    
            let center = mapPlacemarks.length > 0 ? mapPlacemarks[0].dataset.coords.replace(/\s/g,"").split(",") : [46.642435, 32.584581]
            
            let windowWidth = window.innerWidth
            let zoom = 13;
    
            if(windowWidth < 1023) {
                zoom = 14
            }
        
            const map = new ymaps.Map(mapContainer, {
                center: center,
                zoom: zoom,
                controls: []
            });

            
            if(windowWidth > 1023) {
                var pixelCenter = map.getGlobalPixelCenter();
    
                pixelCenter = [
                    pixelCenter[0] - 200,
                    pixelCenter[1]
                ];
    
                var geoCenter = map.options.get('projection').fromGlobalPixels(pixelCenter, map.getZoom());
                
                map.setCenter(geoCenter);
            }
    
            let myGeoObjects = []
            
            mapPlacemarks.forEach(placemark => {
                
                let currentPlacemark = new ymaps.Placemark(
                    placemark.dataset.coords.replace(/\s/g,"").split(","),
                    {},
                    {
                        openEmptyBalloon: true,
                        iconLayout: 'default#image',
                        iconImageHref: '../img/placemark.png',
                        iconImageSize: [40, 40],
                        iconImageOffset: [-20, -20],
                    }
                );

                const modal = document.querySelector('[data-js="cMapAddressModal"]')
    
                if(modal) {
                    currentPlacemark.events.add('click', function (e) {
                        e.preventDefault()
                        e.stopPropagation()
                        openAdressModalById(modal, placemark)
                    })
                }
    
                myGeoObjects.push(currentPlacemark)
               
            });
    
            var clusterer = new ymaps.Clusterer({
                gridSize: 120,
                preset: 'islands#darkGreenClusterIcons'
            });

            clusterer.add(myGeoObjects);

            map.geoObjects.add(clusterer);
    
    
         });
    })

}

function openAdressModalById(modal, currentAddressBlock) {
    modal.querySelector('[data-js="modalInner"]').innerHTML = currentAddressBlock.innerHTML

    modals.open(modal)
}