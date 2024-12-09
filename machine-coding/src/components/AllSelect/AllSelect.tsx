import { useEffect, useState } from "react";

interface User {
  name: string;
  isChecked?: boolean;
}
const Users: User[] = [
  { name: "Subhadeep" },
  { name: "Raja" },
  {
    name: "Ramandeep",
  },
  {
    name: "Suman",
  },
];
const AllSelect: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    setUserData([...Users]);
  }, []);

  const handleCheckboxChnage=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,checked}=e.target
    if(name==="allSelect"){
        const newUserData=userData.map((userObject)=> ({...userObject,isChecked:checked}));
        setUserData([...newUserData]);
    }else{
       const newUserData=userData.map((userObject)=> userObject.name===name ? {...userObject,isChecked:checked} : {...userObject});
       setUserData([...newUserData]);
    }
  }
  return (
    <>
      <div>
        <div>
            <input type="checkbox" onChange={handleCheckboxChnage} name="allSelect" id="allSelect" checked={userData.filter((userObject)=>(userObject.isChecked!==true)).length<1 }/>
            <label htmlFor="allSelect">All Select</label>
        </div>
        {userData.map((user,index) => {
          return (
            <div key={index}>
              <input type="checkbox" id={user.name} name={user.name} onChange={handleCheckboxChnage} value={user.name} checked={user?.isChecked || false}/>{" "}
              <label htmlFor={user.name}>{user.name}</label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllSelect;
