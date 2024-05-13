import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";

function Card() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Add state for current user ID
  const [currentIndex, setCurrentIndex] = useState(0);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  const childRefs = useMemo(() => Array(users.length).fill(0).map(() => React.createRef()), [users]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/users/");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
        const response = await fetch(`http://localhost:4000/user/${currentUserData.userId}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          }
        });
        if(response.ok) {
          const data = await response.json();
          setCurrentUser(data);
        } else {
          console.log("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  const canGoBack = currentIndex < users.length - 1;

  const canSwipe = currentIndex >= 0;

  
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < users.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };
  // set last direction and decrease current index
  const swiped = async (user_id, likes, index, direction) => {
    await swipe(direction); // Swipe the card!
    if (direction === "right") {
      try {
        if (likes.some(like => like.user_id === currentUser.user_id)) {
          // If user_id is in likes array, add user_id to matches array
          await fetch(`http://localhost:4000/matches/${currentUser.user_id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id }),
          });
      } else {
        // If user_id is not in likes array, add user_id to likes array
        await fetch(`http://localhost:4000/likes/${currentUser.user_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id }),
        });
      }
      updateCurrentIndex(index - 1);
      } catch(error) {
        console.log("Error:", error);
      }
    } else if (direction === "left") {
      console.log(`User ${user_id} swiped left!`);

    }
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };


  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };


  return (
    <div className="cardRoot">
      <div className="cardWrapper">
        <div>
          {/* <h1>React Tinder Card</h1> */}
          <div className="cardContainer">
            {users
            .filter(user => user.user_id !== currentUser?.user_id)
            .map((user, index) => {
              const isAdopter = currentUser && currentUser.role === 'adopter';
              if(isAdopter && user.role === 'adoptee') {
                return(
                  <TinderCard
                    ref={childRefs[index]}
                    className="swipe"
                    key={user.user_id}
                    onSwipe={(dir) => swiped(user.user_id, user.likes, index, dir)}
                    onCardLeftScreen={() => outOfFrame(user.first_name, index)}
                  >
                    <div
                      style={{
                        backgroundImage: "url(" + user.image + ")",
                        backgroundRepeat: "no-repeat",
                      }}
                      className="card"
                    ></div>
                  </TinderCard>
                );
              }
              if(!isAdopter && user.role === 'adopter') {
                return(
                  <TinderCard
                    ref={childRefs[index]}
                    className="swipe"
                    key={user.user_id}
                    onSwipe={(dir) => swiped(user.user_id, user.likes, index, dir)}
                    onCardLeftScreen={() => outOfFrame(user.first_name, index)}
                  >
                    <div
                      style={{
                        backgroundImage: "url(" + user.image + ")",
                        backgroundRepeat: "no-repeat",
                      }}
                      className="card"
                    ></div>
                  </TinderCard>
                );
              }
              return null;
          })}
          </div>
          <div className="buttons">
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => {
                console.log(users[currentIndex].user_id);
                swiped(users[currentIndex].user_id, users[currentIndex].likes, currentIndex, "left")}
              }
            >
              Swipe left!
            </button>
            <button style={{ backgroundColor: !canGoBack && "#c3c4d3" }} onClick={() => goBack()}>
              Undo swipe!
            </button>
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => {
                console.log(users[currentIndex].likes);

                swiped(users[currentIndex].user_id, users[currentIndex].likes, currentIndex, "right")}
              }
            >
              Swipe right!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
