<template>
    <div class="container">
        <div class="spinner spinner-2">
            <div class="cssload-container">
                <ul class="cssload-loader">
                    <li></li><li></li><li></li><li></li><li></li><li></li>		
                </ul>
            </div>                
        </div>
    </div>      
</template>

<script>
export default {
}
</script>

<style>
    .container {
        display: flex;
        width: 100%;
        height: 100%;
        /* justify-content: center;
        align-items: center; */
        background: rgba(255, 255, 255, 0.8);
        position: fixed; 
    }

    .container .spinners {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
    }

    /* YOU NEED THESE STYLES */
    /* spinner style */
    .spinner {
        /* position: relative; */
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        position: sticky;
        /* width: 125px; */
        height: 125px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .cssload-container {
        list-style: none;
    }


    .cssload-loader{
        list-style: none;
    }

    ul.cssload-loader li{
        background-color:  #808080;
        width: 5px;
        height: 10px;
        float: right;
        margin-right: 5px !important;
        box-shadow: 0px 19px 10px rgba(0,0,0,0.2);
    }
    .cssload-loader li:first-child{
        animation: cssload-loadbars 1.15s cubic-bezier(0.645,0.045,0.355,1) infinite 0s;
    }
    .cssload-loader li:nth-child(2){
        animation: cssload-loadbars 1.15s ease-in-out infinite -0.23s;
    }
    .cssload-loader li:nth-child(3){
        animation: cssload-loadbars 1.15s ease-in-out infinite -0.46s;
    }
    .cssload-loader li:nth-child(4){
        animation: cssload-loadbars 1.15s ease-in-out infinite -0.69s;
    }
    .cssload-loader li:nth-child(5){
        animation: cssload-loadbars 1.15s ease-in-out infinite -0.92s;
    }
    .cssload-loader li:nth-child(6){
        animation: cssload-loadbars 1.15s ease-in-out infinite -1.15s;
    }

    @keyframes cssload-loadbars {
        0%{
            height: 10px;
            margin-top: 24px;
        }
        50%{
            height:49px;
            margin-top: 0px;
        }
        100%{
            height: 10px;
            margin-top: 24px;
        }
    }    
</style>