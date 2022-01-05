<template>
  <div class="role">
    <el-header>
        <div><span>会员手机</span></div>
        <div class="serchInput">
          <el-input
            placeholder="请输入会员手机号"
            v-model="input"
            size="small"
          ></el-input>
        </div>
        <div class="button">
          <el-button type="primary" icon="el-icon-search" size="small" @click="search"
            >搜索</el-button
          >
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addRole=true"
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
          >
            <el-table-column type="selection" width="55" align='center'></el-table-column>
            <el-table-column prop="id" label="ID" width="80" align='center'></el-table-column>
            <el-table-column prop="name" label="会员姓名" width="80" align='center'></el-table-column>
            <el-table-column prop="rink" label="会员级别" width="80" align='center'></el-table-column>
            <el-table-column label="头像" width="80" align='center'>
              <template slot-scope="scope">
                <img :src="scope.row.img" width="30" height="30" class="head_pic"/>
              </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" width="80" align='center'> </el-table-column>
            <el-table-column prop="phone" label="手机号" width="120" align='center'> </el-table-column>
            <el-table-column prop="state" label="状态" width="120" align='center'> 
              <template slot-scope="scope">
                <span v-if="scope.row.state">正常</span><span v-else>禁用</span> 
                <el-switch v-model="scope.row.state"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="设备类型" align='center' width="80"> </el-table-column>
            <el-table-column prop="source" label="来源" width="100" align='center'>
              <template slot-scope="scope">
                <span v-if="scope.row.source">注册会员</span><span v-else>马甲会员</span> 
              </template>
            </el-table-column>
            <el-table-column prop="time" label="注册时间"  align='center' width="220"> </el-table-column>
            <el-table-column prop="newTime" label="最近登录时间" width="220" align='center'> </el-table-column>
            <el-table-column prop="number" label="登录次数" width="100" align='center'> </el-table-column>
            <el-table-column prop="loginState" label="登录状态" width="100" align='center'> </el-table-column>
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
      title="添加会员"
      :visible.sync="addRole"
      width="50%"
      center>
      <el-form :model="addfrom" :rules="rules" ref="addfrom" label-width="100px" class="demo-addfrom">
        <el-form-item label="头像">
          <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="addfrom.name" laceholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addfrom.phone"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" >
          <el-col :span="11">
            <el-form-item prop="birthdate">
              <el-date-picker type="date" placeholder="选择日期" v-model="addfrom.birthdate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="addfrom.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
            <el-radio label="保密">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <span v-if="addfrom.state">正常</span><span v-else>禁用</span>
          <el-switch v-model="addfrom.state"></el-switch>
        </el-form-item>
        <el-form-item label="个人简介" prop="desc">
          <el-input type="textarea" v-model="addfrom.desc" placeholder="请输入个人简介"></el-input>
        </el-form-item>
        <el-form-item label="个人签名" prop="autograph">
          <el-input type="textarea" v-model="addfrom.autograph" placeholder="请输入个人签名"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-select v-model="addfrom.type" placeholder="请选择活动区域">
            <el-option label="马甲" value="马甲"></el-option>
            <el-option label="PC" value="PC"></el-option>
            <el-option label="WAP" value="WAP"></el-option>
            <el-option label="安卓" value="安卓"></el-option>
            <el-option label="苹果" value="苹果"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <span v-if="addfrom.source">注册会员</span><span v-else>马甲会员</span>
          <el-switch v-model="addfrom.source"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRole = false">取 消</el-button>
        <el-button type="primary" @click="addRank">提 交</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改级别"
      :visible.sync="updataRole"
      width="50%"
      center>
      <el-form :model="updatafrom" :rules="rules" ref="updatafrom" label-width="100px" class="demo-addfrom">
        <el-form-item label="头像">
          <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="updatafrom.name" laceholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="updatafrom.phone"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" >
          <el-col :span="11">
            <el-form-item prop="birthdate">
              <el-date-picker type="date" placeholder="选择日期" v-model="updatafrom.birthdate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="updatafrom.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
            <el-radio label="保密">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <span v-if="updatafrom.state">正常</span><span v-else>禁用</span>
          <el-switch v-model="updatafrom.state"></el-switch>
        </el-form-item>
        <el-form-item label="个人简介" prop="desc">
          <el-input type="textarea" v-model="updatafrom.desc" placeholder="请输入个人简介"></el-input>
        </el-form-item>
        <el-form-item label="个人签名" prop="autograph">
          <el-input type="textarea" v-model="updatafrom.autograph" placeholder="请输入个人签名"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="type">
          <el-select v-model="updatafrom.type" placeholder="请选择活动区域">
            <el-option label="马甲" value="马甲"></el-option>
            <el-option label="PC" value="PC"></el-option>
            <el-option label="WAP" value="WAP"></el-option>
            <el-option label="安卓" value="安卓"></el-option>
            <el-option label="苹果" value="苹果"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源" prop="source">
          <span v-if="updatafrom.source">注册会员</span><span v-else>马甲会员</span>
          <el-switch v-model="updatafrom.source"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updataRole = false">取 消</el-button>
        <el-button type="primary" @click="updataRank">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import isvalidPhone from '../assets/js/valiDate'
