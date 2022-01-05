<template>
  <div class="user">
      <el-header>
        <div><span>会员级别</span></div>
        <div class="serchInput">
          <el-input
            placeholder="请输入级别名称"
            v-model="input"
            size="small"
          ></el-input>
        </div>
        <div class="button">
          <el-button type="primary" icon="el-icon-search" size="small" @click="search"
            >搜索</el-button
          >
          <el-button type="primary" icon="el-icon-plus" size="small" @click="adduer=true"
            >添加级别</el-button
          >
          <el-button plain icon="el-icon-date" size="small" @click="delAll">批量删除</el-button>
          <el-button plain icon="el-icon-setting" size="small"
            >重置缓存</el-button
          >
          <el-button plain icon="el-icon-refresh-right" size="small" @click="clearSearch"
            >清空</el-button
          >
        </div>
      </el-header>
      <el-main>
        <template>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            height="100%"
            border
            @cell-click='cellClick'
          >
            <el-table-column type="selection" width="55" align='center'></el-table-column>
            <el-table-column prop="id" label="ID" width="100" align='center'></el-table-column>
            <el-table-column prop="rink" label="会员级别" width="100" align='center'></el-table-column>
            <el-table-column prop="sort" label="排序" width="100" align='center'></el-table-column>
            <el-table-column prop="adduser" label="添加人" align='center'> </el-table-column>
            <el-table-column prop="addtime" label="添加时间" width="220" align='center'> </el-table-column>
            <el-table-column prop="upuser" label="更新人" width="100" align='center'> </el-table-column>
            <el-table-column prop="update" label="更新时间" width="220" align='center'> </el-table-column>
            <el-table-column fixed="right" label="操作" width="180" align='center'>
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.$index, scope.row)"
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                >
                </el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"  
                  @click="handleDelete(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-main>
      <el-footer>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-footer>
    <el-dialog
      title="添加级别"
      :visible.sync="adduser"
      width="30%"
      center>
      <el-form label-position="right" label-width="80px" :model="addfrom">
        <el-form-item label="会员级别">
          <el-input v-model="addfrom.rink"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="addfrom.sort" :min="1" :max="20" label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adduser = false">取 消</el-button>
        <el-button type="primary" @click="addRank">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改级别"
      :visible.sync="updatauser"
      width="30%"
      center>
      <el-form label-position="right" label-width="80px" :model="updatafrom">
        <el-form-item label="会员级别">
          <el-input v-model="updatafrom.rink"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="updatafrom.sort" :min="1" :max="20" ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatauser = false">取 消</el-button>
        <el-button type="primary" @click="updataRank">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "User",
  data() {
    return {
      currentPage: 1,  //当前显示的数据页数，默认第一页
      pagesize: 5, //每页数据条数
      input: "", //  搜索输入框
      tableData: [],
      total: 0, //数据总条数
      adduser: false, //添加对话框显示标志
      addfrom: {rink:"",sort:""},
      updatauser: false,
      updatafrom: {rink:"",sort:""},
      id: null, //当前操作行的id
    };
  },
  mounted(){
    this.getList();
  },
  methods: {
    // 分页跳转
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    // 修改
    handleEdit(index, row) {
      this.updatauser = true
      this.id = row.id
      this.updatafrom.rink = row.rink
      this.updatafrom.sort = row.sort
    },
        // 批量删除
    delAll(){
      console.log(99);
    },
    // 清空
    clearSearch(){
      this.getList()
    },
    cellClick(row, column, cell, event){
      if (column.label=='会员级别') {
        console.log(row.rink);//这里要写一个跳转并搜索，并传参数row.rink
        debugger
        this.$router.push({
          name: 'role',
          params: {
            rink: row.rink
          }
        })
        // this.$router.replace('/role')
      }
    },
    // 修改
    async updataRank(){
       const result = await this.$axios.post("/api/updata/user", {
        rink: this.updatafrom.rink,
        sort: this.updatafrom.sort,
        id: this.id
      });
      this.updatauser = false
      if (result.status==200) {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      }
      this.getList()
    },
    // 删除
    async handleDelete(index, row) {
      const result = await this.$axios.post("/api/delete/user", { id: row.id });
      if (result.status==200) {
        this.$message({
          message: '已成功删除',
          type: 'success',
          duration: 1000
        });
      }
      this.getList()
    },
    // 搜索
    async search(){
      let input = this.input
      const result = await this.$axios.post("/api/search/user", { input });
      this.tableData = result.data.dataUser;
      this.total = result.data.dataUser.length
    },
    // 添加
    async addRank(){
      //点击添加的确认按钮
      if (this.addfrom.rink.trim()) {
        this.adduser = false
        await this.$axios.post("/api/add/user", {
        rink: this.addfrom.rink,
        sort: this.addfrom.sort
      });
      this.getList();
      this.addfrom.rink = ''
      this.addfrom.sort = ''
      }else{
        this.$message({
          message: '级别名称不能为空',
          type: 'error',
          duration: 1000
        });
      }
      
    },
    // 获取数据列表
    async getList() {
      const result = await this.$axios.get("/api/get/user",{params: {pagenum: this.currentPage, pagesize: this.pagesize}})
      this.tableData = result.data.dataUser
      this.total = result.data.total
    },
  },
};
</script>

<style scoped>
div.user{
  height: 100%;
  overflow: hidden;
}
.el-header {
  height: 60px;
  line-height: 60px;
  padding: 0;
  display: flex;
}
.el-footer {
  text-align: center;
  height: 60px;
  line-height: 60px;
}
.el-main {
  color: #333;
  text-align: center;
  height: calc(100% - 120px);
  overflow: hidden;
}
.el-header > div {
  margin-right: 20px;
}
.el-header span {
  font-size: 15px;
  color: #888;
  margin-left: 20px;
}
.serchInput {
  width: 200px;
}
</style>
