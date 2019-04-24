// $(document).ready(function() {
function clear() {
  localStorage.clear();
  load();
}
  load()
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
function update(i, field, value) {
  var data = loadData();
  var todo = data.splice(i, 1)[0];
  todo[field] = value;
  data.splice(i, 0, todo);
  saveData(data);
  load();
}
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
  // 监听回车事件
  // $(document).keydown(function (event) {
  //   if (event.keyCode == 13) {
  //     postaction()
  //   }
  // })
  // $('.deleteToDo').on('click', function () {
  //   remove($(this).attr('index'), $(this))
  //   // $(this).parent().remove()
  //   // window.location.reload()
  // })
  
  
  // 填充模板数据
  function load() {
    var htmlData = loadData()
    $('#todo-count').text(htmlData.length)
    $('#todoList').children().remove()
    var html = ''
    for (var i in htmlData) {
      html += `<li>
          <input type="checkbox">
          <p id="p-${i}" onclick='edit(${i})'>${htmlData[i].title}</p>
          <a href='javascript:remove(${i})'>删除</a>
        </li>`
    }
    $('#todoList').append(html)
  }
  
// })
