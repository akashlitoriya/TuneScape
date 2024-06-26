import React from "react";
import { useSelector } from "react-redux";
import { FaCrown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { leaveLobby } from "../../../services/apis/LobbyOperation";
import { useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";

const MembersList = ({ socket, handleCloseSlide }) => {
  const { lobbyMembers } = useSelector((state) => state.lobby);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { lobbyCode } = useSelector((state) => state.user);
  const { lobbyName } = useSelector((state) => state.lobby);

  const handleLeaveLobby = async () => {
    const tempLobbyCode = lobbyCode;
    const tempUser = user;
    console.log("Leaving lobby");
    await dispatch(leaveLobby(user, navigate));
    socket.emit("leaveRoom", tempLobbyCode, tempUser);
  };
  const handleCopyCode = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(`${lobbyCode}`);
    toast.success("Copied lobby code");
  };
  return (
    <div className="h-full bg-wine-70 p-6 border-r-2 border-wine-20 max-w-[20rem] flex flex-col justify-between">
      <div>
        <div className="block md:hidden text-4xl text-wine-5">
          <button onClick={handleCloseSlide}>
            <MdOutlineClose />
          </button>
        </div>
        <h1 className="text-center text-[2.7rem] text-wine-5 font-Bangers tracking-wider">
          {lobbyName}
        </h1>
        <div className="text-[2rem] text-center text-wine-5 font-Jomhuria tracking-wider flex items-center justify-center">
          Lobby Code - {lobbyCode}
          <button className="text-xl ml-2" onClick={(e) => handleCopyCode(e)}>
            <IoCopyOutline />
          </button>
        </div>
        <h1 className="text-center text-[2.2rem] text-wine-5 font-Jomhuria tracking-wider">
          Lobby Members
        </h1>
        {
          //Show Lobby members here
          lobbyMembers.length > 0 && (
            <div className="mt-5">
              {lobbyMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-5 items-center border-b-2 border-wine-20 p-2"
                >
                  <div className="relative">
                    {member?.leader && (
                      <FaCrown className="text-3xl text-wine-20 absolute -rotate-12 -top-5 " />
                    )}
                    <img
                      src={member?.avatar}
                      alt={`This is ${member?.username} avatar`}
                      width={40}
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-Jomhuria tracking-wider text-wine-5">
                      {member.username}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div>
      <div>
        <button
          className="btn-purple p-1 font-Jomhuria text-wine-5 text-3xl tracking-wider rounded-md "
          onClick={handleLeaveLobby}
        >
          Leave Lobby
        </button>
      </div>
    </div>
  );
};

export default MembersList;
