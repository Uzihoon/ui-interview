const files = {
  name: 'root',
  isFolder: true,
  children: [
    {
      name: 'src',
      isFolder: true,
      children: [
        {
          name: 'App.js',
          isFolder: false,
        },
        {
          name: 'Folder.js',
          isFolder: false,
        },
        {
          name: 'data.js',
          isFolder: false,
        },
        {
          name: 'Index.js',
          isFolder: false,
        },
        {
          name: 'styles.css',
          isFolder: false,
        },
      ],
    },
    {
      name: 'public',
      isFolder: true,
      children: [
        {
          name: 'index.html',
          isFolder: false,
        },
        {
          name: 'styles.css',
          isFolder: false,
        },
      ],
    },
    {
      name: 'package.json',
      isFolder: false,
    },
  ],
};

const createElement = (el) => document.createElement(el);

function generateFile(files, parentElement) {
  let expanded = false;

  const box = createElement('div');
  box.classList.add('box');

  const fileBox = createElement('div');
  fileBox.classList.add('file-box');

  let folderIcon = createElement('div');

  if (files.isFolder) {
    folderIcon.classList.add('folder-icon');
    folderIcon.addEventListener('click', function (event) {
      if (event.target.classList.contains('open')) {
        const boxList =
          this.parentElement.parentElement.querySelectorAll('.box');
        for (const box of boxList) {
          box.remove();
        }
      } else {
        if (files.children) {
          files.children.map((file) => generateFile(file, box));
        }
      }
      event.target.classList.toggle('open');
    });
  } else {
    folderIcon.classList.add('file-icon');
  }

  const fileName = createElement('div');
  fileName.textContent = files.name;
  fileName.classList.add('file-title');

  fileBox.append(folderIcon, fileName);

  box.appendChild(fileBox);
  parentElement.appendChild(box);
}

const app = document.getElementById('app');

generateFile(files, app);
