<template>
    <div class="right">
        <Headers>
            <div slot="insert" class="insert">
                <el-button icon="el-icon-plus" @click="dialogFormVisible = true"/>
            </div>
        </Headers>
        <div class="table">
            <el-table :data="categories">
                <el-table-column
                        prop="id"
                        label="id"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag v-text="scope.row.name" effect="dark"/>
                    </template>
                </el-table-column>
                <el-table-column
                        label="服务"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag v-text="scope.row.service.name" :color="scope.row.service.color" style="color: white"/>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="180"
                        align="center">
                    <template slot-scope="scope">
                        <el-button type="warning" size="mini" @click="clickUpdate(scope.row)">修改</el-button>
                        <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="total" :page-size="9" class="pagination"
                           @current-change="currentChange"/>
            <el-dialog :visible.sync="dialogFormVisible" width="350px" center>
                <div slot="title">
                    <span><i class="el-icon-plus"></i> 添加类别</span>
                </div>
                <div class="form-item">
                    <span>名称：</span>
                    <el-input v-model="insertFrom.name" suffix-icon="el-icon-tickets"/>
                </div>
                <div class="form-item">
                    <span>服务：</span>
                    <el-select v-model="insertFrom.serviceId" placeholder="请选择服务">
                        <el-option v-for="service in services" :key="service.id" :label="service.name" :value="service.id"/>
                    </el-select>
                </div>
                <div class="form-item">
                    <el-button size="medium" type="success" @click="insert" plain>添加</el-button>
                </div>
            </el-dialog>
            <el-dialog :visible.sync="dialogUpdateVisible" width="350px" center>
                <div slot="title">
                    <span><i class="el-icon-edit"></i> 修改类别</span>
                </div>
                <div class="form-item">
                    <span>名称：</span>
                    <el-input v-model="updateFrom.name" suffix-icon="el-icon-tickets" @input="changeUpdateButton"/>
                </div>
                <div class="form-item">
                    <span>服务：</span>
                    <el-select v-model="updateFrom.serviceId" placeholder="请选择服务" @change="changeUpdateButton">
                        <el-option v-for="service in services" :key="service.id" :label="service.name" :value="service.id"/>
                    </el-select>
                </div>
                <div class="form-item">
                    <el-button size="medium" type="warning" @click="update" plain :disabled="updateButton">修改
                    </el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Headers from "@/components/headers";
    import {findAllService} from "@/utils/api/service";
    import {deleteCategory, findAllCategory, insertCategory, updateCategory} from "@/utils/api/category";

    export default {
        name: "category",
        components: {Headers},
        data() {
            return {
                categories: [],
                dialogFormVisible: false,
                dialogUpdateVisible: false,
                insertFrom: {
                    name: '',
                    serviceId: null
                },
                updateFrom: {
                    name: '',
                    serviceId: null
                },
                total: 0,
                page: 1,
                services: [],
                updateButton: true
            }
        },
        created() {
            this.getData();
            this.getService();
        },
        methods: {
            getData() {
                findAllCategory().then(res => {
                    let data = res.data;
                    this.categories = data;
                })
            },
            insert() {
                insertCategory(this.insertFrom).then(res => {
                    if (res.code === 1) {
                        this.$message.success('添加成功');
                        this.load();
                    } else this.$message.error('添加失败');
                });
                this.dialogFormVisible = false;
            },
            del(row) {
                const h = this.$createElement;
                this.$msgbox({
                    title: '提示',
                    message: h('p', null, [
                        h('span', null, '此操作将永久删除'),
                        h('span', {style: 'color: #f56c6c'}, row.name),
                        h('span', null, '和相关数据, 是否继续?')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        deleteCategory({'id': row.id}).then(res => {
                            if (res.code === 1) {
                                this.$message.success('删除成功');
                                this.load()
                            } else this.$message.error('添加失败')
                        })
                    }
                ).catch(() => {
                });
            },
            update() {
                updateCategory(this.updateFrom).then(res => {
                    if (res.code === 1) {
                        this.$message.success('更新成功');
                        this.load();
                    } else this.$message.error('更新失败');
                });
                this.dialogUpdateVisible = false;
            },
            clickUpdate(row) {
                this.dialogUpdateVisible = true;
                this.updateFrom.id = row.id;
                this.updateFrom.name = row.name;
                this.updateFrom.color = row.color;
                this.updateFrom.icon = row.icon;
            },
            load() {
                this.services = this.getData(this.page)
            },
            currentChange(current) {
                this.page = current;
                this.services = this.getData({pageNo: current})
            },
            getService(){
                findAllService({pageNo:1}).then(res => {
                    this.services = res.data.list
                })
            },
            changeUpdateButton() {
                this.updateButton = false
            }
        }
    }
</script>

<style scoped>

    .pagination {
        display: flex;
        justify-content: center;
    }

    .form-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
    }

    .color{
        width: 50px;
        height: 50px;
    }
</style>