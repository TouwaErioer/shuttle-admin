<template>
    <div class="container">
        <div class="center">
            <h3 class="title">后台管理系统登录</h3>
            <div class="input">
                <div class=""></div>
                <el-input prefix-icon="el-icon-user" v-model="user" placeholder="请输入电话或昵称"/>
                <el-input prefix-icon="el-icon-key" v-model="password" type="password" placeholder="请输入密码"/>
                <el-button type="primary" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {check, login} from "@/utils/api/user";

    export default {
        name: "login",
        props: {token: String},
        data() {
            return {
                user: null,
                password: null
            }
        },
        created() {
            if (this.token !== 'null') {
                localStorage.setItem('token', this.token);
                check().then(res => {
                    if (res.code === 1) {
                        localStorage.setItem('userInfo', JSON.stringify(res.data));
                        this.$message.success('登录成功');
                        this.$router.push('/')
                    } else {
                        localStorage.removeItem('token');
                    }
                })
            }
        },
        methods: {
            login() {
                if (this.user != null && this.password != null) {
                    login({
                        account: this.user,
                        password: this.password,
                        expired: 60
                    }).then(res => {
                        if (res.code === 1 && res.data.user['admin']) {
                            localStorage.setItem('token', res.data.token);
                            localStorage.setItem('userInfo', JSON.stringify(res.data.user));
                            this.$message.success('登录成功');
                            this.$router.push('/')
                        } else {
                            this.$message.error('权限不足')
                        }
                    })
                } else {
                    this.$message.info('请输入账号或密码')
                }
            }
        }
    }
</script>

<style scoped>

    .container {
        height: 100%;
        width: 100%;
        background-color: #2d3a4b;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .title {
        color: white;
        font-size: 26px;
    }

    .input {
        display: flex;
        flex-direction: column;
        width: 400px;
    }

    .center {
        margin: 150px;
        text-align: center;
    }
</style>
