import React from "react";
import { useSelector } from "react-redux";
import { FaCrown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { leaveLobby } from "../../../services/apis/LobbyOperation";
import { useDispatch } from "react-redux";

const MembersList = ({ socket }) => {
  const { lobbyMembers } = useSelector((state) => state.lobby);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { lobbyCode } = useSelector((state) => state.user);

  const handleLeaveLobby = () => {
    const tempLobbyCode = lobbyCode;
    const tempUser = user;
    console.log("Leaving lobby");
    dispatch(leaveLobby(user, navigate));
    socket.emit("leaveRoom", tempLobbyCode, tempUser);
  };
  return (
    <div className="h-full bg-wine-70 p-8 border-r-2 border-wine-20 w-[340px] flex flex-col justify-between">
      <div>
        <h1 className="text-center text-[2.7rem] text-wine-5 font-Jomhuria tracking-wider">
          Lobby Members
        </h1>
        {
          //Show Lobby members here
          lobbyMembers.length > 0 && (
            <div className="mt-8">
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
                      width={50}
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
