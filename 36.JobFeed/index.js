const HACKERNEWS_POSTID_API = `https://hacker-news.firebaseio.com/v0/jobstories.json`;
const META_DATA_API = (postId) =>
  `https://hacker-news.firebaseio.com/v0/item/${postId}.json`;

class Post {
  constructor(data, element) {
    this.element = element;
    this.data = data;

    this.render();
  }

  create(type) {
    return document.createElement(type);
  }

  render() {
    const link = this.create('a');
    link.target = '_blank';
    link.href = this.data?.url;

    // ID
    const idBox = this.create('p');

    const idText = this.create('span');
    idText.textContent = 'ID: ';

    const id = this.create('span');
    id.textContent = this.data?.id;

    idBox.append(idText, id);

    // Title
    const title = this.create('h1');
    title.textContent = this.data?.title;

    // Time
    const time = this.create('p');
    time.textContent = this.data?.time;

    // Author
    const authorBox = this.create('p');
    const authorTitle = this.create('span');

    authorTitle.textContent = 'Posted by: ';

    const author = this.create('span');
    author.textContent = this.data?.by;

    authorBox.append(authorTitle, author);

    const container = this.create('div');
    container.classList.add('postContainer');

    container.append(idBox, title, time, authorBox);

    link.append(container);

    this.element.append(link);
  }
}

class Feed {
  constructor(id) {
    this.app = document.querySelector(`#${id}`);
    this.loadButton = document.querySelector('#more');
    this.state = {
      endReached: false,
      pageNumber: 0,
      perPage: 5,
      posts: [],
    };

    this.initial();
  }

  getAllState() {
    return Object.freeze(this.state);
  }

  getState(key) {
    return this.state[key];
  }

  updateState(key, value) {
    this.state = { ...this.state, [key]: value };
  }

  initial() {
    window.addEventListener('load', this.fetchAllJob.bind(this));
    this.loadButton.addEventListener('click', this.handleClick.bind(this));
  }

  async fetchAllJob() {
    const { endReached, pageNumber, perPage, posts } = this.getAllState();
    if (endReached) return;

    try {
      const response = await fetch(HACKERNEWS_POSTID_API);
      const data = await response.json();
      const postIds = data.splice(pageNumber * perPage, perPage);
      this.updateState('endReached', posts.length >= data.length);

      this.fetchAllMetadata(postIds);
      if (posts.length >= data.length) {
        this.loadButton.remove();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchAllMetadata(postIds) {
    const updatePost = async (id) => {
      const response = await fetch(META_DATA_API(id));
      const data = await response.json();
      const post = new Post(data, this.app);

      return post;
    };

    Promise.all(postIds.map((id) => updatePost(id))).then((result) => {
      this.updateState('posts', [...this.getState('posts'), ...result]);
    });
  }

  handleClick(event) {
    event.preventDefault();

    this.updateState('pageNumber', this.getState('pageNumber') + 1);
    this.fetchAllJob();
  }
}

const jobFeed = new Feed('app');
