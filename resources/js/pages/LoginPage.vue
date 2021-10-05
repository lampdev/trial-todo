<template>
    <div class="row mt-5">
        <div class="col-12 col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header">
                    Login
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="loginEmail" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="loginEmail" v-model="email">
                    </div>
                    <div class="mb-3">
                        <label for="loginPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="loginPassword" v-model="password">
                    </div>
                    <div class="d-flex flex-column align-items-center">
                        <button class="btn btn-primary mb-3" @click="login">Login</button>
                        <router-link :to="{name: 'register'}">Don't have an account?</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {post, get} from '../api.js'
export default {
    data () {
        return {
            email: '',
            password: ''
        }
    },
    async mounted () {
        await get('/sanctum/csrf-cookie')
    },
    methods: {
        async login () {
            let result = await post('/api/login', {email: this.email, password: this.password})

            if (!result.token) {
                return false
            }

            // save auth token in local storage
            window.localStorage.setItem('authToken', result.token)

            // redirect the user to the Todo Dashboard
            this.$router.push('/auth/todo-dashboard')
        }
    }
}
</script>
