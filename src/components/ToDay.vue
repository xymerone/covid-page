<template>

    <div id="today" class="container">

        <div class="row col-lg bg-c justify-content-center">

            <div class="row" v-if="!show">
                <div  class="col-md-12 text-center">
                    <h4>Завантаження динаміки...
                        <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                    </h4>
                </div>
            </div>
                <div class="col-md-6 text-center">
                    <h3>Динаміка захворювання</h3>
                    <canvas id="graph" width="300" height="300"></canvas>
                </div>
            <div class="col-md-6">
                <ul>
                    <li> <span style="background: #fff; padding: 1rem"></span>
                    - Кількість захворілих</li>
                    <li> <span style="background: red; padding: 1rem"></span>
                        - Кількість померлих</li>
                    <li> <span style="background: yellow; padding: 1rem"></span>
                        - Одужало</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    function dGraph(ctx, sx, sy, width, height, data, prep, color){
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        let summ = data[data.length-1][prep]
        let x1 = 0
        let y1 = 0
        let i = 0

        data.forEach(r=>{
            if (r.confirmed === 0){
                return;
            }
            i++
        })
        data.forEach(r => {
            if (r.confirmed === 0){
                return;
            }
            x1 += (width / i)
            y1 =  (r[prep] == 0) ? 0 : (height / summ)  * r[prep]
            y1 = height - y1
            ctx.lineTo(x1, y1)
        })
        ctx.strokeStyle = color
        ctx.stroke()
        // ctx.fillStyle = color
        // ctx.font = "confirmed 20px Tahoma"
        // ctx.fillText(summ, width - 20, y1 + 10)
    }
    export default {
        name: 'ToDay',
        data(){
            return {
                dataGraph: [],
                show: false
            }
        },
        watch:{
            dataGraph: function(){
                const canv = document.querySelector('#graph')
                let context = canv.getContext("2d")
                context.beginPath()
                context.moveTo(0, 0)
                context.lineTo(0, canv.height)
                context.lineTo(canv.width, canv.height)
                context.lineTo(canv.width, 0)
                context.lineTo(0, 0)
                context.strokeStyle = "#fff"
                context.stroke()
                dGraph(context, 0, canv.height, canv.width, canv.height, this.dataGraph, 'confirmed',
                        '#fff')
                dGraph(context, 0, canv.height, canv.width, canv.height, this.dataGraph, 'deaths',
                    'red')
                dGraph(context, 0, canv.height, canv.width, canv.height, this.dataGraph, 'recovered',
                    'yellow')
            }
        },
        created() {
            axios.get('https://pomber.github.io/covid19/timeseries.json')
                .then(r => {
                    this.dataGraph = r.data.Ukraine
                    setTimeout(()=>{ this.show = true;}, 1000)
                })
        }
    }

</script>
<style scoped>
    ul{
        list-style: none;
    }
    li{
        margin: 1rem;

    }
</style>