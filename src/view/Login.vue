<template>
  <div class="login" :style="style">
    <div class="box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <div class="text item">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="0"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model.number="ruleForm.username"
                autocomplete="off"
                placeholder="用户名"
                clearable
                prefix-icon='el-icon-s-custom'
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                prefix-icon='el-icon-s-goods'
                v-model.number="ruleForm.password"
                autocomplete="off"
                show-password
                placeholder="密码"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="20">
                <el-col :span="14">
                  <el-input placeholder="验证码" v-model="ruleForm.code" clearable> </el-input>
                </el-col>
                <el-col :span="8">
                  <v-sidentify :identifyCode="identifyCode" @click.native="change"></v-sidentify>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import Sidentify from "../components/common/Sidentify"; //**引入验证码组件**
export default {
  name: "Login",
  data() {
    return {
      style:
        "height:" +
        this.$store.state.screenH +
        "px;width:" +
        this.$store.state.screenW +
        "px",
      ruleForm: {
        username: "admin",
        password: "123",
        code: "2250",
      },
      rules: {
        username: [ { required: true, message: '用户名不能为空',trigger: "blur"},],
        password: [{ required: true, message: '密码不能为空',trigger: "blur"},],
        code: [{ required: true, message: '验证码不能为空',trigger: "blur"},],
      },
      identifyCode: "",
      identifyCodes: "1234567890",
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  created() {
    this.refreshCode();
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
    },
    submitForm(formName) {
      const json = this.$refs[formName].model;
      // json.code != this.identifyCode
      if (json.code != "2250") {
        this.$message.error('验证码错误');
      } else if(json.password!='123'&&json.username!='admin'){
        this.$message.error('用户名或密码错误');
      }else{
        this.$router.push({ path: "/" });
      }
    },
    change(){
      this.refreshCode();
    }
  },
  components: {
    "v-sidentify": Sidentify,
  },
};
</script>

<style scoped>
div.login {
  background: url("../assets/bg.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-card {
  width: 380px;
  text-align: center;
}
.box_1 {
  margin-bottom: 10px;
  text-align: center;
}
</style>
