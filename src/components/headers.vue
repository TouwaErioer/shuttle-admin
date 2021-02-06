<template>
    <div class="header">
        <div class="edge">
            <el-button :icon="getCollapseIcon" @click="changeCollapse"/>
            <slot name="insert"/>
        </div>
        <div class="user">
            <slot name="search"/>
            <el-avatar @click.native="exit">user</el-avatar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headers",
        methods: {
            changeCollapse(){
                console.log('changeCollapse')
                this.$store.commit("changeCollapse")
            },
            exit(){
                this.$confirm('此操作将退出账号, 是否继续?', '提示', {
                    confirmButtonText: '退出',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            }
        },
        computed:{
            getCollapseIcon(){
                if(this.$store.state.collapse) return 'el-icon-s-unfold'
                else return 'el-icon-s-fold'
            }
        }
    }
</script>

<style scoped>

    .header {
        width: 100%;
        height: 60px;
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center
    }

    .user {
        margin-right: 15px;
        display: flex;
    }
</style>