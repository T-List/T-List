/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import { InfoWindow } from 'google-maps-react';

const Marker = (options) => {
	const [marker, setMarker] = React.useState();


	React.useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker());
		}

		return () => {
			if (marker) {
				marker.setMap(null);
			}
		};
	}, [marker]);

	React.useEffect(() => {
		if (marker) {
			marker.setOptions(options);

			marker.addListener('click', (options) => {
				marker.changeCoords([marker.position.lat(), marker.position.lng()], marker.id)
				

				fetch('/api/' + marker.id)
				    .then(response => response.json())
			        .then(data => {
						
						marker.loadReviews(data);
						console.log(marker);
		
						const contentString = 
						`<div>
							<h1>` + marker.clinicName + `</h1>
							<ul>
								<li><strong>Address: </strong>` + marker.address +`</li>
								<li><strong>Contact info: </strong>` + marker.contact + `</li>
							</ul>
						</div>`
		
						const infoWindow = new google.maps.InfoWindow(
							{content: contentString}
						);
		
		
						infoWindow.open({
							anchor: marker,
							map: options.map,
							shouldFocus: true,
						});
					})	
			});
		}
	}, [marker]);
	return null;
};

export default Marker;