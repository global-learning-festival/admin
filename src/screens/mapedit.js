import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import Image from '../assets/school.jpeg';
import waterMarker from '../assets/marker/water.png';
import registerMarker from '../assets/marker/register.png';
import conferenceMarker from '../assets/marker/conference.png';
import toiletMarker from '../assets/marker/toilet.png';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import '../styles/map.css';
import Redmarker from '../assets/marker.png';
import '../styles/marker.css';

const AdminMap = () => {
  const position = [1.310411032362568, 103.77767848691333];
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [location_name, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/markers');
        setMarkers(response.data);
        console.log('Refill data:', response.data);
      } catch (error) {
        console.error('Error fetching refill locations:', error);
      }
    };

    fetchData();
  }, []);

  const mapRef = useRef();

  const handleMapClick = (e) => {
    setSelectedPosition(e.latlng);
  };

  const markericon = L.icon({
    iconUrl: Redmarker,
    iconSize: [19, 35],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const RightClickDisplay = () => {
    const map = useMapEvents({
      contextmenu: (e) => {
        console.log('coords', e.latlng);
        const display = document.getElementById('coordinates-display');
        display.innerHTML = `Right click coordinates:<br>Latitude and Longitude:(${e.latlng.lat.toFixed(6)},${e.latlng.lng.toFixed(6)})`;
        setSelectedPosition(e.latlng);
      },
    });
    return null;
  };

  const Addlocation = async () => {
    try {
      const response = await axios.post('http://localhost:5000/marker', {
        location_name,
        description,
        category,
        coordinates: `${selectedPosition.lat},${selectedPosition.lng}`, // Convert to string
      });

      console.log('Added Information:', response.data);

      toast.success('Information added successfully', { position: toast.POSITION.TOP_RIGHT});

      setLocation('');
      setDescription('');
      setCategory('');
      setSelectedPosition(null);
    } catch (error) {
      console.error('Error adding information:', error);

      toast.error('Error adding information. Please try again.', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <div className="admin-map-container">
      <div id="markerlist" style={{ width: '50%', float: 'left', marginRight: '10px', marginTop: '2%' }}>
        <MapContainer center={position} zoom={16} style={{ width: '100%', height: '800px' }} ref={mapRef}>
          <TileLayer
            url="https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png"
            attribution='Map data © <a href="https://www.onemap.sg/" target="_blank">OneMap</a>'
          />

          {markers.map((markerlocation) => {
            let iconUrl;
            switch (markerlocation.category) {
              case 'water':
                iconUrl = waterMarker;
                break;
              case 'register':
                iconUrl = registerMarker;
                break;
              case 'conference':
                iconUrl = conferenceMarker;
                break;
              case 'toilet':
                iconUrl = toiletMarker;
                break;
              default:
                iconUrl = waterMarker;
            }

            const customIcon = L.icon({
              iconUrl: iconUrl,
              iconSize: [18, 29],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
            });

            const coordinates1 = markerlocation.coordinates.split(',').map((coord) => parseFloat(coord));
            console.log('Refill Location:', coordinates1);
            return (
              <Marker key={markerlocation.mapid} position={coordinates1} icon={customIcon}>
                <Popup>
                  <div id={`divRefill${markerlocation.mapid}`}>
                    <h3 id={`Refill${markerlocation.mapid}`}>{markerlocation.location_name}</h3>
                    <img src={Image} alt="Myself" />
                    <p>{markerlocation.description}</p>
                    <button id="RefillButton">{`Edit marker`}</button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <div id="form" style={{ width: '40%', float: 'right', marginLeft: '10px' }}>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Add Marker</h1>

          <div className="mb-4">
            <label htmlFor="Location_name" className="block text-sm font-medium text-gray-600">
              Location Name
            </label>
            <input
              type="text"
              id="Location_name"
              name="Location_name"
              value={location_name}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Choose Location
            </label>

            <MapContainer
              center={[1.3521, 103.8198]}
              zoom={13}
              style={{ height: '500px', width: '100%' }}
              onClick={handleMapClick}
            >
              <TileLayer
                url="https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png"
                attribution='Map data © <a href="https://www.onemap.sg/" target="_blank">OneMap</a>'
              />

              {selectedPosition && (
                <Marker position={selectedPosition} icon={markericon}>
                  <Popup>Selected Location</Popup>
                </Marker>
              )}
              <RightClickDisplay />
            </MapContainer>
            <div id="coordinates-display" className="coordinates-display">
              Right click on the map to see the coordinates
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-600">
              category
            </label>
            <select
              id="location"
              name="location"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select a location</option>
              <option value="water">Water Refill Station</option>
              <option value="register">Registration Counter</option>
              <option value="conference">Conference Room</option>
              <option value="toilet">Toilet</option>
            </select>
          </div>

          <button
            onClick={Addlocation}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminMap;