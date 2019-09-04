<template>
  <div id="role-page">
    <common-table ref="commonTable" :api="tableApi" :query="query">
      <el-form ref="ruleForm" :inline="true" slot="search" class="ff">
        <el-form-item label="角色名称" prop="formCustomerNo" v-mar-b="0">
          <el-input size="small" v-model="query.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态" v-mar-b="0">
          <el-select size="small" v-model="query.status" placeholder="请选择状态">
            <el-option label="全部" value=""></el-option>
            <el-option :label="item.label" v-for="(item,key) in roleStatus" :key="key" :value="key"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item v-mar-b="0">
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleClickSearchBtn">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-button slot="action" style="border-radius:0;" size="small" type="primary" icon="el-icon-plus" @click="addFormVisible = true">新增角色</el-button>

      <el-table-column class-name="_common_" prop="roleName" label="角色名称" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column class-name="_common_" prop="roleCode" label="角色编号" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column class-name="_common_" label="状态">
        <template slot-scope="scope">
          <el-tag size="mini" :type="roleStatus[scope.row.status].tag">{{roleStatus[scope.row.status].label}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="_common_" prop="createTime" label="创建时间" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column class-name="_common_" label="操作" width="180">
        <template slot-scope="scope">
          <el-button class="_common_color_warning_" type="text" size="mini" @click="handleAuthConfigAction(scope.row)">配置权限</el-button>
          <el-button class="_common_color_success_" type="text" size="mini" @click="handleEditAction(scope.row)">编辑</el-button>
          <el-button class="_common_color_blue_" type="text" size="mini" @click="handleDeleteAction(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </common-table>

    <!-- 新增 -->
    <el-dialog center title="新增角色" :visible.sync="addFormVisible" width="400px">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item label="角色名称" prop="roleName" label-width="100px">
          <el-input v-model="addForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色编号" prop="roleCode" label-width="100px">
          <el-input v-model="addForm.roleCode" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$refs['addForm'].resetFields()">重置</el-button>
        <el-button :loading="saveLoading" type="primary" @click="handleClickAddSaveBtn('addForm')">确 定</el-button>
      </div>

    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="修改角色" center :visible.sync="editFormVisible" width="400px">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色编号" prop="roleCode">
          <el-input disabled v-model="editForm.roleCode" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="handleClickEditSaveBtn('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 权限列表 -->
    <el-dialog title="请选择权限" center :visible.sync="configRoleFormVisible">
      <el-tree v-loading="treeLoading" class="el-tree-box" :render-content="renderContent" :indent="30" ref="elTree" :data="treeData" :show-checkbox="true" @node-expand="nodeExpand" :check-strictly="strictly" empty-text="" node-key="privilegeCode" :default-checked-keys="defaultCheckedKeys" :props="{label:'privilegeName'}" accordion :highlight-current="true" :default-expand-all="defaultExpandAll" :default-expanded-keys="defaultExpandedKeys" :check-on-click-node="false" :expand-on-click-node="true"></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="configRoleFormVisible = false">取消</el-button>
        <el-button :loading="saveLoading" type="primary" :disabled="roleSaveBtnDisabled" @click="handleClickAuthSaveBtn()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//将后台的json转成jsonTree格式
var jsonTree = function (data, config) {
  //1.声明了变量，拿到传参过来的值，注意这里拿到的是string类型，不是对应的值
  var id = config.id || 'id',
    pid = config.pid || 'pid',
    children = config.children || 'children';
  var idMap = [],
    newIdMap = [],
    jsonTree = [];
  /*2.v[id]==v[“id”]==v.id
   idMap数组的下标对应着id为下标的相应json数据
   a[1]对应着id为1的json数据，以此类推*/
  data.forEach(function (v) {
    idMap[v[id]] = v;
  });
  //3拿到当前遍历的父元素id
  /*			根据父元素id，判断数组里是否存在这样一条数据
        存在，就判断父元素是否有子元素数组，若没有就添加一个children数组（传参过来的） 
        把当前元素添加父元素的children数组里
        不存在，就直接添加到jsonTree里*/
  data.forEach(function (v) {
    var parent = idMap[v[pid]];

    //定义一个newIdMap
    delete v.parent;//删除{v}的parent和id
    //delete v.id;
    if (parent) {
      !parent[children] && (parent[children] = []);
      parent[children].push(v);
    } else {
      jsonTree.push(v);
    }
  });
  return jsonTree;
};
import { getRoleManages, postAddRole, patchEditRole, deleteRole, getRolesTreeConfig, patchRolesTreeSave } from "@src/apis";
import CommonTable from '@src/components/CommonTable';
export default {
  components: { CommonTable },
  data () {
    return {
      tableApi: getRoleManages,
      query: {
        page: 1,
        limit: 20,
        status: "TRUE"
      },
      roleStatus: {
        "TRUE": { label: "启用", tag: "success" },
        "FLASE": { label: "未开启", tag: "warning" },
        "DELETE": { label: "已删除", tag: "danger" },
      },

      // 新增
      addFormVisible: false,
      saveLoading: false,
      addForm: {
        roleName: "",
        roleCode: ""
      },
      addFormRules: {
        roleName: [{ required: true, message: "请输入内容", trigger: "blur" }],
        roleCode: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },

      // 编辑
      editFormVisible: false,
      editForm: {},

      // 权限配置
      configRoleFormVisible: false,
      treeLoading: false,
      roleSaveBtnDisabled: false,
      treeData: [],
      defaultCheckedKeys: [],
      strictly: true,
      defaultExpandAll: false,// 默认展开全部
      defaultExpandedKeys: ["root"], // 默认展开的数组key
    }
  },
  mounted () {
    this.$refs.commonTable.loadData();
  },
  methods: {
    renderContent (h, { node, data, store }) {
      let classname = '';
      if (node.level == 4) {
        classname = 'levelname';
      }
      return (
        <span class={classname}>
          <span>{node.label}</span>
        </span>);
    },

    // 点击搜索按钮
    handleClickSearchBtn () {
      this.$refs.commonTable.refreshTableData();
    },

    // 新增角色保存
    async handleClickAddSaveBtn (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false;
        // 提交
        this.saveLoading = true;
        let data = await postAddRole(this.addForm);
        if (data.code === "00") {
          this.addFormVisible = false;
          this.$refs['commonTable'].refreshTableData();
          this.tipConfirm({ ...this.addForm });
          this.$refs['addForm'].resetFields();
        } else {
          this.$message.error(data.msg);
        }
        this.saveLoading = false;
      });
    },

    // 引导去配置权限
    tipConfirm (addForm) {
      setTimeout(() => {
        let rowData = addForm;
        this.$confirm('角色创建成功，是否现在配置权限?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '稍后配置',
          type: 'success'
        }).then(() => {
          this.handleAuthConfigAction(rowData)
        });
      }, 500);
    },

    // 删除角色
    async handleDeleteAction (rowData) {
      this.$confirm(`确定删除 “${rowData.roleName}” 角色吗?`, "提示", { type: "warning" }).then(async () => {
        let data = await deleteRole(rowData.roleCode);
        if (data.code == "00") {
          this.$refs.commonTable.loadData();
          this.$message.success("删除成功");
        } else {
          this.$message.error(data.msg);
        }
      })
    },

    // 编辑角色
    async handleEditAction (rowData) {
      this.editForm.roleName = rowData.roleName;
      this.editForm.roleCode = rowData.roleCode;
      this.editFormVisible = true;
    },

    // 编辑角色保存
    async handleClickEditSaveBtn (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false;
        // 提交
        this.saveLoading = true;
        let data = await patchEditRole(this.editForm);
        if (data.code === "00") {
          this.editFormVisible = false;
          this.$refs['commonTable'].loadData();
          this.$message.success("修改成功！");
        } else {
          this.$message.error(data.msg);
        }
        this.saveLoading = false;
      });
    },

    // 配置权限按钮
    async handleAuthConfigAction (rowData) {
      this.strictly = true;
      this.configRoleFormVisible = true;
      this.treeLoading = true;
      this.treeData = [];
      this.defaultCheckedKeys = [];

      let data = await getRolesTreeConfig({ roleCode: rowData.roleCode });
      if (data instanceof Array) {
        this.treeData = jsonTree(data, {
          id: "nodeId",
          pid: "parentNodeId",
          children: "children"
        });
        this.defaultCheckedKeys = this.getDefaultCheckedKeys(data);
        this._cacheDefaultCheckedNodes = this.getDefaultCheckedNodes(data);
        this._cacheRoleCode = rowData.roleCode;
        this.$nextTick(() => {
          this.strictly = false;
          this.nodeExpand();
        })
        // this.$nextTick(this.checkChange);
      } else {
        this.$message.error('"getRolesTree" 接口返回值出错');
      }
      this.treeLoading = false;
    },

    // 点击保存权限
    async handleClickAuthSaveBtn () {
      try {
        // 获取当前全部的全选节点
        let checks = this.$refs.elTree.getCheckedNodes();
        // 获取当前全部的半选节点
        let halfChecks = this.$refs.elTree.getHalfCheckedNodes();
        // 当前所有选中的节点
        let allCheckdNodes = [...checks, ...halfChecks];
        // 原始所有选中的节点
        let orginCheckNodes = this._cacheDefaultCheckedNodes;

        // 得到新增的节点
        let a = this.getNewAddNodes(allCheckdNodes, orginCheckNodes);
        // 得到移除的节点
        let r = this.getDeleteNodes(allCheckdNodes, orginCheckNodes);

        if (a.length === 0 && r.length === 0) {
          this.$message.error("请修改勾选后在确认提交");
          return;
        }

        let addMenuCodes = [], addMenuFunctionCodes = [];
        for (let index = 0; index < a.length; index++) {
          const element = a[index];
          if (element.type === "menu") addMenuCodes.push(element.privilegeCode);
          if (element.type === "function") addMenuFunctionCodes.push(element.privilegeCode);
        }

        let deleteMenuCodes = [], deleteMenuFunctionCodes = [];
        for (let index = 0; index < r.length; index++) {
          const element = r[index];
          if (element.type === "menu") deleteMenuCodes.push(element.privilegeCode);
          if (element.type === "function") deleteMenuFunctionCodes.push(element.privilegeCode);
        }

        this.saveLoading = true;
        let data = await patchRolesTreeSave({
          roleCode: this._cacheRoleCode,
          addMenuCodes: addMenuCodes.join(","),
          deleteMenuCodes: deleteMenuCodes.join(","),
          addMenuFunctionCodes: addMenuFunctionCodes.join(","),
          deleteMenuFunctionCodes: deleteMenuFunctionCodes.join(",")
        });

        if (data.code == "00") {
          this.$message.success("角色配置成功");
          this.configRoleFormVisible = false;
        } else {
          this.$message.error(data.msg);
        }
        this.saveLoading = false;

      } catch (error) {
        this.$message.error(error.message);
      }
    },

    // 找出新增的keys
    getNewAddNodes (currCheckedNodes, defaultCheckedNodes) {
      let _tmp = [];
      for (let index = 0; index < currCheckedNodes.length; index++) {
        const item = currCheckedNodes[index];
        // 如果defaultChecked 数组中有 curKey 的话返回true
        if (!defaultCheckedNodes.some(x => x.privilegeCode === item.privilegeCode)) {
          _tmp.push(item);
        }
      }
      return _tmp;
    },

    // 找出移除的keys
    getDeleteNodes (currCheckedNodes, defaultCheckedNodes) {
      let _tmp = [];
      for (let index = 0; index < defaultCheckedNodes.length; index++) {
        const item = defaultCheckedNodes[index];
        // 如果defaultChecked 数组中有 curKey 的话返回true
        if (!currCheckedNodes.some(x => x.privilegeCode === item.privilegeCode)) {
          _tmp.push(item);
        }
      }
      return _tmp;
    },

    // 找出treeData中默认选中的tree,并返回 _cacheDefaultCheckedNodes 数组
    getDefaultCheckedNodes (treeData) {
      let _tmp = [];
      for (let index = 0; index < treeData.length; index++) {
        const tree = treeData[index];
        // 这里只查找type类型为function的节点数据 因为父子节点是联动的
        if (tree.checked === "TRUE") {
          _tmp.push(tree);
        }
      }
      return _tmp;
    },

    // 找出treeData中默认选中的tree,并返回 defaultCheckedKeys 数组
    getDefaultCheckedKeys (treeData) {
      let _tmp = [];
      for (let index = 0; index < treeData.length; index++) {
        const tree = treeData[index];
        // 这里只查找type类型为function的节点数据 因为父子节点是联动的
        if (tree.checked === "TRUE") {
          _tmp.push(tree.privilegeCode);
        }
      }
      return _tmp;
    },

    // 节点展开时触发
    nodeExpand () {
      // 因为tree内部展开时会对节点元素重置样式，所以这里要使用nextTick方法
      this.$nextTick(() => {
        var _levelname = document.getElementsByClassName("levelname");
        for (var i = 0; i < _levelname.length; i++) {
          _levelname[i].parentNode.style.cssFloat = 'left';
          _levelname[i].parentNode.style.styleFloat = 'left';
        }
      })
    },
  }
}
</script>

<style>
.el-tree-node__content {
  /* margin-bottom: 10px; */
}
.el-tree-node__content span.levelname {
  float: left;
  width: 126px;
}

.fff {
  display: flex;
}
</style>
