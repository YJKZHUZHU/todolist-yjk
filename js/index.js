$(function(){
  load()
  function postaction() {
    if ($('#title').val() == '') {
      alert('不能输入空')
    }else {
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
  // 监听回车事件
  $(document).keydown(function (event) {
    if (event.keyCode == 13) {
      postaction()
    }
  })
  $('.deleteToDo').on('click', function () {
    remove($(this).attr('index'),$(this))
    // $(this).parent().remove()
    // window.location.reload()
  })
  // 数据存localstroge
  function saveData(data) {
    localStorage.setItem('todo', JSON.stringify(data))
  }
  // 获取数据
  function loadData() {
    var todoList = localStorage.getItem('todo')
    if (todoList != null) {
      return JSON.parse(todoList)
    }else {
      return []
    }
  }
  // 填充模板数据
  function load() {
    var htmlData = loadData()
    $('#todo-count').text(htmlData.length)
    $('#todoList').children().remove()
    var html = ''
    for (var i in htmlData) {
      html += `<li>
          <input type="checkbox">
          <p id="todoContent">${htmlData[i].title}</p>
          <a href="javascript:void(0);" index=${i} class='deleteToDo'>删除</a>
        </li>`
    }
    $('#todoList').append(html)
  }
  // 删除待办
  function remove(index,that){  
    var removeData = loadData()
    for (var i in removeData) {
      if (i == index) {
        removeData.splice(i,1)
        that.parent().remove()
        $('#todo-count').text(removeData.length)
        
      }
      saveData(removeData)
    }
   
  }
})
