import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";

const db = [
  {
    name: "puppy_01",
    url: "./img/puppy_01.jpg",
  },
  {
    name: "puppy_02",
    url: "./img/puppy_02.jpg",
  },
  {
    name: "puppy_03",
    url: "./img/puppy_03.jpg",
  },
  {
    name: "cat_01",
    url: "./img/cat_01.jpg",
  },
  {
    name: "cat_02",
    url: "./img/cat_02.jpg",
  },
  {
    name: "cat_03",
    url: "./img/cat_03.jpg",
  },
  {
    name: "rabbit_01",
    url: "./img/rabbit_01.jpg",
  },
  {
    name: "rabbit_02",
    url: "./img/rabbit_02.jpg",
  },
  {
    name: "rabbit_03",
    url: "./img/rabbit_03.jpg",
  },
];

function Card() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (nameToDelete, index) => {
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
    if (canSwipe && currentIndex < db.length) {
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
            {db.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe"
                key={character.name}
                onSwipe={() => swiped(character.name, index)}
                onCardLeftScreen={() => outOfFrame(character.name, index)}
              >
                <div
                  style={{
                    backgroundImage: "url(" + character.url + ")",
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
