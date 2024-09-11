import { useState } from 'react'
import './App.css'
import Folder from './components/Folder';

const folderData = {
  id: 1,
  name: 'Root',
  isFolder: true,
  items: [
    {
      id: 2,
      name: 'package.json',
      isFolder: false,
    },
    {
      id: 3,
      name: 'public',
      isFolder: true,
      items: [
        {
          id: 6,
          name: "index.js",
          isFolder: false,
        },
        {
          id: 7,
          name: "assets",
          isFolder: true,
          items: []
        }
      ]
    },
    {
      id: 4,
      name: 'package.json',
      isFolder: false,
    },
    {
      id: 5,
      name: 'package.json',
      isFolder: false,
    },
  ]
};

function App() {
  const [data, setData] = useState(folderData);

  const insertData = (folderTree, folderId, isFolder, name)=> {
     if(folderTree.id === folderId && folderTree.isFolder){
      folderTree.items.unshift({
        id: new Date().getTime(),
        name,
        isFolder,
        items: []
      });
      return folderTree;
     }
  
     let latestNodes = [];
     latestNodes = folderTree.items?.map((val)=> {
      return insertData(val, folderId, isFolder, name);
     });

     return {...folderTree, items: latestNodes}
  }

  const handleAddFolderOrFile = (folderId, isFolder, name)=> {
    const newData = insertData(data, folderId, isFolder, name);
    setData(newData);
  }

  return (
    <div>
      <Folder data={data} handleAddFolderOrFile={handleAddFolderOrFile}/>
    </div>
  )
}

export default App
