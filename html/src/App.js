import { useState } from "react";

export default function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState("");
  const [completedata, setCompleteData] = useState([]);

  const updateJSON = (update) => {
    localStorage.setItem("data", JSON.stringify(update));
  };
  
  const items = localStorage.getItem("data");
  const localData = JSON.parse(items);

  const addName = () => {
    const newObj = [
      ...data,
      { id: data.length + 1, text: value, completed: false }
    ];

    if (localData === null) {
      setData(newObj);
      updateJSON(newObj);
    } else {
      let getItems = localStorage.getItem("data");
      getItems = JSON.parse(getItems);
      if (getItems) {
        getItems = [
          ...getItems,
          { id: getItems.length + 1, text: value, completed: false }
        ];
        updateJSON(getItems);
        setData(getItems);
      }
    }
    setValue("");
  };

  const isComplete = (id) => (e) => {
    e.persist();
	
    let isSelect = localData.map((item) => {
      if (item.id === id) {
		  console.log(id)
       return { ...item, completed: !item.completed };
      } else {
        return item;
      }
    });
	let getItems = localStorage.getItem("data");
      getItems = JSON.parse(getItems);
	if(getItems){
		 getItems = [
          ...getItems,
          { id: getItems.length + 1, text: value, completed:!true }
        ];
		 	setData(isSelect);
			updateJSON(isSelect);
	}

  };

	
  const onlyComplete = ()  => {
   // e.persist();
    const newItem = [...data];
		let list = newItem.filter((item) => item.completed !== false);
		let deletelist = localData.filter((item) => item.completed !== false);
		 setCompleteData(deletelist)
		// setData(list);
		//	updateJSON(deletelist);
		
		
   
	 
     
  };
 
  
  const allComplete = () => {
   //  const newItem = [...data];
   
	
	if(completedata != ''){
		//setAlls('fill');
		 setCompleteData('')
	
	}
   
    
  };

  const removeItem = (id) => (e) => {
    e.persist();
    const newItem = [...data];
    let list = newItem.filter((item) => item.id !== id);
    let deletelist = localData.filter((item) => item.id !== id);
    setData(list);
	console.log(data)
    updateJSON(deletelist);
    //console.log(data, list);
  };
	

  const dataMap = !localData ? (
    <div> Loading... </div>
  ) : (
    localData.map((item, index) => {
      console.log(item.completed);
      return (
        <div
          className={`list-group-item rel flex ${
            item.completed === true ? "active" : ""
          }`}
          key={index}
        >  

			<div className="col_1">
			<input class="form-check-input" type="checkbox" value=""   onClick={(e)=>isComplete(item.id)(e)} /></div>
			<div className="col_2" >
          {item.text}</div>
		  <div className="trash col_3" onClick={(e) => removeItem(item.id)(e)} style={{position:'absolute', top:'12px', right:'12px'}}> x
         
		  </div>
        </div>
      );
    })
  );
  
  	let allDatas = completedata == '' ?  dataMap : '';
     
  const comp  =  completedata ? completedata.map((item, index) => {
      console.log(item.completed);
      return (
        <div
          className={`list-group-item rel flex ${
            item.completed === true ? "active" : ""
          }`}
          key={index}
        >  

			<div className="col_1">
			<input class="form-check-input" type="checkbox" value=""   onClick={(e)=>isComplete(item.id)(e)} /></div>
			<div className="col_2" >
          {item.text}</div>
		  <div className="trash col_3" onClick={(e) => removeItem(item.id)(e)} style={{position:'absolute', top:'12px', right:'12px'}}> x
         
		  </div>
        </div>
      );
    }):''
  

  
  

	
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 left">
          <ul>
            <li onClick={allComplete}>All Task</li>
            <li onClick={onlyComplete}>completed</li>
            <li>Pending</li>
          </ul>
        </div>
        <div className="middle">
          <h3>List</h3>
          <div className="list-group">
		  { allDatas }
			  <br/><br/><br/>
			  
			  {comp}</div>
         
        
        </div>
        <div className="rhs">
          <div className="form-group">
            <div>Create New task</div>
            <textarea
              className="form-control"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="enter note here"
            ></textarea>

            <button
              onClick={addName}
              type="button"
              className="mt-2 btn btn-primary"
            >
              Add New Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
