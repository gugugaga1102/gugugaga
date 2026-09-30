const STORAGE_KEY = 'todo-list-items';

// 取得頁面上的互動元素
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const remainingCount = document.getElementById('remaining-count');
const filterButtons = document.querySelectorAll('.filter-button');

// 每筆待辦包含 id、文字與完成狀態
let todos = loadTodos();
let currentFilter = 'all';

// 從 localStorage 讀取資料,格式不正確時使用空清單
function loadTodos() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('讀取待辦清單失敗,將使用空清單。', error);
    return [];
  }
}

// 將目前的待辦清單保存到 localStorage
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 重新繪製待辦清單與未完成數量
function render() {
  list.replaceChildren();

  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  visibleTodos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = todo.completed ? 'todo-item completed' : 'todo-item';
    item.dataset.id = todo.id;

    // 建立完成勾選框
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `標記「${todo.text}」為完成`);

    // 使用 textContent 顯示文字,避免把輸入內容當成 HTML 執行
    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    // 建立刪除按鈕
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn-delete';
    deleteButton.textContent = '刪除';
    deleteButton.setAttribute('aria-label', `刪除「${todo.text}」`);

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  emptyState.hidden = visibleTodos.length > 0;
  emptyState.textContent = todos.length === 0
    ? '還沒有任何待辦事項,新增一個吧!'
    : currentFilter === 'active'
      ? '目前沒有未完成的事項。'
      : currentFilter === 'completed'
        ? '目前沒有已完成的事項,項目可能只是被目前的篩選條件隱藏。'
        : '還沒有任何待辦事項,新增一個吧!';
  const remaining = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成:${remaining} 項`;
}

// 產生一組不重複的待辦 id
function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// 新增待辦事項
function addTodo(text) {
  todos.push({
    id: createId(),
    text,
    completed: false,
  });
  saveTodos();
  render();
}

// 切換待辦事項的完成狀態
function toggleTodo(id) {
  todos = todos.map((todo) => (
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
  saveTodos();
  render();
}

// 刪除待辦事項
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  render();
}

// 表單送出時新增待辦,空白內容不會被加入
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) return;

  addTodo(text);
  input.value = '';
  input.focus();
});

// 使用事件委派處理勾選與刪除操作
list.addEventListener('click', (event) => {
  const item = event.target.closest('.todo-item');
  if (!item) return;

  if (event.target.matches('input[type="checkbox"]')) {
    toggleTodo(item.dataset.id);
  }

  if (event.target.matches('.btn-delete')) {
    deleteTodo(item.dataset.id);
  }
});

// 切換篩選條件
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });
    render();
  });
});

// 頁面載入時顯示已保存的待辦事項
render();
