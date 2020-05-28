import axios from 'src/plugins/axios'
// import covid from 'src/covid'

let covid = []
axios.get('https://pomber.github.io/covid19/timeseries.json').then(r => {
    covid = r.data.Ukraine
})
console.log(covid)
export default covid