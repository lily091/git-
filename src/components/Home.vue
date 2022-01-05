<template>
  <div class="home1" style="height: 100%">
    <el-container>
      <el-container>
        <el-aside :width="iscollapse ? '65px' : '200px'">
          <simple-menu :iscollapse="iscollapse" @getpath="getpath" :activeIndex="activeIndex" />
        </el-aside>
        <el-container>
          <el-header style="height: 75px">
            <el-row :gutter="20">
              <el-col :span="19">
                <div class="a1">
                  <i
                    :class="iscollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                    style="line-height: 40px; margin-right: 10px"
                    @click="iscollapse = !iscollapse"
                  ></i>
                  <el-breadcrumb separator="/" style="line-height: 40px">
                    <el-breadcrumb-item
                      ><a @click="changeHome">首页</a></el-breadcrumb-item
                    >
                    <el-breadcrumb-item
                      v-for="(el, index) in breadcrumb"
                      :key="index"
                      >{{ el }}</el-breadcrumb-item
                    >
                  </el-breadcrumb>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="name">
                  <p>玛卡巴卡</p>
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      <img
                        src="../assets/toux.jpg"
                        alt=""
                        width="40px"
                        height="40px"
                      />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>个人信息</el-dropdown-item>
                      <el-dropdown-item>
                        <router-link to="/login">退出</router-link>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
            </el-row>
            <div class="bar">
              <el-tag
                size="small"
                v-for="tag in tags"
                :key="tag.name"
                closable
                :type="tag.type"
                @close="handleClose(tag)"
                @click="handleClick(tag)"
              >
                {{ tag.name }}
              </el-tag>
            </div>
          </el-header>
          <el-main>
            <div class="component">
              <router-view></router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import SimpleMenu from "./menu/Menu";
export default {
  name: "Home",
  data() {
    return {
      iscollapse: false, //导航栏收缩标志
      tags: [{ name: "首页", type: "", keyPath: "",router: '' }],
      breadcrumb: [], //面包屑
      activeIndex: '/console'
    };
  },
  methods: {
    getpath(value){
      this.changeBreadcumb(value.keyPath);
      this.handleAdd(value.key, value.keyPath,value.router);
    },
    changeHome() {
      let arr = [{ name: "首页", type: "", keyPath: "",router: '/console' }];
      this.changeBreadcumb('');
      this.handleAdd(arr[0].name,arr[0].keyPath,arr[0].router);
      this.$router.push('/console')
      this.activeIndex = "/console";
    },
    handleAdd(key, keyPath,router) {
      this.clearTagColor();
      if (typeof key != 'string') {
        var key = key[key.length-1]
      }
      let index = this.findeIndex(key);
      if (index !== undefined) {
        this.tags[index].type = "";
      } else {
        this.tags.push({ name: key, type: "", keyPath, router});
      }
    },
    handleClose(tag) {
      Vue.delete(this.tags, this.tags.indexOf(tag));
      if (tag.type != "info") {
        if (this.tags.length > 0) {
          let obj = this.tags[this.tags.length - 1];
          this.$router.push(obj.router)
          this.activeIndex = obj.router;
          this.changeBreadcumb(obj.keyPath);
          obj.type = "";
        } else {
          this.changeHome();
        }
      }
    },
    handleClick(tag) {
      this.activeIndex = "";
      this.clearTagColor();
      tag.type = "";
      this.$router.push(tag.router)
      this.changeBreadcumb(tag.keyPath);
      this.activeIndex = tag.router;
    },
    changeBreadcumb(arr) {
      if (typeof arr == 'string') {
        var arr = [arr]
      }
      this.breadcrumb = [];
      if (arr[0].name == "首页") return;
      this.breadcrumb = arr;
    },
    clearTagColor() {
      this.tags = this.tags.map((el) => {
        el.type = "info";
        return el;
      });
    },
    findeIndex(key) {
      // 在tags里查找存在name= key的，返回下表
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i].name == key) {
          var index = i;
          break;
        }
      }
      return index;
    },
  },
  components: {
    SimpleMenu,
  },
};
</script>

<style scoped>
.el-header {
  height: 140px;
  padding: 5px;
  background-color: #fff;
}
.el-container {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-dropdown-link {
  cursor: pointer;
  color: #aaa;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-tag {
  margin-left: 10px;
  cursor: pointer;
}
.el-submenu .el-menu-item {
  min-width: 199px;
}
.el-main {
  margin: 10px 0 0 15px;
  padding: 10px;
  height: 100%;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}
div.name {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: center;
}
div.name > p {
  font-size: 16px;
}
div.name img {
  margin-left: 20px;
}
div.a1 {
  display: flex;
  line-height: 40px;
  margin-left: 10px;
}
div.component {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: auto;
}
</style>
