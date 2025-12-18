import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/ui/dialog';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useState } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
   iconRetinaUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const DeliveryLocationModal = ({ openLocation, setOpenLocation }) => {
   // Dhaka coordinates
   const lat = 24.8435191;
   const lng = 89.3689139;
   const [location, setLocation] = useState({ lat: null, lng: null });

   const handleGetLocation = () => {
      if (!navigator.geolocation) {
         alert('Geolocation is not supported by your browser');
         return;
      }

      navigator.geolocation.getCurrentPosition(
         (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setLocation({ lat, lng });
            // console.log('Lat:', lat, 'Lng:', lng);
         },
         (err) => {
            console.error(err);
            alert('Unable to retrieve your location');
         }
      );
   };
   console.log(location)
   console.log(handleGetLocation)

   return (
      <Dialog open={openLocation} onOpenChange={setOpenLocation}>
         <DialogContent className="max-w-[600px] w-full">
            <DialogHeader>
               <DialogTitle>Delivery Location</DialogTitle>
               <DialogDescription>
                  View the delivery location on the map.
               </DialogDescription>
            </DialogHeader>

            <div className="my-4 h-[400px] w-full">
               <MapContainer
                  center={[lat, lng]}
                  zoom={13}
                  scrollWheelZoom={true}
                  className="h-full w-full"
               >
                  <TileLayer
                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[lat, lng]}>
                     <Popup>Delivery Location: Dhaka</Popup>
                  </Marker>
               </MapContainer>
            </div>

            <DialogFooter>
               <DialogClose asChild>
                  <Button variant="outline">Close</Button>
               </DialogClose>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default DeliveryLocationModal;
