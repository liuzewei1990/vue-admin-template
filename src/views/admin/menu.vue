<template>
  <div class="menu-page">
    <!-- tree -->
    <div class="tree-box">
      <el-container>
        <el-header height="auto">
          <h3 class="tree-title border">菜单管理</h3>
        </el-header>
        <el-main>
          <el-tree class="el-tree-box" ref="elTree" :show-checkbox="false" node-key="menuCode" :props="{label:'menuName',children:'children',isLeaf:isLeaf}" :lazy="true" :load="loadNode" :default-expand-all="false" :expand-on-click-node="true" :draggable="true" :allow-drag="handleAllowDrag" :allow-drop="handleAllowDrop" :indent="10" :default-expanded-keys="['root']" @node-click="handleNodeClick" @node-drop="handleNodeDrop">
            <div class="custom-tree-node" slot-scope="{ node, data }">
              <span class="label" @mouseenter="mouseenterNodeShowAcitionBtn(data)" @mouseleave="mouseleaveNodeShowAcitionBtn()">{{ node.data.menuName }}</span>
              <span class="action-btn" v-show="data.menuCode == mouseenterMenuCode">
                <el-button type="text" size="mini" @click.stop="() => handleClickDeleteBtn(node, data)">删除</el-button>
                <el-button v-if="data.isParent == 'TRUE'" type="text" size="mini" @click.stop="() => handleClickAddBtn(data)">添加</el-button>
                <el-button type="text" size="mini" @click.stop="() => handleClickEditBtn(node,data)">修改</el-button>
              </span>
            </div>
          </el-tree>
        </el-main>
      </el-container>
    </div>

    <!-- 表格 -->
    <div class="content-box">
      <common-table :isFluid="true" ref="commonTable" :api="getMenuFunctionPage" :query="query">
        <h3 slot="search" class="tree-title">【{{functionMenu.menuName || '未选中菜单'}}】权限管理</h3>
        <!-- <h3 slot="search" class="tree-title" v-else>请先选择菜单项</h3> -->
        <el-button slot="action" style="border-radius:0;" size="small" :disabled="!functionMenu.menuCode" type="primary" icon="el-icon-plus" @click="addFuncDialog">添加权限</el-button>
        <el-table-column class-name="_common_" prop="functionName" label="权限描述"></el-table-column>
        <el-table-column class-name="_common_" prop="functionCode" label="权限编号"></el-table-column>
        <el-table-column class-name="_common_" prop="url" label="权限url"></el-table-column>
        <el-table-column class-name="_common_" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column class-name="_common_" label="请求方法" width="100">
          <template slot-scope="scope">
            <el-tag type="success">{{scope.row.httpMethod}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="_common_" label="权限状态" width="100">
          <template slot-scope="scope">
            <el-tag>{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column class-name="_common_" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editFuncDialog(scope.row)">修改</el-button>
            <el-button type="text" size="mini" @click="deleteFunc(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </common-table>
    </div>

    <!-- 新增菜单 -->
    <el-dialog title="新增菜单" center :visible.sync="addFormVisible" width="500px">
      <el-form size="small" :model="addForm" ref="addForm" :rules="addFormRules">
        <el-form-item label="菜单名称" prop="menuName" :label-width="formLabelWidth">
          <el-input v-model="addForm.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单编号" prop="menuCode" :label-width="formLabelWidth">
          <el-input v-model="addForm.menuCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有下级菜单">
          <el-switch v-model="addForm.isParent" active-value="TRUE" inactive-value="FALSE" active-text="是" inactive-text="否">
          </el-switch>
        </el-form-item>
        <el-form-item v-if="(addForm.isParent=='TRUE'?false:true)" label="菜单url" prop="url" :label-width="formLabelWidth">
          <el-input v-model="addForm.url" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="addSave()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑菜单 -->
    <el-dialog title="修改菜单" center :visible.sync="editFormVisible" width="500px">
      <el-form size="small" :model="editForm" ref="editForm" :rules="addFormRules">
        <el-form-item label="菜单名称" prop="menuName" :label-width="formLabelWidth">
          <el-input v-model="editForm.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单编号" prop="menuCode" :label-width="formLabelWidth">
          <el-input v-model="editForm.menuCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="!editForm.isParent" label="菜单url" prop="url" :label-width="formLabelWidth">
          <el-input v-model="editForm.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有下级菜单">
          <!-- {{editForm.isParent}}
            <el-switch v-model="editForm.isParent" active-value="true" inactive-value="false" active-text="是" inactive-text="否">
            </el-switch> -->
          <el-select :disabled="true" prop="isParent" v-model="editForm.isParent" placeholder="是否有下级菜单">
            <el-option v-for="item in editOptionsResult" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="editSave('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 新增权限 -->
    <el-dialog :title="`添加权限`" center :visible.sync="addFuncFormVisible" width="500px">
      <el-form size="small" :model="addFuncForm" ref="addFuncForm">
        <el-form-item label="归属菜单" prop="menuName" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="addFuncForm.menuName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" :label-width="formLabelWidth">
          <el-select @change="functionTypeChange" prop="functiontype" v-model="addFuncForm.functiontype" placeholder="权限类型">
            <el-option v-for="item in addFuncForm.typeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限名称" prop="functionName" :label-width="formLabelWidth">
          <el-input v-model="addFuncForm.functionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限url" prop="url" :label-width="formLabelWidth">
          <el-input v-model="addFuncForm.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="请求方法" :label-width="formLabelWidth">
          <el-select prop="httpMethod" v-model="addFuncForm.httpMethod" placeholder="请求方法">
            <el-option v-for="item in httpMethodOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限编号" prop="functionCode" :label-width="formLabelWidth">
          <el-input v-model="addFuncForm.functionCode" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFuncFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="addFuncSave('addFuncForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 权限编辑 start -->
    <el-dialog title="修改权限" center :visible.sync="editFuncFormVisible" width="500px">
      <el-form size="small" :model="editFuncForm" ref="editFuncForm">
        <!-- <el-form-item label="菜单名称" prop="menuName" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="editFuncForm.menuName" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="权限编号" prop="functionCode" :label-width="formLabelWidth">
          <el-input :disabled="true" v-model="editFuncForm.functionCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" prop="functionName" :label-width="formLabelWidth">
          <el-input v-model="editFuncForm.functionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限url" prop="url" :label-width="formLabelWidth">
          <el-input v-model="editFuncForm.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="请求方法" :label-width="formLabelWidth">
          <el-select prop="httpMethod" v-model="editFuncForm.httpMethod" placeholder="是否有下级菜单">
            <el-option v-for="item in httpMethodOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFuncFormVisible = false">取 消</el-button>
        <el-button :loading="saveLoading" type="primary" @click="editFuncSave('editFuncFormVisible')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuTrees, dropMenuTree, patchAddMenuTree, patchEditMenuTree, deleteMenuTree, getMenuFunctionPage, postAddMenuFunction, patchEditMenuFunction, deleteMenuFunction } from "@src/apis";
import CommonTable from '@src/components/CommonTable';
export default {
  components: { CommonTable },
  data () {
    return {
      mouseenterMenuCode: "",
      formLabelWidth: "100px",
      getMenuFunctionPage: getMenuFunctionPage,
      query: {
        menuCode: "",
        page: 1,
        limit: 10
      },
      // 新增菜单
      addFormVisible: false,
      saveLoading: false,
      addFormRules: {},
      addForm: {},
      // 编辑菜单
      editFormVisible: false,
      editForm: {},
      editOptionsResult: [{
        value: true,
        label: "是"
      }, {
        value: false,
        label: "否"
      }],
      // 新增权限
      addFuncFormVisible: false,
      addFuncForm: {
        menuName: "",
        functionName: "",
        url: "",
        httpMethod: "",
        functionCode: "",
        // 权限类型
        typeOptions: [
          {
            value: "add",
            label: "新增"
          },
          {
            value: "edit",
            label: "修改"
          },
          {
            value: "page",
            label: "分页查询"
          },
          {
            value: "delete",
            label: "删除"
          }
        ]
        // 请求方法
      },
      httpMethodOptions: [
        {
          value: "GET",
          label: "GET"
        },
        {
          value: "POST",
          label: "POST"
        },
        {
          value: "PATCH",
          label: "PATCH"
        },
        {
          value: "DELETE",
          label: "DELETE"
        },
        {
          value: "PUT",
          label: "PUT"
        },
        {
          value: "HEADN",
          label: "HEADN"
        },
        {
          value: "OPTIONS",
          label: "OPTIONS"
        }
      ],
      functionMenu: {},
      // 权限编辑
      editFuncFormVisible: false,
      editFuncForm: {},

    }
  },
  methods: {

    // 调用接口获取menu
    async getMenu (menuCode = "") {
      let data = await getMenuTrees({ menuCode });
      if (data instanceof Array) {
        return data;
      } else {
        this.$message({
          type: "warning",
          message: "menu数据不是数组类型"
        });
        return [];
      }
    },

    // 加载node节点数据
    async loadNode (node, resolve) {
      if (node.level === 0) {
        let data = await this.getMenu();
        return resolve(data);
      } else {
        if (node.data && node.data.menuCode) {
          let data = await this.getMenu(node.data.menuCode);
          return resolve(data);
        }
      }
    },

    // 调用接口获取子节点数据，并更新指定的tree
    async updataNodeChilds (parentCode) {
      let childData = await this.getMenu(parentCode);
      this.$refs.elTree.updateKeyChildren(parentCode, childData);
    },

    // 鼠标移入label显示actionBtn
    mouseenterNodeShowAcitionBtn (data) {
      this.mouseenterMenuCode = data.menuCode;
    },

    // 鼠标移除label隐藏actionBtn
    mouseleaveNodeShowAcitionBtn () {
      // this.mouseenterMenuCode = "";
    },

    // 触发点击节点
    handleNodeClick (data, node, vNode) {
      if (data.isParent === "FALSE") {
        this.functionMenu = { ...data };
        this.refreshTableData(this.functionMenu.menuCode);
      }
    },

    // 检查节点是否为叶子节点
    isLeaf (data, node) {
      if (data.isParent === 'TRUE') {
        return false;
      } else if (data.isParent === 'FALSE') {
        return true;
      } else {
        return true;
      }
    },

    // 判断节点能否被拖拽 返回true代表可以拖拽，如果是叶子节点才可以拖拽
    handleAllowDrag (node) {
      return true;
    },

    // 拖拽时判定目标节点能否被放置,type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
    handleAllowDrop (draggingNode, dropNode, type) {
      // 判断逻辑为拖拽节点只能放到自己父级节点中 并且不能为inner类型
      if (dropNode.parent.data.menuCode == draggingNode.parent.data.menuCode && type !== "inner") {
        return true;
      } else {
        return false;
      }
    },

    // 拖拽完成后调用接口改变顺序 type = （before、after、inner）
    async handleNodeDrop (dropNode, draggingNode, type) {
      let types = { before: "prev", after: "next" }
      let res = await dropMenuTree({
        menuCode: dropNode.data.menuCode,
        targetCode: draggingNode.data.menuCode,
        moveType: types[type],
      });
      if (res.code == '00') {
        this.$message({
          message: `菜单'${dropNode.data.menuName}'位置移动成功`,
          type: "success",
          center: true
        });
      }
    },

    // 处理点击添加菜单按钮
    handleClickAddBtn (data) {
      if (data.menuCode) {
        this.addForm.parentCode = data.menuCode;
        this.addFormVisible = true;
      }
    },

    // 处理点击编辑菜单按钮
    handleClickEditBtn (node, data) {
      this.editForm = { ...data };
      if (this.editForm.isParent === "TRUE") {
        this.editForm.isParent = true;
      } else {
        this.editForm.isParent = false;
      }
      this.editFormVisible = true;
    },

    // 处理点击删除指定的菜单
    handleClickDeleteBtn (node, data) {
      this.$confirm(`确定删除 ${data.menuName} 吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await deleteMenuTree(data.menuCode);
        if (res.code == "00") {
          await this.updataNodeChilds(data.parentCode);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      })
    },

    // 新增权限弹出显示
    addFuncDialog () {
      this.addFuncForm.httpMethod = "";
      this.addFuncForm.functiontype = "";
      this.addFuncForm.functionName = "";
      this.addFuncForm.url = "";
      this.addFuncForm.functionCode = "";
      this.addFuncForm.httpMethod = "GET";
      var functionMenu = this.functionMenu;
      var addFuncForm = this.addFuncForm;
      this.addFuncForm.menuName = functionMenu.menuName;
      this.addFuncForm.menuCode = functionMenu.menuCode;
      this.addFuncFormVisible = true;
    },

    // 修改权限弹出显示
    editFuncDialog (rowdata) {
      this.editFuncForm = { ...rowdata };
      this.editFuncForm.menuName = this.functionMenu.menuName;
      this.editFuncFormVisible = true;
    },

    // 保存新增菜单信息
    async addSave () {
      this.saveLoading = true;
      var addForm = this.addForm;
      let data = await patchAddMenuTree({
        menuName: addForm.menuName,
        parentCode: addForm.parentCode,
        menuCode: addForm.menuCode,
        isParent: addForm.isParent,
        url: addForm.url
      })
      if (data.code == "00") {
        await this.updataNodeChilds(addForm.parentCode);
        this.addFormVisible = false;
        this.$message({
          type: "success",
          message: "恭喜您，新增菜单成功!"
        });
      } else {
        this.$message({
          type: "warning",
          message: data.msg
        });
      }
      this.saveLoading = false;
    },

    // 保存编辑菜单信息
    async editSave () {
      this.saveLoading = true;
      let editForm = this.editForm;
      let data = await patchEditMenuTree({
        menuName: editForm.menuName,
        menuCode: editForm.menuCode,
        isParent: editForm.isParent,
        url: editForm.url
      });
      if (data.code == "00") {
        await this.updataNodeChilds(editForm.parentCode);
        this.editFormVisible = false;
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        this.$message({
          type: "warning",
          message: data.msg
        });
      }
      this.saveLoading = false;
    },

    // 新增菜单权限类型改变自动填充表单内容
    functionTypeChange (data) {
      if (data.value == "") {
        return false;
      }
      let menuCode = this.functionMenu.menuCode;
      let functionName = "";
      let url = "/" + menuCode;
      if (data == "add") {
        this.addFuncForm.httpMethod = "POST";
        functionName = "新增";
      } else if (data == "edit") {
        functionName = "修改";
        this.addFuncForm.httpMethod = "PATCH";
      } else if (data == "page") {
        functionName = "分页查询";
        this.addFuncForm.httpMethod = "GET";
        url += "/page";
      } else if (data == "delete") {
        functionName = "删除";
        this.addFuncForm.httpMethod = "DELETE";
        url += "/delete/*";
      }
      this.addFuncForm.functionName = functionName;
      this.addFuncForm.url = url;
      this.addFuncForm.functionCode = menuCode + "_" + data;
    },

    // 新增权限保存按钮
    async addFuncSave () {
      this.saveLoading = true;
      let data = await postAddMenuFunction({
        menuCode: this.functionMenu.menuCode,
        menuName: this.addFuncForm.menuName,
        "function-type": this.addFuncForm.functiontype,
        functionName: this.addFuncForm.functionName,
        url: this.addFuncForm.url,
        httpMethod: this.addFuncForm.httpMethod,
        functionCode: this.addFuncForm.functionCode
      });

      if (data.code == "00") {
        // 更新数据
        this.refreshTableData(this.functionMenu.menuCode);
        this.addFuncFormVisible = false;
      } else {
        this.$message({
          type: "warning",
          message: data.msg
        });
      }
      this.saveLoading = false;
    },

    // 编辑权限保存按钮
    async editFuncSave () {
      // 修改权限保存
      this.saveLoading = true;
      var editFuncForm = this.editFuncForm;
      let data = await patchEditMenuFunction({
        menuCode: this.functionMenu.menuCode,
        menuName: editFuncForm.menuName,
        functionName: editFuncForm.functionName,
        url: editFuncForm.url,
        httpMethod: editFuncForm.httpMethod,
        functionCode: editFuncForm.functionCode
        // ...this.editFuncForm
      });
      if (data.code == "00") {
        // 更新数据
        this.refreshTableData(this.functionMenu.menuCode);
        this.editFuncFormVisible = false;
      } else {
        this.$message({
          type: "warning",
          message: data.msg
        });
      }
      this.saveLoading = false;
    },

    // 删除权限按钮
    async deleteFunc (rowdata) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let data = await deleteMenuFunction(rowdata.functionCode);
        if (data.code == "00") {
          this.refreshTableData(this.functionMenu.menuCode);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        } else {
          this.$message({
            type: "warning",
            message: data.msg
          });
        }
      });
    },

    // 刷新table的数据
    async refreshTableData (menuCode) {
      this.query = { menuCode: menuCode, page: 1, limit: 10 };
      this.$nextTick(() => {
        this.$refs.commonTable.loadData();
      })
    },

  }
}
</script>

<style lang="scss" scoped>
.menu-page {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  .tree-title {
    padding: 10px 0;
    color: #aaa;
    text-align: center;
  }
  .border {
    border-bottom: 1px solid #eee;
    padding: 20px 0;
  }

  .tree-box {
    border-right: 1px solid #e4e4e4;
    flex-shrink: 0;
    width: 250px;
    overflow-x: hidden;
    overflow-y: auto;
    .el-tree-box {
      background: transparent;
    }

    .custom-tree-node {
      // flex: 1;
      display: flex;
      align-items: center;
      font-size: 13px;
      .label {
        flex: 1;
      }
    }
  }
  .content-box {
    flex-shrink: 1;
    flex: 1;
    overflow-x: hidden;
  }
}
</style>
