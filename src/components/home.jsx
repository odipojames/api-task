import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from "react-redux";
import "./home.css";
import {FastForwardOutlined,FastBackwardOutlined,LoadingOutlined } from "@ant-design/icons";
import {api} from "../services/Api.js";
import { setRecords } from "../store/actions/recordActions";
import { Space, Spin,message } from 'antd';






export const Home = ()=>{

const dispatch = useDispatch();


  //api call
  const getRecords = ()=>{
    
    api.records.display().then((res)=>{
      if(res.status===200){
        //update store the global store with data from api
        dispatch(setRecords(res.data))
        //dispatch(setRecords([]))
        console.log(res.data,'data');
      }
      if(res.status===401){
        message.warning('unauthorized');
      }
    }).catch((err)=>{
      if(err){
        console.log(err,'error');
      }
    })
  }

//getting records from global store now
  const records= useSelector(state => state.records.records);

  console.log(records,'records');
  

  useEffect(()=>{

    getRecords();
  });


//pagination 
const[startIndex,setStartIndex] = useState(0);
const[endIndex,setEndtIndex] = useState(10);
const[pageNumber,setPageNumber] = useState(1);

const next = ()=>{
  if(endIndex < records.length){
     setStartIndex(startIndex+10);
     setEndtIndex(endIndex+10);
     setPageNumber(pageNumber+1);
  }
};

const prev = ()=>{
  if(startIndex > 0){
     setStartIndex(startIndex-10);
     setEndtIndex(endIndex-10);
     setPageNumber(pageNumber-1);
  }
};

console.log(records.length,"l");

//edit records
const[editMode,setEditMode] = useState(false);

const [editedRecords, setValues] = useState({
  name: "",
  email: "",
  occupation:"",
  bio:""

});

const switchMode=(e)=>{
     //end point not there
     //return message.warning('END POINT NOT PROVIDED NOW!!!');

    setEditMode(true);
    message.warning("click on individual  cell to edit  and click save ");
    //get _di of record clicked to my object
    editedRecords.id=e.currentTarget.getAttribute('name');
    
};

//get objetect to be updated
// eslint-disable-next-line
const recordToUpDate = records.find(x => x.id == editedRecords.id);
console.log(recordToUpDate,'rt')

const editHandler = (e) => {
  e.preventDefault();
  setValues({ ...editedRecords, [e.target.name]: e.target.value });
  

};

//api call
// eslint-disable-next-line
const editRecord = ()=>{
  //prepopulate fields with initial data
  if(editedRecords.name===""){
    editedRecords.name=recordToUpDate.name;
  }
  if(editedRecords.email===""){
    editedRecords.email=recordToUpDate.email;
  }
  if(editedRecords.occupation===""){
    editedRecords.occupation=recordToUpDate.occupation;
  }
  if(editedRecords.bio===""){
    editedRecords.bio=recordToUpDate.bio;
  }
  setLoading(true);
   api.records.edit(editedRecords).then((res)=>{
    if(res && res.status===200){
      setEditMode(false);
      setLoading(false);
      return message.success('record updated successfully');
      
    }
    else{
      return message.warning('something went wrong try again later');
    }
   }).catch((error)=>{
    if(error){
      console.log(error,'error here!');
    }
   })

};



//loaders
const[loading,setLoading] = useState(false);

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize:24,
    }}
    spin
  />);



  return ( 
    <div>
      {records.length >0 && !editMode?(
  <div className="home-container">
    <table>
    <thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Occupation</th>
    <th id='bio-head'>Bio</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    {records.slice(startIndex,endIndex).map((record)=>(
<tr key={record.id}>
<td>{record.name}</td>
<td>{record.email}</td>
<td>{record.occupation}</td>
<td> {record.bio} </td>
<td id='edit' onClick={switchMode} name={record.id}>edit</td>
</tr>))}
</tbody>
</table>
<div className='pagination'><span id='prev-icon'><FastBackwardOutlined onClick={prev}/></span>{pageNumber}<span>/</span> {Math.ceil(records.length/10)}<span id='next-icon'><FastForwardOutlined onClick={next} /></span></div>
    </div>):records.length>0 && editMode?(<div className="home-container">
    <table>
    <thead>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Occupation</th>
    <th>Bio</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
    
<tr id="edit-row">
<td>< input type='text' name='name' placeholder={recordToUpDate.name} onChange={editHandler} /></td>
<td>< input type='text' name='email' placeholder={recordToUpDate.email} onChange={editHandler} /></td>
<td>< input type='text' name='occupation'  placeholder={recordToUpDate.occupation} onChange={editHandler} /></td>
<td>< input type='text' name='bio' placeholder={recordToUpDate.bio} onChange={editHandler} /></td>
<td id='edit' onClick={()=>{message.warning("END POINT NOT YET PROVIDED!!")}}>{loading?(<Spin indicator={antIcon} tip='..saving' />):("save")}</td>
</tr>
</tbody>
</table>
    </div>):( <div className='spin'><Space size="middle">
    <Spin size="small" />
    <Spin />
    <Spin size="large" tip='.....loading' />
  </Space></div>)}
    </div>)
  


}
