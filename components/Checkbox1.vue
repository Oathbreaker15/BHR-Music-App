<template>
	<div :item="item" class="tag-field__tag-content">
		<div :class="['tag-field__tag-content-item', {'_border': item.hasDivider === true}]">
			<label class="tag-content-item-container" :title="title">{{item.name}}
				<input type="checkbox" @change="emitCheck(item)" :checked="item.isChecked">
				<span class="checkmark"></span>
			</label>
		</div>                            
	</div>	
</template>

<script>
export default {
    data() {
        return{
            disableTags: false,
        }
    },
	props: {
        item: {
            type: Object
        },
		title: {
			type: String
        },
        checked: {
            type: Boolean
        }
    },
    methods: {
        emitCheck(item){
            // как работает фактически запись ниже комментария
            // const newItem = Object.assign({}, item);
            // newItem.isChecked = event.target.checked;
            this.$emit('is-checked', {
                ...item,
                isChecked: event.target.checked
            });
        }      
    },
}
</script>

<style scoped>
    .tag-field {
        width: 340px;
        flex-shrink: 0;
        padding-left: 20px;
        box-sizing: border-box;
    }

    .tag-field__tag-content-item {
        display: flex;
        height: 50px;
    }

    ._border {
        padding-bottom: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid #CCCCCC;
    }

/* ---------------------------------------------КАСТОМИЗАЦИЯ ЧЕКБОКСА-------------------------------------------- */
/* Customize the label (the container) */
    .tag-content-item-container {
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 40px;
        cursor: pointer;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .tag-content-item-container input {
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
    .tag-content-item-container:hover input ~ .checkmark {
        background-color: #E6E6E6;;
    }

    /* When the checkbox is checked, add a blue background */
    .tag-content-item-container input:checked ~ .checkmark {
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
    .tag-content-item-container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .tag-content-item-container .checkmark:after {
        left: 12px;
        top: 5px;
        width: 7px;
        height: 14px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
    }	
</style>