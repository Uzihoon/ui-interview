class TicTacToe {
  constructor(id, n = 3, playerList = ['O', 'X']) {
    this.n = n;
    this.playerList = playerList;
    this.parentId = id;

    this.classList = {
      status: 'game-status',
      container: 'game-container',
    };
  }

  getNextTurnMsg(user) {
    return `It's ${user}'s turn`;
  }

  getWinnerMsg(user) {
    return `${user} won!`;
  }

  getDrawMsg() {
    return `Game ended in a draw`;
  }

  initial() {
    this.currentPlayer = 0;
    this.clicked = 0;
    this.gameStatus = true;

    this.setBoard(this.n);
    this.renderBoard();
  }

  setBoard(n) {
    this.board = [...Array(n)].map(() => [...Array(n)]);
  }

  createElement(type, option = {}) {
    const { className, property = {}, event, attr = {} } = option;

    const element = document.createElement(type);
    element.classList.add(className);

    // Set attributes
    for (const [key, value] of Object.entries(attr)) {
      element.setAttribute(key, value);
    }

    for (const [key, value] of Object.entries(property)) {
      element[key] = value;
    }

    if (event) {
      element.addEventListener(event.name, event.callback);
    }

    return element;
  }

  render() {
    if (!this.parentId) throw new Error(`Please set parent id`);
    const app = document.getElementById(this.parentId);

    const head = this.createElement('h1', {
      className: 'game-header',
      property: { textContent: 'Tic Tac Toe Game' },
    });

    const status = this.createElement('h2', {
      className: this.classList.status,
    });

    const resetButton = this.createElement('button', {
      className: 'game-reset',
      property: { textContent: 'Reset Game' },
      event: {
        name: 'click',
        callback: this.initial.bind(this),
      },
    });

    const gameContainer = this.createElement('div', {
      className: this.classList.container,
    });

    app.append(head, status, resetButton, gameContainer);
    this.initial();
  }

  renderBoard() {
    const container = document.querySelector(`.${this.classList.container}`);
    container.style.width = this.n * 100 + 'px';
    container.style.height = this.n * 100 + 'px';
    container.innerHTML = '';

    this.board.forEach((line, row) => {
      const box = this.createElement('div', {
        className: 'game-box',
      });

      box.style.width = this.n * 100 + 'px';
      box.style.height = 100 + 'px';

      line.forEach((_, col) => {
        const cell = this.createElement('div', {
          className: 'cell',
          attr: {
            'data-row': row,
            'data-col': col,
          },
          event: {
            name: 'click',
            callback: this.onClick.bind(this),
          },
        });

        cell.style.width = 100 + 'px';
        cell.style.height = 100 + 'px';

        box.appendChild(cell);
      });

      container.appendChild(box);
    });

    this.showMessage(this.getNextTurnMsg);
  }

  showMessage(callback) {
    const status = document.querySelector(`.${this.classList.status}`);
    status.textContent = callback(this.playerList[this.currentPlayer]);
  }

  onClick(event) {
    event.stopPropagation();
    const row = +event.target.getAttribute('data-row');
    const col = +event.target.getAttribute('data-col');
    const player = this.move(row, col, this.currentPlayer);

    if (player !== undefined) {
      event.target.textContent = this.playerList[player];
    }
  }

  move(row, col, player) {
    if (typeof this.board[row][col] === 'number' || !this.gameStatus) {
      return;
    }

    this.board[row][col] = player;

    if (
      this.checkRow(row, player) ||
      this.checkCol(col, player) ||
      (row === col && this.checkDiagonal(player)) ||
      (col === this.n - row - 1 && this.checkAntiDiagnoal(player))
    ) {
      this.gameStatus = false;
      this.showMessage(this.getWinnerMsg);
    } else if (this.clicked + 1 === this.n * this.n) {
      this.showMessage(this.getDrawMsg);
    } else {
      const next = this.currentPlayer + 1;
      this.currentPlayer = next >= this.playerList.length ? 0 : next;
      this.showMessage(this.getNextTurnMsg);
      this.clicked += 1;
    }

    return player;
  }

  checkRow(row, player) {
    for (let col = 0; col < this.n; col++) {
      if (this.board[row][col] !== player) {
        return false;
      }
    }

    return true;
  }

  checkCol(col, player) {
    for (let row = 0; row < this.n; row++) {
      if (this.board[row][col] !== player) {
        return false;
      }
    }

    return true;
  }

  checkDiagonal(player) {
    for (let row = 0; row < this.n; row++) {
      if (this.board[row][row] !== player) {
        return false;
      }
    }

    return true;
  }

  checkAntiDiagnoal(player) {
    for (let row = 0; row < this.n; row++) {
      if (this.board[row][this.n - row - 1] !== player) {
        return false;
      }
    }

    return true;
  }
}

const myTicTacToe = new TicTacToe('app');

myTicTacToe.render();
