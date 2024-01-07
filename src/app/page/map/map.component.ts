import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import 'leaflet.heat';
import { ServiceData } from 'src/app/client/servicedata.client';
import { GetLocation } from 'src/utils/data';
import { HeatLayer } from 'src/utils/data';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  map: L.Map
  heat: any
  markerEvent = true
  heatEvent = true
  legend: any
  arrayMarker = new Set<string>()
  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 57,
        attribution: "© OpenStreetMap contributors"
      })
    ],
    zoom: 10,
    center: L.latLng(6.930830, 126.280320)
  }



  customControl = L.Control.extend({
    options: {
      position: 'bottomright'
    },
    onAdd(map){
      let container = L.DomUtil.create('div','leaflet-bar leaflet-control leaflet-control-custom')
      container.innerHTML = '<button>HeatMap</button>'
      return container
    }
  })

  heatLayer: HeatLayer[] = []

  constructor(private serviceData: ServiceData){}

  markers: GetLocation[] = []
  rmMarker: L.Marker[] = []
  popupText = "Some popup text";

  private fetchData(){
    // this.serviceData.getLocationReport().subscribe(
    //   (response)=>{
    //     this.markers = response
    //   }
    // )
    this.serviceData.getLocationCase().subscribe(
      (response)=>{
        response.forEach(data=>{
          this.markers.push(data)
        })
        this.markers.forEach(marker => {
          this.heatLayer.push({
            lat: marker.lat,
            lng: marker.lng,
            value: 1
          })
          this.arrayMarker.add(JSON.stringify({icon: marker.icon, label: marker.label}))
        })
        setTimeout(()=>{
          this.addHeatLayer(false)
        }, 100)
      }
    )
  }

  onMapReady(map: L.Map) {
    this.map = map;
    (L.Control as any).geocoder().addTo(map)
  }
  open = false

  ngOnInit(): void {
    this.customControl
    this.fetchData()
    setTimeout(() => {
      this.open = true
    }, 100);
  }

  addMarkers() {
    if(this.markerEvent){
      this.markers.forEach(marker => {
        var popup = new L.Popup().setContent(marker.content)
        let ma = L.marker([marker.lat, marker.lng], { icon: L.icon({ iconUrl: marker.icon, iconSize: [30, 30] }) })
          .bindPopup(popup)
          .addTo(this.map);
          this.rmMarker.push(ma)
      });
      this.map.removeLayer(this.heat)
      this.addLegend()
      this.markerEvent = false
      this.heatEvent = true
    }
  }

  addHeatLayer(type) {
    if(this.heatEvent){
      this.heat = (L as any).heatLayer(this.heatLayer, {
        radius: 25,
        minOpacity: 0.4,
        gradient: {0.4: 'blue', 0.75: 'lime', 1: 'red'}
      })
      this.heat.addTo(this.map)
      if(type){
        this.rmMarker.forEach(marker => {
          this.map.removeLayer(marker)
        })
        this.map.removeControl(this.legend)
      }
      this.markerEvent = true
      this.heatEvent = false
    }
  }

  addLegend() {
    this.legend = (L as any).control({ position: 'bottomright' })
    this.legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'legend')
      const labels = []
      div.style.backgroundColor = 'white'
      div.style.padding = '7px'
      div.style.borderRadius = '3px'
      div.style.color = '#333'
      const array = Array.from(this.arrayMarker).map(el => JSON.parse(el))

      array.forEach(el => {
        console.log(el)
        labels.push('<div style="text-align: center"><img src="' + el.icon + '" style="width: 23px; height: 23px; margin: auto" alt="marker" /> '+el.label+'</div')
      })

      div.innerHTML = labels.join('<br>')
      return div
    }

    this.legend.addTo(this.map)
  }
}
