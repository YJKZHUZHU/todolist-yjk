$(function(){
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

    }
  }
  $(document).keydown(function (event) {
    if (event.keyCode == 13) {
      postaction()
    }
  });
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
})
