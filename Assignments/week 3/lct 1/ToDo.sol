// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract TodoList {
    enum Status {
        Pending,
        InProgress,
        Completed
    }

    struct Todo {
        uint id;
        string content;
        Status status;
    }

    event TodoAdded(uint id, string content);

    // I introduced this variable to track Todo-tasks IDs.
    // It starts from 1.
    uint private idCounter = 1;

    mapping(uint => Todo) public tasks;
    uint[] public todoIds;

    function addTodo(string memory _content) public {
        tasks[idCounter] = Todo({
            id: idCounter,
            content: _content,
            status: Status.Pending
        });

        todoIds.push(idCounter);

        emit TodoAdded(idCounter, _content);
        // I would increment the counter each time i add a Todo task.
        idCounter += 1;
    }

    function updateStatus(uint _id, Status _status) public {
        tasks[_id].status = _status;
    }

    function getTodo(uint _id) public view returns (Todo memory) {
        return tasks[_id];
    }
}
