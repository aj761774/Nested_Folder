import { useState } from "react";
import "./index.css";

const Folder = ({ data, handleAddFolderOrFile }) => {
  const [showInput, setShowInput] = useState({visible: false, isFolder: false});

  const handleShowInput = (e, isFolder)=> {
     e.stopPropagation();
     setShowInput({visible: true, isFolder});
  }

  const handleHideInput = ()=> {
    setShowInput({...showInput, visible : false});
 }

 const handleKeyDown = (e)=> {
   // 13 is for Enter key
   if(e.keyCode === 13){
      handleHideInput();
      handleAddFolderOrFile(data.id, showInput.isFolder, e.target.value);
   }
 }



  if (data.isFolder) {
    return (
      <div className="folder">
        <div className="folder-name">
          🗂 {data.name}
          <button onClick={(e) => handleShowInput(e, true)}>+ Folder</button>
          <button onClick={(e) => handleShowInput(e, false)}>+ File</button>
        </div>
        {
          showInput.visible
          &&
          <div className="input-container"><input type="text" onBlur={handleHideInput} onKeyDown={handleKeyDown} autoFocus/></div>
        }
        {data.items && data.items.map(val => <Folder key={val.id} data={val} handleAddFolderOrFile={handleAddFolderOrFile} />)}
      </div>
    );
  } else {
    return (
      <div className="file">
        📁 {data.name}
      </div>
    );
  }
};

export default Folder;
