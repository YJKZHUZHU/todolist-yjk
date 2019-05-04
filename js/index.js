// 清空
function clear() {
  localStorage.clear();
  load();
}
// 输入
function postaction() {
  if ($('#title').val() == '') {
    alert('不能输入空')
  } else {
    //拿到数据
    var data = loadData()
    var todo = { "title": title.value, "done": false };
    // 将新数据存储到localstorage
    data.push(todo)
    // 存储数据
    saveData(data)
    // 重置表单
    $('#form')[0].reset()
    load()
  }
}
// 获取数据
function loadData() {
  var todoList = localStorage.getItem('todo')
  if (todoList != null) {
    return JSON.parse(todoList)
  } else {
    return []
  }
}
// 数据存localstroge
function saveData(data) {
  localStorage.setItem('todo', JSON.stringify(data))
}
// 删除待办
function remove(index) {
  var data = loadData();
  var todo = data.splice(index, 1)[0];
  saveData(data);
  load();
}
// 更新状态
function update(i, field, value) {
  console.log(i, field, value)
  var data = loadData();
  // 拿到改变状态的对象
  var todo = data.splice(i, 1)[0];
  // 改变状态
  todo[field] = value;
  // 添加新元素
  data.splice(i, 0, todo);
  // 重新存储
  saveData(data);
  // 加载模板
  load();
}
// 编辑
function edit(i) {
  load();
  var p = document.getElementById("p-" + i);
  title = p.innerHTML;
  p.innerHTML = "<input id='input-" + i + "' value='" + title + "' style='width:80%'/>";
  var input = document.getElementById("input-" + i);
  // input选中范围
  input.setSelectionRange(0, input.value.length);
  input.focus();
  input.onblur = function () {
    if (input.value.length == 0) {
      p.innerHTML = title;
      alert("内容不能为空");
    }
    else {
      update(i, "title", input.value);
    }
  };
}
// 填充模板数据
function load() {
  var htmlData = loadData()
  $('#todoList').children().remove()
  $('#doneList').children().remove()
  var htmlTodo = ''
  var htmlDone = ''
  var todoCount = ''
  var doneCount = ''
  if (htmlData.length > 0) {
    for (var i in htmlData) {
      if (htmlData[i].done) {
        // 完成
        htmlDone += `<li>
          <input type="checkbox" checked='checked' onchange='update(${i}, "done", ${false})'>
          <p id="p-${i}" onclick='edit(${i})'>${htmlData[i].title}</p>
          <a href='javascript:remove(${i})'>删除</a>
        </li>`
        doneCount++
      } else {
        // 待办
        htmlTodo += `<li>
          <input type="checkbox" onchange='update(${i}, "done", ${true})'>
          <p id="p-${i}" onclick='edit(${i})'>${htmlData[i].title}</p>
          <a href='javascript:remove(${i})'>删除</a>
        </li>`
        todoCount++
      }
    }
    if (htmlDone == '') {
      $('#doneCount').text('0')
    } else {
      $('#doneCount').text(doneCount)
    }
    if (htmlTodo == '') {
      $('#todo-count').text('0')
    } else {
      $('#todo-count').text(todoCount)
    }
    $('#todoList').append(htmlTodo)
    $('#doneList').append(htmlDone)
  } else {
    $('#todo-count').text('0')
    $('#doneCount').text('0')
    $('#todoList').append('')
    $('#doneList').append('')
  }
}
// 渲染列表
$(function () {
  load()
})
