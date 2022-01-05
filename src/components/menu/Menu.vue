<template>
  <div class="menu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        background-color="#001529"
        @select="handleSelect"
        text-color="#fff"
        :collapse="iscollapse"
        router
      >
        <div v-for="(item,i) in menuArr" :key="i">
          <div v-if="item.meta.hasSubMenu">
            <el-submenu :index="item.path">
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span v-if="!iscollapse">{{ item.meta.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="el in item.children"
                  :key="el.meta.title"
                  :index="el.path"
                >
                  <i :class="el.meta.icon"></i>
                  <span>{{ el.meta.title }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
          <div v-else>
            <el-menu-item :index="item.path">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </div>
        </div>
      </el-menu>
  </div>
</template>
<script>
export default {
  name: "Menu",
  props: ["iscollapse","activeIndex"],
  data() {
    return {
      menuArr: [],
    };
  },
  mounted() {
    this.menuArr = this.$router.options.routes[2].children
  },
  methods:{
    handleSelect(key, keyPath) {
      let obj = {
        '/console': '首页',
        '/system': '系统管理',
        '/operate': '运营管理',
        '/member/user': ['会员管理','会员等级'],
        '/member/role': ['会员管理','会员管理'],
        '/information': '消息中心',
        '/limit': '权限管理',
        '/tool': '系统工具'
      }
      this.$emit('getpath',{key:obj[key],keyPath:obj[key],router:key})
    },
  }
};
</script>
<style scoped>
div.menu{
  height: 100%;
  overflow: hidden;
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
.el-submenu .el-menu-item {
  min-width: 199px;
}

</style>