var validPhone=(rule, value,callback)=>{
      if (!value){
          callback(new Error('请输入电话号码'))
      }else  if (!isvalidPhone(value)){
        callback(new Error('请输入正确的11位手机号码'))
      }else {
          callback()
      }
  }
export default {
  name: "Role",
  data() {
    return {
      currentPage: 1,  //当前显示的数据页数，默认第一页
      pagesize: 5, //每页数据条数
      input: "", //  搜索输入框
      tableData: [],
      total: 0, //数据总条数
      addRole: false, //添加对话框显示标志
      id: null, //当前操作行的id
      addfrom: {
        name: '', phone: '',birthdate: '',sex: '男',state: true ,desc: '',autograph: '', type: '马甲', source: false,img: ''
      },
      updataRole: false,
      updatafrom: {
        name: '', phone: '',birthdate: '',sex: '',state: null ,desc: '',autograph: '', type: '', source: null,img: ''
      }, 
      imageUrl: '', //头像
      rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, trigger: 'blur',validator: validPhone }
          ]
        }
    };
  },
  mounted(){
    this.getList()
  },
  methods: {
    // 分页跳转
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    // 修改
    handleEdit(index, row) {
      this.updataRole = true
      let arr = this.tableData.filter(el=>el.id == row.id)[0]
      this.updatafrom = arr
      this.imageUrl = arr.img
    },
        // 批量删除
    delAll(){
      console.log(99);
    },
    // 清空
    clearSearch(){
      this.getList()
    },
    // 修改
    async updataRank(){
       const result = await this.$axios.post("/api/updata/role", this.updatafrom);
      this.updataRole = false
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
      const result = await this.$axios.post("/api/delete/role", { id: row.id });
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
      const result = await this.$axios.post("/api/search/role", { phone: input });
      this.tableData = result.data.dataRole;
      this.total = result.data.dataRole.length
    },
    // 添加
    async addRank(){
      //点击添加的确认按钮
      this.addRole = false
      if (this.imageUrl) {
        this.addfrom.img = this.imageUrl
      }
      const result = await this.$axios.post("/api/add/role", this.addfrom);
      if (result.status == 200) {
        this.$message({
          message: '添加成功',
          type: 'success',
          duration: 1000
        });
        this.getList()        
      } else {
        this.$message.error('添加失败');
      }
      this.addfrom = { name: '', phone: '',birthdate: '',sex: '男',state: true ,desc: '',autograph: '', type: '马甲', source: false,img: ''}
      this.imageUrl = ''
    },
    // 获取数据列表
    async getList() {
      const result = await this.$axios.get("/api/get/role",{params: {pagenum: this.currentPage, pagesize: this.pagesize}})
      this.tableData = result.data.dataRole
      this.total = result.data.total
    },
    // 头像上传的函数
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
        
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
     if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
};
</script>

<style scoped>
div.role {
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
 .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border: 1px dashed #ccc;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: block;
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
.head_pic{
  border-radius: 50%;
}
</style>
