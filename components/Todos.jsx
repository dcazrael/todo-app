import { useContext, useEffect, useState } from 'react';
import TodoContext from '../context/TodoContext';
import Check from '../public/icon-check.svg';
import Cross from '../public/icon-cross.svg';

const Todos = () => {
  const { todos, changeTodos } = useContext(TodoContext);

  const [active, setActive] = useState(true);
  const [completed, setCompleted] = useState(true);

  const [container, setContainer] = useState();
  const [dragElements, setDragElements] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    setContainer(document.querySelector('[data-container]'));
    setDragElements(document.querySelectorAll('[data-dragItem]'));
  }, [todos]);

  useEffect(() => {
    dragElements.forEach((element) => {
      element.addEventListener('dragstart', () => {
        element.dataset.dragging = true;
      });

      element.addEventListener('dragend', () => {
        element.dataset.dragging = false;
      });
    });
  }, [dragElements]);

  useEffect(() => {
    if (container !== undefined) {
      const notDragging = '[data-dragItem]:not([data-dragging=true]';
      container.addEventListener('dragstart', () => {
        const draggedOverElements = container.querySelectorAll(notDragging);

        draggedOverElements.forEach((element) => {
          element.classList.add('opacity-30');
        });
      });

      container.addEventListener('dragend', () => {
        const draggedOverElements = container.querySelectorAll(notDragging);

        draggedOverElements.forEach((element) => {
          element.classList.remove('opacity-30');
        });

        // setting the order of items after we drop the item //
        /* 
          we get a new selection of the dragElements
          we can't update dragElements directly, because it causes an
          an infinite loop
        */
        setOrder(() =>
          [...document.querySelectorAll('[data-dragItem]')].map((element) =>
            parseInt(element.dataset.draggable)
          )
        );
      });
    }
  }, [container]);

  useEffect(() => {
    if (container !== undefined) {
      container.addEventListener('dragover', (e) => {
        e.preventDefault();

        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('[data-dragging=true]');
        if (afterElement === null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    }
  }, [container]);

  useEffect(() => {
    if (order.length > 0) {
      changeTodos(
        order.map((id) => {
          return todos.filter((todo) => {
            if (todo.id === id) return todo;
          })[0];
        })
      );
    }
  }, [order]);

  function getDragAfterElement(container, yCoord) {
    const draggedOverElements = [
      ...container.querySelectorAll(
        '[data-dragItem]:not([data-dragging=true])'
      ),
    ];

    return draggedOverElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = yCoord - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  function toggleTodoCompleted(id) {
    changeTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }

        return todo;
      })
    );
  }

  function deleteTodo(id) {
    changeTodos(todos.filter((todo) => todo.id !== id));
  }

  function clearCompleted() {
    changeTodos(todos.filter((todo) => todo.completed !== true));
  }

  return (
    <>
      <div data-container='todo-elements'>
        {todos &&
          todos.map((todo) => {
            if (!active && !todo.completed) return;
            if (!completed && todo.completed) return;
            return (
              <div
                data-dragItem={todo.id}
                data-dragging={false}
                className='flex items-center px-6 py-4 border-b border-gray-200 cursor-move dark:border-blue-600'
                key={`todo-${todo.id}`}
                draggable
              >
                <input
                  type='checkbox'
                  name={`todo-${todo.id}`}
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  className='hidden'
                  readOnly
                />
                {todo.completed ? (
                  <label
                    htmlFor='{`todo-${todo.id}`}'
                    onClick={() => toggleTodoCompleted(todo.id)}
                    className='flex items-center justify-center w-5 h-5 text-gray-100 border border-gray-300 rounded-full cursor-pointer stroke-current stroke-2 dark:border-gray-600 fill-transparent bg-gradient-to-br from-blue-400 to-purple-300'
                  >
                    <Check className='w-3 h-3' />
                  </label>
                ) : (
                  <label
                    htmlFor='{`todo-${todo.id}`}'
                    onClick={() => toggleTodoCompleted(todo.id)}
                    className='w-5 h-5 p-1 border border-gray-300 rounded-full cursor-pointer dark:border-gray-600'
                  />
                )}
                <p
                  className={`px-2 ml-2 flex-auto font-light ${
                    todo.completed
                      ? 'line-through text-gray-300 dark:text-gray-600'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {todo.text}
                </p>
                <div className='sm:hidden'>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className='text-xs text-gray-400 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-500'
                  >
                    <Cross
                      className={`w-3 h-3 stroke-current hover:text-blue-500 dark:hover:text-blue-500 stroke-1 ${
                        todo.completed
                          ? 'text-gray-200 dark:text-gray-500'
                          : 'text-gray-500 dark:text-gray-300'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className='flex items-center justify-between px-6 py-4 text-xs text-gray-400 dark:text-gray-600'>
        <div className='flex-auto'>
          <p>{todos.filter((todo) => !todo.completed).length} items left</p>
        </div>
        <div>
          <ul className='flex justify-between flex-auto font-bold'>
            <li
              className={`mx-2 cursor-pointer hover:text-blue-500 ${
                active && completed && 'text-blue-500'
              }`}
              onClick={() => {
                setActive(true);
                setCompleted(true);
              }}
            >
              All
            </li>
            <li
              className={`mx-2 cursor-pointer hover:text-blue-500 ${
                active && !completed && 'text-blue-500'
              }`}
              onClick={() => {
                setActive(true);
                setCompleted(false);
              }}
            >
              Active
            </li>
            <li
              className={`mx-2 cursor-pointer hover:text-blue-500 ${
                !active && completed && 'text-blue-500'
              }`}
              onClick={() => {
                setCompleted(true);
                setActive(false);
              }}
            >
              Completed
            </li>
          </ul>
        </div>
        <div>
          <div className='ml-10'>
            <button onClick={clearCompleted} className='hover:text-blue-500'>
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
