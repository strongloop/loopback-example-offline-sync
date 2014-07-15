<section id="local-conflicts" class="conflicts" ng-if="localConflicts.length">
  <h1>Local Conflicts</h1>
  <div ng-repeat="conflict in localConflicts">
    <table>
      <tr>
        <th>Local Data</th>
        <th>Remote Data</th>
      </tr>
      <tr>
        <td>
          <div ng-if="conflict.sourceChange.type() === 'delete'">
            <strong>Deleted</strong>
          </div>
          <table ng-if="conflict.sourceChange.type() !== 'delete'">
            <tr>
              <th>id</th>
              <th>change</th>
              <th>title</th>
            </tr>
            <tr>
              <td>{{conflict.sourceChange.modelId}}</td>
              <td>{{conflict.sourceChange.type()}}</td>
              <td>
                {{conflict.source.title}}
              </td>
            </tr>
          </table>
          <button ng-click="resolveUsingSource(conflict)">Use Local Version</button>
        </td>
        <td>
          <div ng-if="conflict.targetChange.type() === 'delete'">
            <strong>Deleted</strong>
          </div>
          <table ng-if="conflict.targetChange.type() !== 'delete'">
            <tr>
              <th>id</th>
              <th>change</th>
              <th>title</th>
            </tr>
            <tr>
              <td>{{conflict.targetChange.modelId}}</td>
              <td>{{conflict.targetChange.type()}}</td>
              <td>
                {{conflict.target.title}}
              </td>
            </tr>
          </table>
          <button ng-click="resolveUsingTarget(conflict)">Use Server Version</button>
        </td>
      </tr>
    </table>
    <div class="manual-merge">
      <h4>Merge Manually</h4>
      <input class="toggle" type="checkbox" ng-model="conflict.manual.completed">
      <input class="edit" ng-trim="false" ng-model="conflict.manual.title">
      <button ng-click="resolveManually(conflict)">Use This Version</button>
    </div>
  </div>
</section>

<section id="todoapp">
  <header id="header">
    <h1>todos</h1>
    <form id="todo-form" ng-submit="addTodo()">
      <input id="new-todo" placeholder="What needs to be done?" ng-model="newTodo" autofocus>
    </form>
  </header>
  <section id="main" ng-show="todos.length" ng-cloak>
    <input id="toggle-all" type="checkbox" ng-model="allChecked" ng-click="markAll(allChecked)">
    <label for="toggle-all">Mark all as complete</label>
    <ul id="todo-list">
      <li ng-repeat="todo in todos | filter:statusFilter track by $index" ng-class="{completed: todo.completed, editing: todo == editedTodo}">
        <div class="view">
          <input class="toggle" type="checkbox" ng-model="todo.completed" ng-change="todoCompleted(todo)">
          <label ng-dblclick="editTodo(todo)">{{todo.title}}</label>
          <button class="destroy" ng-click="removeTodo(todo)"></button>
        </div>
        <form ng-submit="doneEditing(todo)">
          <input class="edit" ng-trim="false" ng-model="todo.title" ng-blur="doneEditing(todo)" todo-escape="revertEditing(todo)" todo-focus="todo == editedTodo">
        </form>
      </li>
    </ul>
  </section>
  <footer id="footer" ng-show="todos.length" ng-cloak>
    <span id="todo-count"><strong>{{remainingCount}}</strong>
      <ng-pluralize count="remainingCount" when="{ one: 'item left', other: 'items left' }"></ng-pluralize>
    </span>
    <ul id="filters">
      <li>
        <a ng-class="{selected: loc.path() == '/my/todos'} " href="/my/todos">All</a>
      </li>
      <li>
        <a ng-class="{selected: loc.path() == '/my/todos/active'}" href="/my/todos/active">Active</a>
      </li>
      <li>
        <a ng-class="{selected: loc.path() == '/my/todos/completed'}" href="/my/todos/completed">Completed</a>
      </li>
    </ul>
    <button id="clear-completed" ng-click="clearCompletedTodos()" ng-show="stats.remaining < todos.length">Clear completed ({{stats.completed}})</button>
  </footer>
</section>
<footer id="info">
  <p>Double-click to edit a todo</p>
</footer>
<footer class="debug">
  <button ng-click="sync()" ng-class="{deltas: needSync}">Sync</button>
  <button ng-click="connect()">Connect</button>
  <button ng-click="disconnect()">Disconnect</button>
  <a href="/debug" target="_blank">Debug</a>
  <strong> connected: {{ connected() }} </span>
</footer>

