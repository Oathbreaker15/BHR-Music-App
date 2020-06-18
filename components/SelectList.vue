<template>
	<div class="list-field">
        <div :class="{'list-select-field': showList === true}">
            <div @click="showListWindow()" :class="{'list-filter-field-select': showList === false, 
            'list-filter-field-select-open': showList === true}">Фильтр по тегам
                <div :class="{'list-filter-field-select__arrow-icon': showList === false, 
                'list-filter-field-select__arrow-icon _inverse': showList === true}"></div>
            </div>             
            <div v-if="showList">
                <Checkbox1 v-for="tag in tagsList" 
                           :item="tag" 
                           @is-checked="handleCheckboxes($event)" 
                           :key="tag.name">
                </Checkbox1>
            </div>
        </div>                         
	</div>
</template>

<script>
import store from "vuex";
import Checkbox1 from "~/components/Checkbox1.vue";
export default {
    components: {
        Checkbox1
	},    
	data(){
        return {
			showList: false
        }
	},
	methods: {
		showListWindow(){
			this.showList = !this.showList;
        },
        handleCheckboxes(value) {
            this.$store.commit('HANDLE_CHECKBOXES', value)
            // console.log(value);      
        }          
	},
	computed: {
		tagsList() {
			return this.$store.getters.TAGS_LIST;
		}
	}
}
</script>

<style>
    .list-field {
        display: flex;
        flex-direction: column;
		width: 100%;
        position: relative;
    }
    
	.list-select-field {
		position: absolute;
        z-index: 1;
        width: 100%;
        padding: 0px 15px 10px 15px;
        background-color: #fff;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
        border-radius: 4px;
	}



    .list-filter-field-select {
		display: flex;
		justify-content: space-between;
    	align-items: center;
        padding: 15px 20px;
        width: 100%;
        height: 50px;
        background: #FFFFFF;
        border: 1px solid #B3B3B3;
        box-sizing: border-box;
        border-radius: 4px;
        color: #B3B3B3;
        font-size: 18px;
    }

    .list-filter-field-select-open {
		display: flex;
		justify-content: space-between;
    	align-items: center;
        padding: 0 6px 0 6px;
        width: 100%;
        height: 50px;
        background: #FFFFFF;
        box-sizing: border-box;
        border-radius: 4px;
        font-size: 18px;
    }

	.list-filter-field-select:hover {
		border-color:  #808080;
	}

	.list-field__list-content-item {
		display: flex;
		height: 50px;
	}

	.list-field__list-content-item:last-child {
		padding: 0;
	}

	.list-filter-field-select__arrow-icon {
		position: relative;
		width: 8px;
		height: 4px;
		background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNSIgdmlld0JveD0iMCAwIDEwIDUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wLjgzMzMyOCAwLjMzMzM0NEw0Ljk5OTk5IDQuNTAwMDFMOS4xNjY2NiAwLjMzMzM0NEgwLjgzMzMyOFoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=);
		background-size: cover;
		background-repeat: no-repeat;
		top: 2px;
	}

    .list-filter-field-select__arrow-icon._inverse {
        transform: scaleY(-1);
    }
/* ---------------------------------------------КАСТОМИЗАЦИЯ ЧЕКБОКСА-------------------------------------------- */
/* Customize the label (the container) */
    .list-content-item-container {
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 40px;
        cursor: pointer;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .list-content-item-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        /* top: 0; */
        left: 0;
        height: 30px;
        width: 30px;
        border: 1px solid #B3B3B3;
        border-radius: 4px;
    }

    /* On mouse-over, add a grey background color */
    .list-content-item-container:hover input ~ .checkmark {
        background-color: #E6E6E6;;
    }

    /* When the checkbox is checked, add a blue background */
    .list-content-item-container input:checked ~ .checkmark {
        background-color: #4285F4;
        border: 1px solid #4285F4;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .list-content-item-container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .list-content-item-container .checkmark:after {
        left: 12px;
        top: 5px;
        width: 7px;
        height: 14px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }   	
</style>