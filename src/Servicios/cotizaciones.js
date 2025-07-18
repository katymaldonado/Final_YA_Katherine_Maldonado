import axios from 'axios'

const url = 'https://api.bluelytics.com.ar/v2/latest'

export const obtenerCotizaciones = async () => {
    try {
        const { data: cotizaciones } = await axios.get(url)

        return cotizaciones
    }
    catch (error) {
        console.error("Hubo un error en la solicitud", error)
    }
}