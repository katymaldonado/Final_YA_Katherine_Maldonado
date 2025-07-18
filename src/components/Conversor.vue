<template>
    <div>
        <h2>Conversor Pesos a Dólares</h2>
        <form action="">
            <div class="form-group">
                <label for="pesos">Ingrese monto $</label>
                <input id="pesos" class="form-control" type="number" v-model.number="formData.pesos"
                    @input="formDirty.pesos = true" placeholder="Ingrese monto en pesos" />
            </div>
        </form>

        <div v-if="formData.pesos > 0">
            <p>Valor del dólar oficial venta <span class="intenso">{{ dolares.value_sell }}</span> - fecha {{ fechaHora }}</p>
            <p>Valor convertido <span class="intenso">USD {{ valorEnDolares}}</span></p>
        </div>
        
    </div>
</template>

<script>
import { obtenerCotizaciones } from '../Servicios/cotizaciones'
export default {
    name: 'conversor',
    props: [],
    mounted() {
        console.log('Cotizacion -> mounted')
        setInterval(() => {
            this.obtenerCotizaciones()
        }, 2000)
    },
    data() {
        return {
            formData: {
                pesos: null
            },
            formDirty: {
                pesos: false
            },
            dolares: null,
            fechaHora: null,
        }
    },
    methods: {
        async obtenerCotizaciones() {
            const data = await obtenerCotizaciones()
            this.dolares = data.blue
            this.fechaHora = new Date().toLocaleString()
        }

    },
    computed: {
        valorEnDolares(){
            let valor = this.formData.pesos/this.dolares.value_sell
            return valor.toFixed(2)
        }
    }
}
</script>

<style lang="scss" scoped>
.intenso {
    font-weight: bolder;
}
</style>