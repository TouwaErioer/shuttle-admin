<template>
    <div class="container">
        <el-menu
                :default-active="activeIndex"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                style="height: 100%"
                router
                :collapse="$store.state.collapse"
                class="el-menu-vertical">
            <el-menu-item index="user">
                <i class="el-icon-user"></i>
                <span slot="title">用户</span>
            </el-menu-item>
            <el-menu-item index="service">
                <i class="el-icon-folder"></i>
                <span slot="title">服务</span>
            </el-menu-item>
            <el-menu-item index="category">
                <i class="el-icon-menu"></i>
                <span slot="title">分类</span>
            </el-menu-item>
            <el-menu-item index="store">
                <i class="el-icon-shopping-cart-1"></i>
                <span slot="title">商店</span>
            </el-menu-item>
            <el-menu-item index="product">
                <i class="el-icon-goods"></i>
                <span slot="title">产品</span>
            </el-menu-item>
            <el-menu-item index="order">
                <i class="el-icon-tickets"></i>
                <span slot="title">订单</span>
            </el-menu-item>
        </el-menu>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return{
                activeIndex: 'user'
            }
        }
    }
</script>

<style scoped>

    .container {
        display: flex;
        height: 100%;
    }

    .content{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background-color: #edeff2;
    }

    .el-menu-vertical:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>