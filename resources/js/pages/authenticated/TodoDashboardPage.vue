<template>
    <div>
        <h3>Todo Dashboard</h3>

        <div class="card">
            <div class="card-header">
                Todos
            </div>
            <div class="card-body">
                <template v-for="activeItem in activeToDoItems">
                    <to-do-item :item="activeItem" v-on:reload-items="loadItems"></to-do-item>
                </template>
                <div v-if="!activeToDoItems.length" class="alert alert-success">You don't have active Todo items</div>
            </div>
            <div class="card-footer">
                <div class="input-group mb-3">
                <input type="text"
                       class="form-control"
                       placeholder="Needs to do"
                       v-model="newItemDescription">
                    <button class="btn btn-outline-primary" v-bind:class="{'btn-outline-secondary': !newItemDescription.length}" type="button" @click="createNewItem" :disabled="!newItemDescription">Save</button>
                </div>
            </div>
        </div>

        <div class="card mt-5">
            <div class="card-header">
                Completed Todos
            </div>
            <div class="card-body">
                <template v-for="completedItem in completedToDoItems">
                    <to-do-item :item="completedItem" v-on:reload-items="loadItems"></to-do-item>
                </template>
                <div v-if="!completedToDoItems.length" class="alert alert-warning">You don't have completed Todo items</div>
            </div>
        </div>
    </div>
</template>

<script>
import ToDoItem from '../../components/ToDoItem.vue'
import {get,post} from '../../api.js'
export default {
    components: {ToDoItem},
    data () {
        return {
            newItemDescription: '',
            savedToDoItems: []
        }
    },
    mounted () {
        this.loadItems()
    },
    methods: {
        async loadItems () {
            let responseData = await get('/api/todos')

            if (responseData.toDoItems) {
                this.savedToDoItems = responseData.toDoItems
            }
        },
        async createNewItem () {
            let responseData = await post('/api/todos', {description: this.newItemDescription})
            if (responseData.toDoItem) {
                this.savedToDoItems.push(responseData.toDoItem)
                this.newItemDescription = ''
            }
        }
    },
    computed: {
        activeToDoItems () {
            return this.savedToDoItems.filter(item => item.completed_at == null)
        },
        completedToDoItems () {
            return this.savedToDoItems.filter(item => item.completed_at != null)
        },
    }
}
</script>
