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
                association: {},
                events: {},

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
            this.getAssociationById();
            this.getEventsByAsso()
        },
        
        methods:{
            async getAssociationById() {
                try {
                    const response = await axios.get(
                    `http://localhost:4000/associations/${this.$route.params.id}`
                    );
                    this.association = response.data;

                    this.marker = L.marker([this.association.longitude, this.association.latitude]).addTo(this.map);
                    this.marker.bindPopup(`${this.association.name}`);

                } catch (err) {
                    console.log(err);
                }
            },

            async getEventsByAsso() {
                try {
                    await this.getAssociationById()

                    const response = await axios.get(`http://localhost:4000/associations/events/${this.association.id}`
                    )
                    this.events = response.data
                } catch (err) {
                    console.log(err);
                }
            }
        }, 

    }

</script>

<template>
    <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    </head>

    <div>

        <div>
            <h2>Identité de l'association</h2>
            <div>
                <p>Nom : {{ this.association.name }}</p>
                <p v-if="this.association.siret != '' && this.association.siret != null">Siret : {{ this.association.siret }}</p>
                <p v-if="this.association.description != '' && this.association.description != null">Description :</p>
                <p>{{ this.association.description }}</p>
                <p>Catégorie : {{ this.association.category }}</p>
            </div>
        </div>

        <div>
            <h2 v-if="this.association.representative_name != '' && this.association.representative_surname != ''">Représentant.e</h2>
            <div>
                <p v-if="this.association.representative_name != '' && this.association.representative_name != null">{{ this.association.representative_name }}</p>
                <p v-if="this.association.representative_surname != '' && this.association.representative_surname != null">{{ this.association.representative_surname }}</p>
            </div>
        </div>

        <div>
            <h2 v-if="this.association.mail != '' && this.association.phone != ''">Contacts</h2>
            <div>
                <p v-if="this.association.mail != ''">Courriel : {{ this.association.mail }}</p>
                <p v-if="this.association.phone != ''">Téléphone : {{ this.association.phone }}</p>
            </div>
        </div>

        <div>
            <h2>Coordonnées</h2>
            <div>
                <p>{{ this.association.adress }} <span v-if="this.association.complement_address != ''"> {{ this.association.complement_address }}</span> {{ this.association.postal_code }} {{ this.association.town }}</p>
            </div>
        </div>

        <div>
            <h2>Evènements</h2>
            <div>
                <p v-if="this.events.length === 0"> Pas d'évènements prévus</p>
                <tbody v-else>
                    <tr v-for="event in events" :key='event.id'>
                        <td>
                            <router-link :to="{name:'SingleEvent', params:{id: event.id}}">{{ event.name }}</router-link>
                        </td>
                    </tr>
                </tbody>
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