import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";

// const db = [
//   {
//     user_id: "1",
//     name: "puppy_01",
//     url: "./img/puppy_01.jpg",
//   },
//   {
//     user_id: "2",
//     name: "puppy_02",
//     url: "./img/puppy_02.jpg",
//   },
//   {
//     user_id: "3",
//     name: "puppy_03",
//     url: "./img/puppy_03.jpg",
//   },
//   {
//     user_id: "4",
//     name: "cat_01",
//     url: "./img/cat_01.jpg",
//   },
//   {
//     user_id: "5",
//     name: "cat_02",
//     url: "./img/cat_02.jpg",
//   },
//   {
//     user_id: "6",
//     name: "cat_03",
//     url: "./img/cat_03.jpg",
//   },
//   {
//     user_id: "7",
//     name: "rabbit_01",
//     url: "./img/rabbit_01.jpg",
//   },
//   {
//     user_id: "8",
//     name: "rabbit_02",
//     url: "./img/rabbit_02.jpg",
//   },
//   {
//     user_id: "9",
//     name: "rabbit_03",
//     url: "./img/rabbit_03.jpg",
//   },
// ];

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
  console.log(currentUser)
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  const canGoBack = currentIndex < users.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = async (user_id, nameToDelete, index, direction) => {
    if (direction === "right") {
      try {
        if (currentUser.likes.some(like => like.user_id === user_id)) {
          console.log("hello123")
          // If user_id is in likes array, add user_id to matches array
          await fetch(`http://localhost:4000/matches/${currentUser.user_id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id }),
          });
          console.log(`User ${user_id} (${nameToDelete}) matched!`);
      } else {
        // If user_id is not in likes array, add user_id to likes array
        await fetch(`http://localhost:4000/likes/${currentUser.user_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id }),
        });
        console.log(`User ${user_id} (${nameToDelete}) liked!`);
      }
      updateCurrentIndex(index - 1);
      } catch(error) {
        console.log("Error:", error);
      }
    } else if (direction === "left") {
      console.log(`User ${user_id} (${nameToDelete}) swiped left!`);

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

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < users.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
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
            {users.map((user, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={user.user_id}
                onSwipe={(dir) => swiped(user.user_id, user.first_name, index, dir)}
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
            ))}
          </div>
          <div className="buttons">
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("left")}
            >
              Swipe left!
            </button>
            <button style={{ backgroundColor: !canGoBack && "#c3c4d3" }} onClick={() => goBack()}>
              Undo swipe!
            </button>
            <button
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("right")}
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
