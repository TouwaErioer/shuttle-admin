<template>
    <div class="right">
        <Headers/>
        <div class="table">
            <el-table :data="orders">
                <el-table-column
                        prop="id"
                        label="id"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="客户"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag v-text="scope.row.client.name"/>
                    </template>
                </el-table-column>
                <el-table-column
                        label="服务"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag v-text="scope.row.service.name" type="success"/>
                    </template>
                </el-table-column>
                <el-table-column
                        label="产品"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag v-text="scope.row.product.name"/>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="时间"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="note"
                        label="备注"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="file"
                        label="文件"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                        align="center">
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
            <el-dialog :visible.sync="dialogUpdateVisible" width="350px" center>
                <div slot="title">
                    <span><i class="el-icon-edit"></i> 修改订单</span>
                </div>
                <div class="form-item">
                    <span>时间：</span>
                    <el-input v-model="updateFrom.date" suffix-icon="el-icon-date"/>
                </div>

                <div class="form-item">
                    <span>地址：</span>
                    <el-input v-model="updateFrom.address" suffix-icon="el-icon-school"/>
                </div>

                <div class="form-item">
                    <span>备注：</span>
                    <el-input v-model="updateFrom.note" suffix-icon="el-icon-notebook-2"/>
                </div>

                <div class="form-item">
                    <span>文件：</span>
                    <el-input v-model="updateFrom.file" suffix-icon="el-icon-tickets"/>
                </div>

                <div class="form-item">
                    <span>客户：</span>
                    <el-input v-model="updateFrom.cid" suffix-icon="el-icon-user"/>
                </div>

                <div class="form-item">
                    <span>服务：</span>
                    <el-input v-model="updateFrom.sid" suffix-icon="el-icon-user-solid"/>
                </div>

                <div class="form-item">
                    <span>产品：</span>
                    <el-input v-model="updateFrom.pid" suffix-icon="el-icon-goods"/>
                </div>

                <div class="form-item">
                    <span>状态：</span>
                    <el-radio v-model="updateFrom.status" :label="-1">未接单</el-radio>
                    <el-radio v-model="updateFrom.status" :label="0">待配送</el-radio>
                    <el-radio v-model="updateFrom.status" :label="1">已完成</el-radio>
                </div>

                <div class="form-item">
                    <el-button size="medium" type="warning" @click="update" plain>修改</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Headers from "@/components/headers";
    import {findAllOrder, deleteOrder, updateOrder} from "@/utils/api/order";

    export default {
        name: "order",
        components: {Headers},
        data() {
            return {
                orders: [],
                dialogUpdateVisible: false,
                updateFrom: {
                    cid: null,
                    sid: null,
                    pid: null,
                    date: null,
                    address: null,
                    note: null,
                    file: null,
                    status: -1
                },
                total: 0,
                page: 1
            }
        },
        created() {
            this.getData(1);
        },
        methods: {
            getData(pageNo) {
                findAllOrder({pageNo:pageNo}).then(res => {
                    let data = res.data;
                    this.orders = data.list;
                })
            },
            del(row) {
                const h = this.$createElement;
                this.$msgbox({
                    title: '提示',
                    message: h('p', null, [
                        h('span', null, '此操作将永久删除订单号'),
                        h('span', {style: 'color: #f56c6c'}, row.id),
                        h('span', null, ', 是否继续?')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        deleteOrder({'id': row.id}).then(res => {
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
                updateOrder(this.updateFrom).then(res => {
                    if (res.code === 1) {
                        this.$message.success('更新成功');
                        this.load();
                    } else this.$message.error('更新失败');
                });
                this.dialogUpdateVisible = false;
            },
            clickUpdate(row) {
                this.dialogUpdateVisible = true;
                this.updateFrom.cid = row.cid;
                this.updateFrom.sid = row.sid;
                this.updateFrom.pid = row.pid;
                this.updateFrom.date = row.date;
                this.updateFrom.address = row.address;
                this.updateFrom.note = row.note;
                this.updateFrom.file = row.file;
                this.updateFrom.status = row.status;
            },
            load() {
                this.orders = this.getData(this.page)
            },
            currentChange(current) {
                this.page = current;
                this.orders = this.getData({pageNo: current})
            },
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
</style>