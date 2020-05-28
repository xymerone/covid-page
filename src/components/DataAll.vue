<template>
    <div class="container">
        <div class="row col-lg bg-c justify-content-center">
            <div class="col-lg-7 col-md-8">
                <h2 v-if="alldata.length == 0">Завантаження <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner></h2>
                <template v-if="alldata.length > 0">
                    <h2>Станом на {{ alldata[alldata.length-1].date }}</h2>
                    <h3 >Захворіло: {{ alldata[alldata.length-1].confirmed }}</h3>
                    <h3>Одужало: {{ alldata[alldata.length-1].recovered }}</h3>
                    <h3>Померло: {{ alldata[alldata.length-1].deaths }}</h3>
                </template>
            </div>
            <div class="col-lg-5 col-md-4">

                <h2 v-if="alldata.length == 0">Завантаження <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner></h2>
                <template v-if="alldata.length > 0">
                    <h2>За добу</h2>
                    <h3 >Захворіло: {{ alldata[alldata.length-1].confirmed - alldata[alldata.length-2].confirmed }}</h3>
                    <h3>Одужало: {{ alldata[alldata.length-1].recovered - alldata[alldata.length-2].recovered }}</h3>
                    <h3>Померло: {{ alldata[alldata.length-1].deaths - alldata[alldata.length-2].deaths }}</h3>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"DataAll",

        props:{
            alldata: Array,
        }
    }
</script>