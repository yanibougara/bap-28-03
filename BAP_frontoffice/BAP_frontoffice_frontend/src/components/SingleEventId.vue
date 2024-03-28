<script>
    import axios from "axios"
    import L from "leaflet"
    import markerIcon from 'leaflet/dist/images/marker-icon.png';
    import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

    let DefaultIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerIconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    export default {
        data(){
            return{
                event: {},
                startDate: '',
                association: '',

                map: null,
                marker: null,
            }
        },
        
        mounted() {
            this.map = L.map('map').setView([48.93595, 2.3315], 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(this.map);
        },

        created: function(){
            this.getAssociationById()
        },
        
        methods:{
            async getEventById() {
                try {
                    const response = await axios.get(
                    `http://localhost:4000/events/${this.$route.params.id}`
                    );
                    this.event = response.data;
                    this.startDate = this.event.start_date

                    this.marker = L.marker([this.event.longitude, this.event.latitude]).addTo(this.map);
                    this.marker.bindPopup(`${this.event.name}`);
                } catch (err) {
                    console.log(err);
                }
            },

            async getAssociationById() {
                try {
                    await this.getEventById()
                    const response = await axios.get(
                    `http://localhost:4000/associations/${Number(this.event.id_association)}`
                    );
                    this.association = response.data;
                } catch (err) {
                    console.log(err);
                }
            },
        }, 

    }

</script>

<template>
    <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    </head>

    <div>

        <div>
            <h2>Evènement</h2>
            <div>
                <p>Nom : {{ this.event.name }}</p>
                <!-- <p>Date de début : {{ this.startDate.slice(0, 10) }}</p> -->
                <p>Date de début : {{ this.startDate.slice(0, 10) }}</p>
                <p>Heure de début : {{ this.startDate.slice(11, 16) }}</p>
                <p>Date de fin : {{ this.event.end_date }}</p>
                <!-- <p>Association : {{ this.association }}</p> -->
                <p>Association : <router-link :to="{name:'SingleAsso', params:{id: association.id}}"> {{ association.name }}</router-link></p>
            </div>
        </div>

        <div>
            <h2>Coordonnées</h2>
            <div>
                <p>{{ this.event.adress }} <span v-if="this.event.complement_address != ''"> {{ this.event.complement_address }}</span> {{ this.event.postal_code }} {{ this.event.town }}</p>
            </div>
        </div>

        <div id="fullmap">
            <div id="map"></div>
        </div>

    </div>

</template>
 
<style scoped lang="scss">
    #fullmap{
        display: flex;
        justify-content: center;

        #map {
            height: 700px;
            width: 700px;
        }
    }
    </style>