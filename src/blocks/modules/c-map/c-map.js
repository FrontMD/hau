

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
                        iconImageHref: "data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.2'%3E%3Ccircle cx='18' cy='18' r='18' fill='%2304412B'/%3E%3Ccircle cx='18' cy='18' r='18' fill='%2304412B'/%3E%3C/g%3E%3Ccircle cx='18' cy='18' r='9' fill='%2304412B'/%3E%3Ccircle cx='18' cy='18' r='9' fill='%2304412B'/%3E%3C/svg%3E%0A",
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