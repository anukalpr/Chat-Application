import getAllUsers from "../../context/getAllusers";
import User from "./User";

function Users(){

    const [allUsers,loading]=getAllUsers();
    console.log(allUsers);
    return(
        <>
            <div className="grid grid-row-4 gap-4 h-[500px] overflow-y-auto ">
                {loading?(<p>Loading</p>):(allUsers.map((user,idx)=>(<User key={idx} user={user}/>)))}
            </div>
        </>
    )
}
export default Users;