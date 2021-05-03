<template>
    <div class="right">
        <Headers>
        </Headers>
        <div class="table">
            <el-table :data="data" v-if="type === 'store'">
                <el-table-column
                        prop="id"
                        label="id"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="image"
                        label="图片"
                        align="center">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.image" :previewSrcList="[scope.row.image]"
                                  class="image"/>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="serviceId"
                        label="服务id"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="categoryId"
                        label="类别id"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="uid"
                        label="用户id"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="状态"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status ? 'success': ''"
                                v-text="scope.row.status ? '已审批' : '未审批'"></el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="180"
                        align="center">
                    <template slot-scope="scope">
                        <el-button type="warning" size="mini" v-if="!scope.row.status"
                                   @click="approveStore(scope.row,true)">
                            批准
                        </el-button>
                        <el-button type="danger" size="mini" @click="approveStore(scope.row,false)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="data" v-if="type === 'product'">
                <el-table-column
                        prop="id"
                        label="id"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="image"
                        label="图片"
                        align="center">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.image" :previewSrcList="[scope.row.image]"
                                  class="image"/>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="价格"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="categoryId"
                        label="类别id"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="categoryName"
                        label="类别名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="uid"
                        label="用户id"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="状态"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status ? 'success': ''"
                                v-text="scope.row.status ? '已审批' : '未审批'"></el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="180"
                        align="center">
                    <template slot-scope="scope">
                        <el-button type="warning" size="mini" v-if="!scope.row.status"
                                   @click="approveProduct(scope.row,true)">
                            批准
                        </el-button>
                        <el-button type="danger" size="mini" @click="approveProduct(scope.row,false)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" class="pagination"
                           @current-change="currentChange"/>
        </div>
    </div>
</template>

<script>
    import Headers from "@/components/headers";
    import {approveStore, findAllProduct, findAllStore} from "@/utils/api/approve";

    export default {
        name: "user",
        components: {Headers},
        props: {type: String},
        data() {
            return {
                data: [],
                total: 0,
                pageNo: 1,
                pageSize: 9,
            }
        },
        created() {
            if (this.type === 'store') this.findAllStore();
            else if (this.type === 'product') this.findAllProduct();
        },
        methods: {
            findAllStore() {
                findAllStore(this.pageNo, this.pageSize).then(res => {
                    if (res.code === 1) {
                        const data = res.data;
                        this.data = data.list;
                        this.total = data.total;
                    }
                })
            },
            findAllProduct() {
                findAllProduct(this.pageNo, this.pageSize).then(res => {
                    if (res.code === 1) {
                        const data = res.data;
                        this.data = data.list;
                        this.total = data.total;
                    }
                })
            },
            currentChange(current) {
                this.pageNo = current;
                this.getData();
            },
            approveStore(store, allow) {
                let content = '此操作将删除该条审批记录, 是否继续?';
                if (allow) content = '此操作批准该商店上架, 是否继续?';
                this.$confirm(content, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.status = allow;
                    approveStore(store).then(res => {
                        if (res.code === 1) {
                            this.$message.success('操作成功！');
                            this.getData();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            getData() {
                if (this.type === 'store') this.findAllStore();
                else if (this.type === 'product') this.findAllProduct();
            },
            approveProduct(product, allow) {
                let content = '此操作将删除该条审批记录, 是否继续?';
                if (allow) content = '此操作批准该产品上架, 是否继续?';
                this.$confirm(content, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    product.status = allow;
                    approveStore(product).then(res => {
                        if (res.code === 1) {
                            this.$message.success('操作成功！');
                            this.getData();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
        },
        watch: {
            type: function () {
                this.getData();
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

    .image {
        width: 100px;
        height: 100px;
    }
</style>