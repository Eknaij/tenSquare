<template>
    <div>
        <!-- 查询表单 -->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="活动名称">
                <el-input v-model="searchMap.name" placeholder="活动名称"></el-input>
            </el-form-item>
            <el-form-item label="活动日期" >
                <el-date-picker type="date" placeholder="选择开始日期" v-model="searchMap.starttime_1" ></el-date-picker>
                <el-date-picker type="date" placeholder="选择截止日期" v-model="searchMap.starttime_2" ></el-date-picker>
            </el-form-item>
            <el-button type="primary" @click="fetchDate()">查询</el-button>
            <el-button type="primary" @click="handleEdit('')">添加</el-button>
        </el-form>
        <!-- 显示列表 -->
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="id" label="活动ID" width="180"></el-table-column>
            <el-table-column prop="name" label="活动名称" width="180"></el-table-column>
            <el-table-column prop="sponsor" label="主办方" width="180"></el-table-column>
            <el-table-column prop="address" label="活动地址" width="180"></el-table-column>
            <el-table-column prop="starttime" label="开始日期" width="180"></el-table-column>
            <el-table-column prop="endtime" label="结束日期" width="180"></el-table-column>
            <el-table-column  label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row.id)" type="text" size="small"> 修改</el-button>
                    <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
        @size-change="fetchDate"
        @current-change="fetchDate"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
        <!-- 对话框 -->
        <el-dialog title="活动编辑" :visible.sync="dialogFormVisible" width="30%">
            <el-form label-width="80px">
                <el-form-item label="活动名称">
                    <el-input v-model="pojo.name" placeholder="活动名称"  ></el-input>
                </el-form-item>
                    <el-form-item label="基本地址">
                    <el-input v-model="pojo.address" placeholder="基本地址"></el-input>
                </el-form-item>
                <el-form-item label="开始日期">
                    <el-date-picker type="date" v-model="pojo.starttime" placeholder="开始日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="截至日期">
                    <el-date-picker type="date" v-model="pojo.endtime" placeholder="截至日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="报名截止">
                    <el-date-picker type="date" v-model="pojo.enrolltime" placeholder="报名截止"></el-date-picker>
                </el-form-item>
                <el-form-item label="活动详情">
                    <el-input v-model="pojo.detail" placeholder="活动详情" type="textarea" :rows="2"></el-input>
                </el-form-item>
                <el-form-item label="城市">
                    <el-select v-model="pojo.city" placeholder="请选择">
                        <el-option
                        v-for="item in cityList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否可见">
                    <el-switch active-value="1" inactive-value="0" v-model="pojo.status"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSave()">保存</el-button>
                    <el-button @click="dialogFormVisible = false" >关闭</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import gatheringApi from '@/api/gathering'  //导入API，赋予变量gatheringApi
import cityApi from '@/api/city'
export default {
    data(){
        return{
            list:[],
            total:0,//总记录数
            currentPage:1,//当前页
            pageSize:10,//每页大小
            searchMap: {},//查询表单绑定变量
            dialogFormVisible: false, //对话框是否显示
            pojo:{}, //编辑表单绑定的实体对象
            cityList: [],//城市列表
            id:''//当前编辑的ID
        }
    },
    created(){
        this.fetchDate();   //页面完成时自动加载fetchDate函数
        cityApi.getList().then(response =>{
            this.cityList = response.data
        });
    },
    methods:{
        fetchDate(){         //自定义方法，用于获取数据
            // gatheringApi.getList().then(response =>{    //调用gatheringApi对象里的getList，获取响应的内容
            //     this.list=response.data                 //将响应的data传给list
            // });
            gatheringApi.search(this.currentPage,this.pageSize,this.searchMap).then(response =>{
                this.list=response.data.rows
                this.total=response.data.total
            });
        },
        handleSave(){
            gatheringApi.update(this.id,this.pojo).then( response=>{
                this.$message({
                    message: response.message,
                    type: (response.flag?'success':'error')
                });
                if(response.flag){//如果成功
                    this.fetchDate()//刷新列表
                }
            })
            this.dialogFormVisible=false//关闭窗口
        },
        handleEdit(id){
            this.dialogFormVisible=true//打开窗口
            if(id!=''){
                //调用查询
                gatheringApi.findById(id).then( response=>{
                    if(response.flag){
                        this.pojo=response.data
                        this.id=id
                    }
                })
            }else{
                this.pojo={}//清空表单
                this.id ='' //清空ID
            }
        },
        handleDelete(id){
            this.$confirm('确定要删除此纪录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            gatheringApi.deleteById(id).then(response=>{
                    this.$message({
                        message: response.message,
                        type: (response.flag?'success':'error')
                    })
                    if(response.flag){
                        this.fetchDate()// 刷新数据
                    }
                })
            }).catch(() => {
                });
        }
    }
}
</script>

