import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [userList, setUserList] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const [updateName, setUpdateName] = useState('')

  const [uploadFile, setUploadFile] = useState(null)

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  today = `${dd}-${mm}-${yyyy} `;

  const userCollectionRef = collection(db, "users");

  const getUserList = async () => {
    try {
      const data = await getDocs(userCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserList();
    //eslint-disable-next-line
  }, []);

  const onSubmitUser = async () => {
    try {
      await addDoc(userCollectionRef, {
        name: name,
        age: age,
        joinDate: today,
        userId: auth?.currentUser?.uid,
      });
      getUserList();
    } catch (err) {
      console.error(err);
    }
  };
  const onDeleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    try{
      await deleteDoc(userDoc);
    }catch(err){
      console.error(err)
    }
    getUserList();
  };

  const onUpdateName = async (id) => {
    const userDoc = doc(db, "users", id);
    try{
      await updateDoc(userDoc, {name: updateName});
    }catch(err){
      console.error(err)
    }
    getUserList();
  };

  const onUploadFile = async () => {
    if(!uploadFile) return;
    const filedoc = ref(storage, `uploadFiles/${uploadFile.name}`)
    try{
      await uploadBytes(filedoc, uploadFile)
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div className="App">
      <Auth />
      <div>
        <input type="file" onChange={e => setUploadFile(e.target.files[0])}/>
        <button onClick={onUploadFile}>Upload file</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <button onClick={onSubmitUser}>Save user</button>
      </div>
      <div>
        {userList.map((user) => {
          return (
            <div key={user.id}>
              <h1>{user.name}</h1>
              <p>Age: {user.age}</p>
              <p>{user.joinDate}</p>
              <button onClick={() => onDeleteUser(user.id)}>Delete User</button>

              <input type="text" placeholder="New name..." onChange={e => setUpdateName(e.target.value)} />
              <button onClick={() => onUpdateName(user.id)}>Update name</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
