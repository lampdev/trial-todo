<template>
    <div class="card mb-3" v-bind:class="{'border-warning': !isCompleted, 'border-success' : isCompleted}">
        <div class="card-body">
            <div class="row">
                <div  class="col-9">
                    {{ item.description}}
                </div>
                <div class="col-2">
                    <button v-if="!isCompleted" class="btn btn-success" @click="markAsCompleted">Mark As Completed</button>
                </div>
                <div class="col-1">
                    <button class="btn btn-danger" @click="deleteItem">Delete</button>
                </div>
            </div>
        </div>
        <div v-if="isCompleted" class="card-footer">
            Completed: {{ item.completed_at }}
        </div>
    </div>
</template>

<script>
import {put, deleteRequest} from '../api.js'
export default {
    props: ['item'],
    computed: {
        isCompleted () {
            return this.item.completed_at != null
        }
    },
    methods: {
        async markAsCompleted () {
            let response = await put(`/api/todos/${this.item.id}`)
            if (response.toDoItem) {
                this.$emit('reload-items')
            }
        },
        async deleteItem () {
            let response = await deleteRequest(`/api/todos/${this.item.id}`)
            if (response.success) {
                this.$emit('reload-items')
            }
        }
    }
}
</script>
